'use client';

// frontend/src/app/post/page.tsx

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PostingFloatingSection from "@/components/section/PostingFloatingSection";
import PostingWriteSection from "@/components/section/PostingWriteSection";
import PostingFooter from "@/components/layout/PostingFooter";
import PostingMetaFormSection from "@/components/section/PostingMetaFormSection";
import { PostingFloatingItemProps } from "@/types/itemType";
import { PostFormData, PostSubmitData } from "@/types/postType";
import TitleInput from "@/components/editor/TitleInput";

/**
 * PostPage component
 * @description PostPage component is a post page component that displays the post page content
 * @returns {React.ReactNode}
 */
export default function PostPage() {

  const searchParams = useSearchParams();
  const postType = searchParams.get("type"); // Todo: postType에 렌더링 다르게 할 예정입니다. (community, article, contest)

  // 폼 상태 관리
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("community");
  const [tags, setTags] = useState("");
  const [usedPrompt, setUsedPrompt] = useState("");
  const [examplePrompt, setExamplePrompt] = useState("");
  const [answerPrompt, setAnswerPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [selectedPromptType, setSelectedPromptType] = useState("text");

  // 제출 핸들러
  const handleSubmit = () => {
    // 폼 데이터 수집
    const formData: PostFormData = {
      title,
      category,
      tags,
      usedPrompt,
      examplePrompt,
      answerPrompt,
      selectedCategory,
      selectedPromptType,
    };

    // API 제출용 데이터로 변환
    const submitData: PostSubmitData = {
      title: formData.title,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      content: {
        usedPrompt: formData.usedPrompt,
        examplePrompt: formData.examplePrompt,
        answerPrompt: formData.answerPrompt,
      },
      metadata: {
        category: formData.selectedCategory,
        promptType: formData.selectedPromptType,
      },
    };

    // TODO: API 호출
    console.log('제출 데이터:', submitData);
    alert('게시글이 제출되었습니다!\n콘솔을 확인하세요.');

    // 나중에 여기서 API 호출
    // await postApi.createPost(submitData);
  };

  // Todo : 실제 사용할 아이콘으로 변경 예정
  // 간단한 아이콘 생성 함수
  const createIcon = (iconPath: string) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
  );

  // 카테고리 데이터
  const categoryItems: PostingFloatingItemProps[] = [
    {
      id: "work",
      icon: createIcon("M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"),
      label: "업무",
      value: "work",
    },
    {
      id: "edu",
      icon: createIcon("M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"),
      label: "교육",
      value: "edu",
    },
    {
      id: "dev",
      icon: createIcon("M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"),
      label: "개발",
      value: "dev",
    },
    {
      id: "design",
      icon: createIcon("M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"),
      label: "디자인",
      value: "design",
    },
    {
      id: "data",
      icon: createIcon("M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"),
      label: "데이터",
      value: "data",
    },
    {
      id: "marketing",
      icon: createIcon("M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"),
      label: "마케팅",
      value: "marketing",
    },
    {
      id: "life",
      icon: createIcon("M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"),
      label: "생활",
      value: "life",
    },
    {
      id: "creation",
      icon: createIcon("M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"),
      label: "창작",
      value: "creation",
    },
    {
      id: "ai",
      icon: createIcon("M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"),
      label: "AI",
      value: "ai",
    },
  ];

  // 프롬프트 타입 데이터
  const promptTypeItems: PostingFloatingItemProps[] = [
    {
      id: "text",
      icon: createIcon("M4 6h16M4 10h16M4 14h8M4 18h8"),
      label: "텍스트",
      value: "text",
    },
    {
      id: "image",
      icon: createIcon("M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"),
      label: "이미지",
      value: "image",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <TitleInput value={title} onChange={setTitle} placeholder="제목을 입력하세요" />
        </div>
        <div>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="#태그 #스페이스로 #구분"
            className="w-full px-2 py-2 rounded-md focus:outline-none"
          />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* 글 작성 컨테이너 (8 비율) */}
          <div className="lg:col-span-4 space-y-4">

            {/* 사용 프롬프트 */}
            <PostingWriteSection
              title="사용 프롬프트"
              placeholder="사용한 프롬프트를 입력하세요..."
              onChange={setUsedPrompt}
            />

            {/* 예시 질문 프롬프트 */}
            <PostingWriteSection
              title="예시 질문 프롬프트"
              placeholder="예시 질문을 입력하세요..."
              onChange={setExamplePrompt}
            />

            {/* 답변 프롬프트 */}
            <PostingWriteSection
              title="답변 프롬프트"
              placeholder="답변을 입력하세요..."
              onChange={setAnswerPrompt}
            />

            {/* 프롬프트 작성 완료 버튼 */}
            <PostingFooter onSubmit={handleSubmit} />
          </div>

          {/* 플로팅 컨테이너 (2 비율) */}
          <div className="lg:col-span-1 space-y-4">

            {/* 카테고리 선택 */}
            <PostingFloatingSection
              title="카테고리"
              items={categoryItems}
              selectedValue={selectedCategory}
              onSelect={setSelectedCategory}
              name="category"
            />

            {/* 프롬프트 타입 */}
            <PostingFloatingSection
              title="프롬프트 타입"
              items={promptTypeItems}
              selectedValue={selectedPromptType}
              onSelect={setSelectedPromptType}
              name="promptType"
            />
          </div>
        </div>



      </div>
    </div>
  );
}
