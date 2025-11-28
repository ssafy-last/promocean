import { GradeTranslationCode } from "@/api/gacha";
import { GachaResultItemStyle } from "@/app/gacha/page";

export const rarityConfig : Record<GradeTranslationCode, GachaResultItemStyle> = {
    '커먼': {
      gradeName: '일반',
      bgColor: 'bg-white',
      borderColor: 'border-gray-300',
      color: 'text-gray-800',
      weight: 60,
    },
    '레어': {
      gradeName: '희귀',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      color: 'text-blue-800',
      weight: 25,
    },
    '에픽': {
      gradeName: '에픽',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      color: 'text-purple-800',
      weight: 10,
    },
    '레전더리': {
      gradeName: '전설',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      color: 'text-yellow-800',
      weight: 5,
    },
  };
