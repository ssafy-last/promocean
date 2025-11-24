// frontend/src/components/section/TeamSpaceInviteSection.tsx

import { useState } from 'react';
import SpaceAddMemberItem from '../item/SpaceAddMemberItem';
import { SpaceParticipants } from '@/api/space';
import { TeamSpaceRole } from '@/enum/TeamSpaceRole';
import { authAPI } from '@/api/auth';

export interface TeamSpaceInviteSectionProps {
  memberList: SpaceParticipants[];
  onInvite: (inviteList: SpaceParticipants[]) => Promise<void>;
  onCancel: () => void;
}

/**
 * 팀 스페이스 멤버 초대 섹션
 * 이메일/닉네임 검색으로 멤버를 추가하고 권한을 설정
 */
export default function TeamSpaceInviteSection({
  memberList,
  onInvite,
  onCancel,
}: TeamSpaceInviteSectionProps) {
  const [addMemberList, setAddMemberList] = useState<SpaceParticipants[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchMode, setSearchMode] = useState<'email' | 'nickname'>('email');
  const [searchError, setSearchError] = useState('');

  // 검색 입력 후 엔터 키 처리
  const handleSearchKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      e.preventDefault();
      setSearchError(''); // 에러 메시지 초기화

      const searchValue = searchInput.trim();

      // 이미 팀원인지 확인
      const isExistInTeam = memberList.some((m) =>
        searchMode === 'email' ? m.email === searchValue : m.nickname === searchValue
      );
      if (isExistInTeam) {
        setSearchError('이미 팀 스페이스에 존재하는 멤버입니다.');
        return;
      }

      // 이미 추가 목록에 있는지 확인
      const isDuplicate = addMemberList.some((m) =>
        searchMode === 'email' ? m.email === searchValue : m.nickname === searchValue
      );
      if (isDuplicate) {
        setSearchError(
          `이미 추가된 ${searchMode === 'email' ? '이메일' : '닉네임'}입니다.`
        );
        return;
      }

      // 회원 정보 조회
      try {
        const memberInfo = await authAPI.getMemberinfo(
          searchMode === 'email' ? { email: searchValue } : { nickname: searchValue }
        );

        // 새 멤버 추가
        const newMember: SpaceParticipants = {
          participantId: Date.now(), // 임시 ID
          nickname: memberInfo.nickname,
          email: memberInfo.email,
          role: 'READER',
          profileUrl: memberInfo.profileUrl || '',
        };

        setAddMemberList((prev) => [...prev, newMember]);
        setSearchInput(''); // 입력창 초기화
        setSearchError(''); // 에러 메시지 초기화
      } catch (error) {
        console.error('Error fetching member info:', error);
        setSearchError(
          `존재하지 않는 ${
            searchMode === 'email' ? '이메일' : '닉네임'
          }입니다. 다시 확인해주세요.`
        );
      }
    }
  };

  // 멤버 권한 변경
  const handleMemberRoleChange = (email: string, newRole: TeamSpaceRole) => {
    setAddMemberList((prev) =>
      prev.map((member) =>
        member.email === email
          ? {
              ...member,
              role:
                newRole === TeamSpaceRole.READER
                  ? 'READER'
                  : newRole === TeamSpaceRole.EDITOR
                    ? 'EDITOR'
                    : 'OWNER',
            }
          : member
      )
    );
  };

  // 멤버 제거
  const handleRemoveMember = (email: string) => {
    setAddMemberList((prev) => prev.filter((member) => member.email !== email));
  };

  // 초대하기 버튼 클릭
  const handleInviteClick = async () => {
    if (addMemberList.length === 0) {
      alert('초대할 멤버를 추가해주세요.');
      return;
    }

    await onInvite(addMemberList);

    // 초대 목록 초기화
    setAddMemberList([]);
    setSearchInput('');
    setSearchError('');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* 검색 모드 선택 드롭다운 */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">검색 방식:</label>
        <select
          value={searchMode}
          onChange={(e) => {
            setSearchMode(e.target.value as 'email' | 'nickname');
            setSearchError('');
            setSearchInput('');
          }}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="email">이메일</option>
          <option value="nickname">닉네임</option>
        </select>
      </div>

      {/* 검색 입력 필드 */}
      <div className="flex flex-col gap-1">
        <input
          type={searchMode === 'email' ? 'email' : 'text'}
          placeholder={
            searchMode === 'email'
              ? '초대할 멤버의 이메일을 입력하고 Enter를 누르세요'
              : '초대할 멤버의 닉네임을 입력하고 Enter를 누르세요'
          }
          className={`w-full border rounded-[10px] px-4 py-2 focus:outline-none focus:ring-2 transition-all ${
            searchError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary'
          }`}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearchError(''); // 입력 시 에러 메시지 제거
          }}
          onKeyDown={handleSearchKeyPress}
        />
        {/* 인라인 에러 메시지 */}
        {searchError && <p className="text-red-500 text-sm px-1">{searchError}</p>}
      </div>

      {/* 초대 대상 목록 */}
      <div className="flex-1 overflow-y-auto">
        {addMemberList && addMemberList.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">초대 대상 ({addMemberList.length}명)</p>
            <ul className="flex flex-col gap-1">
              {addMemberList.map((member) => (
                <SpaceAddMemberItem
                  key={member.email}
                  member={member}
                  isMinusButton={true}
                  showRoleDropdown={true}
                  onRoleChange={handleMemberRoleChange}
                  onRemove={handleRemoveMember}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <svg
              className="w-14 h-14 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <div className="text-center">
              <p className="text-gray-600 font-medium mb-1">초대할 멤버를 추가하세요</p>
              <p className="text-gray-400 text-sm">이메일을 입력하고 Enter를 누르세요</p>
            </div>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-row justify-center gap-8 py-2 w-full">
        <button
          type="button"
          className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
          onClick={onCancel}
        >
          취소하기
        </button>
        <button
          type="button"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/80 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handleInviteClick}
          disabled={addMemberList.length === 0}
        >
          초대하기
        </button>
      </div>
    </div>
  );
}
