// frontend/src/components/item/ContestCardItem.tsx

import Image from "next/image";
import Link from "next/link";
import { ContestCardItemProps } from "@/types/itemType";
import { Calendar } from "lucide-react";

export default function ContestCardItem({
  contestId,
  author,
  profileUrl,
  title,
  startAt,
  endAt,
  status,
  createdAt,
  updatedAt,
}: ContestCardItemProps) {
  // 날짜 포맷팅
  const startDateObj = new Date(startAt);
  const endDateObj = new Date(endAt);

  const formattedStartDate = `${startDateObj.getFullYear()}.${String(
    startDateObj.getMonth() + 1
  ).padStart(2, "0")}.${String(startDateObj.getDate()).padStart(2, "0")}`;

  const formattedEndDate = `${endDateObj.getFullYear()}.${String(
    endDateObj.getMonth() + 1
  ).padStart(2, "0")}.${String(endDateObj.getDate()).padStart(2, "0")}`;

  // ------------------------------
  // 🔥 상태별 D-day 기준 설정
  // ------------------------------
  let targetDate: Date | null = null;

  if (status === "개최전") {
    targetDate = new Date(startAt); // 시작일까지 D-
  } else if (status === "진행중" || status === "투표중") {
    targetDate = new Date(endAt); // 종료일까지 D-
  }

  // ------------------------------
  // 🔥 D-day 계산
  // ------------------------------
  let dday: number | null = null;

  if (targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diff = target.getTime() - today.getTime();
    dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // ------------------------------
  // 🔥 D-day 색상 규칙
  // ------------------------------
  let ddayColor = "";

  if (status === "개최전") {
    ddayColor = "bg-gray-200 text-gray-600";
  } else if (status === "진행중" || status === "투표중") {
    ddayColor = "bg-primary/10 text-primary";
  }

  // 임박 강조
  if (dday !== null && status !== "종료") {
    if (dday === 0) {
      ddayColor = "bg-red-100 text-red-600"; // D-day
    } else if (dday > 0 && dday <= 3) {
      ddayColor = "bg-orange-100 text-orange-600"; // D-3 이하
    }
  }

  // ------------------------------
  // 🔥 D-day 텍스트 규칙
  // ------------------------------

  let ddayText = "";

  if (status === "종료") {
    ddayText = ""; // 종료는 표시 안 함
  } else if (dday === 0) {
    ddayText = "D-day";
  } else if (dday && dday > 0) {
    ddayText = `D-${dday}`;
  }

  const imgUrl = `/assets/img_random${contestId % 21}.png`;

  const isEnded = status === "종료";

  return (
    <Link
      href={`/contest/${contestId}?tab=detail`}
      className="block group"
    >
      <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary/20">
        
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              isEnded ? "opacity-60 grayscale" : ""
            }`}
          />

          {/* Status Pill */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-4 py-2 rounded-full text-xs font-medium ${
                status === "진행중" || status === "투표중"
                  ? "bg-primary/90 text-white"
                  : "bg-gray-500/90 text-white"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-text text-xl mb-3 line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </h3>

          {/* 종료날짜 + D-day */}
          <div className="flex flex-row items-center justify-between mb-0">

            {/* 날짜 */}
            <div className="flex flex-row items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-base text-gray-600">
                {formattedStartDate} ~ {formattedEndDate}
              </span>
            </div>

            {/* D-day (종료면 표시 안함) */}
            {!isEnded && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${ddayColor}`}
              >
                {ddayText}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
