'use client';

<<<<<<< Updated upstream
import { useState } from 'react';
=======
import { GachaAPI } from '@/api/gacha';
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes

// 임시 데이터 타입
type Badge = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface EmoticonItem {
  id: number;
  name: string;
  imageUrl: string;
  acquiredDate: string;
}

export default function EmoticonTab() {
  // 임시 데이터 (추후 API로 대체)
  const [mileage] = useState(1500);
  const [currentBadge] = useState<Badge>('gold');
<<<<<<< Updated upstream
  const [emoticons] = useState<EmoticonItem[]>([
    { id: 1, name: '웃는 얼굴', imageUrl: '😊', acquiredDate: '2024-01-15' },
    { id: 2, name: '하트', imageUrl: '❤️', acquiredDate: '2024-01-20' },
    { id: 3, name: '박수', imageUrl: '👏', acquiredDate: '2024-02-01' },
    { id: 4, name: '별', imageUrl: '⭐', acquiredDate: '2024-02-10' },
    { id: 5, name: '불', imageUrl: '🔥', acquiredDate: '2024-02-15' },
    { id: 6, name: '트로피', imageUrl: '🏆', acquiredDate: '2024-03-01' },
  ]);
=======
  const [emoticons] = useState<EmoticonItem[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
      const res = await GachaAPI.getGachaList();
      console.log("res : ", res);

    };

    fetchData();
  }, [])


>>>>>>> Stashed changes

  const badges = {
    bronze: { name: '브론즈', color: 'bg-amber-700', icon: '🥉', requirement: '0 활동' },
    silver: { name: '실버', color: 'bg-gray-400', icon: '🥈', requirement: '50 활동' },
    gold: { name: '골드', color: 'bg-yellow-500', icon: '🥇', requirement: '100 활동' },
    platinum: { name: '플래티넘', color: 'bg-cyan-400', icon: '💎', requirement: '200 활동' },
    diamond: { name: '다이아', color: 'bg-blue-400', icon: '💠', requirement: '500 활동' },
  };

  const badgeOrder: Badge[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

  return (
    <div className="space-y-8">
      {/* 마일리지 정보 */}
<<<<<<< Updated upstream
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white shadow-lg">
=======
      <div className="bg-linear-to-r from-primary to-primary/80 rounded-lg p-6 text-white shadow-lg">
>>>>>>> Stashed changes
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">보유 마일리지</p>
            <p className="text-3xl font-bold">{mileage.toLocaleString()} M</p>
          </div>
          <div className="text-5xl">💰</div>
        </div>
        <p className="text-xs opacity-75 mt-4">
          마일리지를 사용하여 다양한 이모티콘을 구매할 수 있습니다
        </p>
      </div>

      {/* 뱃지 시스템 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">내 뱃지</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* 현재 뱃지 */}
          <div className="text-center mb-6">
<<<<<<< Updated upstream
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg mb-3">
=======
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 shadow-lg mb-3">
>>>>>>> Stashed changes
              <span className="text-5xl">{badges[currentBadge].icon}</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900">{badges[currentBadge].name}</h4>
            <p className="text-sm text-gray-500">현재 등급</p>
          </div>

          {/* 모든 뱃지 진행도 */}
          <div className="space-y-3">
            {badgeOrder.map((badge, index) => {
              const isAchieved = badgeOrder.indexOf(currentBadge) >= index;
              const isCurrent = currentBadge === badge;

              return (
                <div
                  key={badge}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all
                    ${isCurrent ? 'bg-primary/10 border-2 border-primary' : 'bg-gray-50'}
                    ${!isAchieved && 'opacity-40'}
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full
                    ${isAchieved ? badges[badge].color : 'bg-gray-300'}
                  `}>
                    <span className="text-2xl">{badges[badge].icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{badges[badge].name}</p>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                          현재
                        </span>
                      )}
                      {isAchieved && !isCurrent && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                          달성
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{badges[badge].requirement}</p>
                  </div>
                  {isAchieved && (
                    <div className="text-green-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 보유 이모티콘 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">보유 이모티콘</h3>
          <span className="text-sm text-gray-500">{emoticons.length}개 보유</span>
        </div>

        {emoticons.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-5xl mb-4">😢</p>
            <p className="text-gray-500">아직 보유한 이모티콘이 없습니다</p>
            <p className="text-sm text-gray-400 mt-2">마일리지로 이모티콘을 구매해보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {emoticons.map((emoticon) => (
              <div
                key={emoticon.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/5 transition-colors">
                  <span className="text-5xl">{emoticon.imageUrl}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 text-center mb-1">
                  {emoticon.name}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {new Date(emoticon.acquiredDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 이모티콘 가챠샵 링크 */}
<<<<<<< Updated upstream
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
=======
      <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
>>>>>>> Stashed changes
        <p className="text-lg font-semibold mb-2">🎰 새로운 이모티콘을 획득하세요!</p>
        <p className="text-sm opacity-90 mb-4">마일리지를 사용해서 랜덤 이모티콘을 뽑아보세요</p>
        <a
          href="/gacha"
          className="inline-block px-6 py-2 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
        >
          가챠샵 가기
        </a>
      </div>
    </div>
  );
}
