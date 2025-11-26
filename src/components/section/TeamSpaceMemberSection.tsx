// frontend/src/components/section/TeamSpaceMemberSection.tsx

import TeamSpaceMemberItem from '../item/TeamSpaceMemberItem';
import TeamSpaceMemberList from '../list/TeamSpaceMemberList';
import { SpaceParticipants } from '@/api/space';
import { TeamSpaceRole } from '@/enum/TeamSpaceRole';

export interface TeamSpaceMemberSectionProps {
  ownerMember: SpaceParticipants | null;
  memberList: SpaceParticipants[];
  currentUserEmail?: string;
  isOwner: boolean;
  onDeleteMember: (participantId: number) => Promise<void>;
  onRoleChange: (email: string, newRole: TeamSpaceRole) => Promise<void>;
}

/**
 * 팀 스페이스 멤버 조회 섹션
 * 소유자 정보와 멤버 목록을 표시
 */
export default function TeamSpaceMemberSection({
  ownerMember,
  memberList,
  currentUserEmail,
  isOwner,
  onDeleteMember,
  onRoleChange,
}: TeamSpaceMemberSectionProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <span className="text-sm text-gray-500">나의 권한</span>
      <TeamSpaceMemberItem
        member={ownerMember!}
        index={-1}
        currentUserEmail={currentUserEmail}
      />
      <span className="border-b border-gray-300 w-full"></span>
      <div className="flex-1 overflow-y-auto">
        <TeamSpaceMemberList
          memberListState={memberList}
          currentUserEmail={currentUserEmail}
          onDelete={onDeleteMember}
          onRoleChange={onRoleChange}
          canManageMembers={isOwner}
        />
      </div>
    </div>
  );
}
