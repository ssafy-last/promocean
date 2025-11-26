'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import MypageHeader from '@/components/layout/MypageHeader';

interface GachaResult {
  id: number;
  name: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function GachaPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();

  // 임시 데이터
  const [mileage, setMileage] = useState(1500);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gachaResult, setGachaResult] = useState<GachaResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const GACHA_COST = 100; // 가챠 1회 비용

  // Hydration 처리
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn || !user) {
      router.push('/auth/login?tab=login');
      return;
    }
  }, [isHydrated, isLoggedIn, user, router]);

  // 임시 가챠 풀 (추후 API로 대체)
  const gachaPool: GachaResult[] = [
    // Common (50%)
    { id: 1, name: '미소', imageUrl: '😊', rarity: 'common' },
    { id: 2, name: '웃음', imageUrl: '😄', rarity: 'common' },
    { id: 3, name: '윙크', imageUrl: '😉', rarity: 'common' },
    { id: 4, name: '좋아요', imageUrl: '👍', rarity: 'common' },
    { id: 5, name: '박수', imageUrl: '👏', rarity: 'common' },
    // Rare (30%)
    { id: 6, name: '하트', imageUrl: '❤️', rarity: 'rare' },
    { id: 7, name: '별', imageUrl: '⭐', rarity: 'rare' },
    { id: 8, name: '불', imageUrl: '🔥', rarity: 'rare' },
    { id: 9, name: '파티', imageUrl: '🎉', rarity: 'rare' },
    // Epic (15%)
    { id: 10, name: '왕관', imageUrl: '👑', rarity: 'epic' },
    { id: 11, name: '다이아', imageUrl: '💎', rarity: 'epic' },
    { id: 12, name: '트로피', imageUrl: '🏆', rarity: 'epic' },
    // Legendary (5%)
    { id: 13, name: '용', imageUrl: '🐉', rarity: 'legendary' },
    { id: 14, name: '유니콘', imageUrl: '🦄', rarity: 'legendary' },
  ];

  const rarityConfig = {
    common: { name: '커먼', color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-300', weight: 50 },
    rare: { name: '레어', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-300', weight: 30 },
    epic: { name: '에픽', color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-300', weight: 15 },
    legendary: { name: '레전더리', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300', weight: 5 },
  };

  const getRandomEmoticon = (): GachaResult => {
    const rand = Math.random() * 100;
    let cumulativeWeight = 0;

    for (const [rarity, config] of Object.entries(rarityConfig)) {
      cumulativeWeight += config.weight;
      if (rand <= cumulativeWeight) {
        const itemsOfRarity = gachaPool.filter(item => item.rarity === rarity);
        return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
      }
    }

    return gachaPool[0];
  };

  const handleGacha = async () => {
    if (mileage < GACHA_COST) {
      alert('마일리지가 부족합니다!');
      return;
    }

    setIsSpinning(true);
    setShowResult(false);
    setGachaResult(null);

    // 마일리지 차감
    setMileage(prev => prev - GACHA_COST);

    // 가챠 애니메이션 시뮬레이션 (2초)
    setTimeout(() => {
      const result = getRandomEmoticon();
      setGachaResult(result);
      setIsSpinning(false);

      // 결과 표시 (0.5초 후)
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }, 2000);
  };

  const handleClose = () => {
    setShowResult(false);
    setGachaResult(null);
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MypageHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로 가기
          </button>
          <h1 className="text-3xl font-bold text-gray-900">🎰 이모티콘 가챠</h1>
          <p className="text-gray-600 mt-2">마일리지를 사용해서 랜덤 이모티콘을 획득하세요!</p>
        </div>

        {/* 마일리지 정보 */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">보유 마일리지</p>
              <p className="text-3xl font-bold">{mileage.toLocaleString()} M</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">가챠 1회 비용</p>
              <p className="text-2xl font-bold">{GACHA_COST} M</p>
            </div>
          </div>
        </div>

        {/* 확률 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">등급별 확률</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(rarityConfig).map(([rarity, config]) => (
              <div key={rarity} className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4 text-center`}>
                <p className={`font-bold ${config.color} text-lg mb-1`}>{config.name}</p>
                <p className="text-2xl font-bold text-gray-900">{config.weight}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* 가챠 머신 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="max-w-md mx-auto">
            {/* 가챠 디스플레이 */}
            <div className="relative mb-8">
              <div className={`
                aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl
                flex items-center justify-center border-8 border-purple-300 shadow-2xl
                transition-all duration-500
                ${isSpinning ? 'animate-spin' : ''}
              `}>
                {gachaResult && !isSpinning ? (
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-bounce">{gachaResult.imageUrl}</div>
                  </div>
                ) : (
                  <div className="text-8xl">
                    {isSpinning ? '🎲' : '❓'}
                  </div>
                )}
              </div>

              {/* 장식 효과 */}
              {isSpinning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-3xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-30 animate-pulse"></div>
                </div>
              )}
            </div>

            {/* 가챠 버튼 */}
            <button
              onClick={handleGacha}
              disabled={isSpinning || mileage < GACHA_COST}
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg
                transition-all duration-300 shadow-lg
                ${isSpinning || mileage < GACHA_COST
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transform hover:scale-105'
                }
              `}
            >
              {isSpinning ? '뽑는 중...' : mileage < GACHA_COST ? '마일리지 부족' : `${GACHA_COST}M로 가챠 돌리기!`}
            </button>

            {mileage < GACHA_COST && (
              <p className="text-center text-sm text-red-500 mt-3">
                마일리지가 부족합니다. ({mileage}M / {GACHA_COST}M)
              </p>
            )}
          </div>
        </div>

        {/* 가챠 팁 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 가챠 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 중복된 이모티콘이 나올 수 있습니다</li>
            <li>• 높은 등급일수록 획득 확률이 낮습니다</li>
            <li>• 마일리지는 사이트 활동을 통해 획득할 수 있습니다</li>
            <li>• 획득한 이모티콘은 마이페이지에서 확인할 수 있습니다</li>
          </ul>
        </div>
      </div>

      {/* 결과 모달 */}
      {showResult && gachaResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-bounce">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 축하합니다!</h2>

              <div className={`
                ${rarityConfig[gachaResult.rarity].bgColor}
                ${rarityConfig[gachaResult.rarity].borderColor}
                border-4 rounded-2xl p-8 mb-4
              `}>
                <div className="text-9xl mb-4">{gachaResult.imageUrl}</div>
                <p className={`text-xl font-bold ${rarityConfig[gachaResult.rarity].color} mb-2`}>
                  {rarityConfig[gachaResult.rarity].name}
                </p>
                <p className="text-2xl font-bold text-gray-900">{gachaResult.name}</p>
              </div>

              <p className="text-gray-600 mb-6">
                새로운 이모티콘을 획득했습니다!
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    handleGacha();
                  }}
                  disabled={mileage < GACHA_COST}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다시 뽑기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
