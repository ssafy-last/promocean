// frontend/src/components/modal/TeamSpaceManageModal.tsx

import { useRouter } from 'next/navigation';
import TeamSpaceInsertionModalTabs from '../filter/TeamSpaceInsertionModalTabs';
import TeamSpaceMemberSection from '../section/TeamSpaceMemberSection';
import TeamSpaceInviteSection from '../section/TeamSpaceInviteSection';
import TeamSpaceEditSection from '../section/TeamSpaceEditSection';
import TeamSpaceDeleteSection from '../section/TeamSpaceDeleteSection';
import SpaceAPI, { SpaceParticipants } from '@/api/space';
import { UploadAPI } from '@/api/upload';
import { ChangeSpaceRoleToValue, TeamSpaceRole } from '@/enum/TeamSpaceRole';
import { useAuthStore } from '@/store/authStore';
import { useSpaceStore } from '@/store/spaceStore';

export interface TeamSpacePageProps {
  spaceId?: number;
  isModalOpenState: boolean;
  handleModalClose: () => void;
  modalTabState: '멤버' | '초대' | '수정' | '삭제';
  setModalTabState: (tab: '멤버' | '초대' | '수정' | '삭제') => void;
  memberListState: SpaceParticipants[];
  ownerMemberState?: SpaceParticipants | null;
  setMemberListState: (members: SpaceParticipants[]) => void;
  teamName?: string;
  userRole?: 'READER' | 'EDITOR' | 'OWNER';
}

export default function TeamSpaceManageModal({
  spaceId,
  handleModalClose,
  modalTabState,
  setModalTabState,
  memberListState,
  ownerMemberState,
  setMemberListState,
  teamName = '팀 스페이스',
  userRole,
}: TeamSpacePageProps) {
  console.log('spaceId in TeamSpaceManageModal:', spaceId);
  const router = useRouter();
  const { user } = useAuthStore();
  const userNickname = useAuthStore((state) => state.user?.nickname);

  const spaceStore = useSpaceStore();
  const currentSpace = spaceStore.currentSpace;
  const setCurrentSpace = spaceStore.setCurrentSpace;

  // 권한 확인
  const isOwner = userRole === 'OWNER';

  // OWNER만 초대, 수정, 삭제 가능
  const canInvite = isOwner;
  const canEdit = isOwner;
  const canDelete = isOwner;

  // 팀 삭제 핸들러
  const handleDeleteTeam = async () => {
    console.log('handle ', spaceId);

    const res = await SpaceAPI.deleteTeamSpace(spaceId!);
    console.log('Res ', res);
    alert(`${teamName}이 삭제되었습니다`);

    router.push('/team-space');
  };

  // 팀 수정 핸들러
  const handleEditTeam = async (name: string, imageFile: File | null) => {
    const s3res = await UploadAPI.getImagesS3Upload(
      imageFile ? imageFile.name : 'default.png'
    );
    const presignedUrl = s3res?.presignedUrl;
    const key = s3res?.key;

    if (s3res && imageFile) {
      // 이미지가 있을 때만 업로드 진행
      await UploadAPI.uploadImageToS3({
        presignedUrl: presignedUrl!,
        file: imageFile,
      });

      // 업로드 성공 시에만 팀 스페이스 정보 업데이트
      await SpaceAPI.patchTeamSpace(spaceId!, {
        name: name,
        spaceCoverPath: key!,
      });

      alert(`${teamName}이 수정되었습니다`);
      const file = imageFile;

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCurrentSpace({
            ...currentSpace!,
            name: name,
            spaceCoverUrl: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
      handleModalClose();
    } else {
      setCurrentSpace({
        ...currentSpace!,
        name: name,
      });

      await SpaceAPI.patchTeamSpace(spaceId!, {
        name: name,
      });

      alert(`${teamName}이 수정되었습니다`);
      console.log('No image to upload, just update name');
      handleModalClose();
    }
  };

  // 멤버 초대 핸들러
  const handleInviteTeamMembers = async (inviteList: SpaceParticipants[]) => {
    if (inviteList.length === 0) {
      alert('초대할 멤버를 추가해주세요.');
      return;
    }

    console.log('Inviting members:', inviteList);

    // ParticipantReqs 형식으로 변환
    const inviteData = {
      participantReqs: inviteList.map((member) => ({
        email: member.email,
        role: ChangeSpaceRoleToValue(member.role),
      })),
    };

    try {
      const res = await SpaceAPI.postSpaceParticipantInvite(spaceId!, inviteData);

      console.log('Invite res', res);
      alert('멤버 초대가 완료되었습니다.');

      // 멤버 목록 업데이트
      const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
      const participants = updateRes.participants;
      const owner = participants.find((participant) => participant.nickname === userNickname) || null;

      console.log('새로 추가된 ', participants);

      if (owner) {
        participants.splice(participants.indexOf(owner), 1); // 소유자 제외
      }

      setMemberListState(participants);
    } catch (error) {
      console.error('Error inviting members:', error);
      alert('멤버 초대 중 오류가 발생했습니다.');
    }
  };

  // 멤버 role 변경 핸들러
  const handleMemberRoleChange = async (email: string, newRole: TeamSpaceRole) => {
    console.log('Change role for email:', email, 'to:', newRole);

    try {
      const res = await SpaceAPI.patchSpaceParticipantRole(spaceId!, {
        email: email,
        role: newRole,
      });
      console.log('Role change res:', res?.message);

      // 멤버 목록 업데이트 - API 재호출하여 최신 데이터 가져오기
      const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
      const participants = updateRes.participants;
      const owner = participants.find((participant) => participant.nickname === userNickname) || null;
      if (owner) {
        participants.splice(participants.indexOf(owner), 1); // 소유자 제외
      }

      setMemberListState(participants);
    } catch (error) {
      console.error('Error changing member role:', error);
      alert('권한 변경에 실패했습니다.');
    }
  };

  // 멤버 삭제 핸들러
  const handleDeleteMember = async (participantId: number) => {
    console.log('Delete member with participantId:', participantId);

    const res = await SpaceAPI.deleteSpaceParticipant(spaceId!, participantId);
    console.log('Delete res:', res);

    // 멤버 목록 업데이트
    const updateRes = await SpaceAPI.getSpaceParticipants(spaceId!);
    const participants = updateRes.participants;
    const owner = participants.find((participant) => participant.nickname === userNickname) || null;
    if (owner) {
      participants.splice(participants.indexOf(owner), 1); // 소유자 제외
    }

    setMemberListState(participants);
  };

  return (
    <>
      {/* 오버레이 - 바깥쪽 클릭 감지 */}
      <div className="fixed inset-0 bg-black/30 z-10" onClick={handleModalClose} />

      {/* 모달 */}
      <div className="absolute w-100 h-[600px] z-20 top-8 right-8 bg-white rounded-md shadow-md text-black flex flex-col">
        {/* 헤더 - 고정 */}
        <div className="py-4 px-4 border-b border-gray-200">
          <TeamSpaceInsertionModalTabs
            modalTabState={modalTabState}
            setModalTabState={setModalTabState}
            canInvite={canInvite}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        </div>

        {/* 컨텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          <h2
            className={`font-semibold text-2xl ${modalTabState === '삭제' ? 'text-red-500' : ''}`}
          >
            {modalTabState}
          </h2>

          {modalTabState === '멤버' ? (
            <TeamSpaceMemberSection
              ownerMember={ownerMemberState!}
              memberList={memberListState}
              currentUserEmail={user?.email}
              isOwner={isOwner}
              onDeleteMember={handleDeleteMember}
              onRoleChange={handleMemberRoleChange}
            />
          ) : modalTabState === '초대' ? (
            <TeamSpaceInviteSection
              memberList={memberListState}
              onInvite={handleInviteTeamMembers}
              onCancel={handleModalClose}
            />
          ) : modalTabState === '수정' ? (
            <TeamSpaceEditSection
              teamName={currentSpace?.name || teamName}
              onSave={handleEditTeam}
              onCancel={handleModalClose}
            />
          ) : (
            <TeamSpaceDeleteSection
              teamName={teamName}
              onDelete={handleDeleteTeam}
              onCancel={handleModalClose}
            />
          )}
        </div>
      </div>
    </>
  );
}
