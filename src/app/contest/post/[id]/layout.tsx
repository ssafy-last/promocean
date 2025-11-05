// frontend/src/app/contest/post/[id]/layout.tsx

/**
 * ContestPostLayout component
 * @description ContestPostLayout component is a contest post layout component that displays the contest post layout content with modal support
 * @returns {React.ReactNode}
 */
export default function ContestPostLayout({
  children,
  noticeModal,
  submissionModal,
}: {
  children: React.ReactNode;
  noticeModal?: React.ReactNode;
  submissionModal?: React.ReactNode;
}) {
  return (
    <>
      {children}
      {noticeModal}
      {submissionModal}
    </>
  );
}