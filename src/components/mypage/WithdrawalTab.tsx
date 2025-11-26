'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/api/auth';

export default function WithdrawalTab() {
  const router = useRouter();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalConfirm, setWithdrawalConfirm] = useState('');

  const handleWithdrawal = async () => {
    if (withdrawalConfirm !== '회원탈퇴') {
      alert('"회원탈퇴"를 정확히 입력해주세요.');
      return;
    }

    if (!confirm('정말 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    setIsWithdrawing(true);
    try {
      await authAPI.withdrawal();
      alert('회원탈퇴가 완료되었습니다.');
      router.push('/');
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원탈퇴에 실패했습니다.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">회원 탈퇴</h2>
        <p className="text-sm text-gray-600">
          회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="withdrawalConfirm" className="block text-sm font-medium text-gray-700 mb-2">
            확인을 위해 <span className="font-bold text-red-600">&quot;회원탈퇴&quot;</span>를 정확히 입력하세요
          </label>
          <input
            type="text"
            id="withdrawalConfirm"
            value={withdrawalConfirm}
            onChange={(e) => setWithdrawalConfirm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="회원탈퇴"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleWithdrawal}
            disabled={isWithdrawing || withdrawalConfirm !== '회원탈퇴'}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isWithdrawing ? '탈퇴 중...' : '회원 탈퇴하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
