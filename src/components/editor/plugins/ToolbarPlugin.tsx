import { useToolbarState } from './toolbar/hooks/useToolbarState';
import { TextFormatToolbar } from './toolbar/components/TextFormatToolbar';
import { ListAndIndentToolbar } from './toolbar/components/ListAndIndentToolbar';
import { BlockTypeSelector } from './toolbar/components/BlockTypeSelector';

export function ToolbarPlugin() {
  const { isBold, isItalic, isUnderline, isStrikethrough, isCode, blockType } =
    useToolbarState();

  return (
    <div className="sticky top-0 z-10 flex gap-2 p-3 border-b border-gray-200 bg-white shadow-sm">
      {/* 한줄: 본문 크기 + 기본 텍스트 스타일 + 목록 + 들여쓰기 */}
      <BlockTypeSelector blockType={blockType} />
      <div className="w-px h-6 bg-gray-300" />
      <TextFormatToolbar
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
        isCode={isCode}
      />
      <div className="w-px h-6 bg-gray-300" />
      <ListAndIndentToolbar blockType={blockType} />
    </div>
  );
}
