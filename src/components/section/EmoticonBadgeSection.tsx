
type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface BadgeInfo{
    name: string;
    color: string;
    icon: string;
    requirement: string;
}

export interface EmoticonBadgeSectionProps {
    currentBadge: BadgeTier;
    badges: Record<BadgeTier, BadgeInfo>;
    badgeOrder: BadgeTier[];
}


export default function EmoticonBadgeSection({ currentBadge, badges, badgeOrder }: EmoticonBadgeSectionProps) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">내 뱃지</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* 현재 뱃지 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 shadow-lg mb-3">
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
    );
}