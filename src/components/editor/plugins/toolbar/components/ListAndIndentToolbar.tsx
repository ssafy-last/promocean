import { useToolbarActions } from '../hooks/useToolbarActions';

interface ListAndIndentToolbarProps {
  blockType: string;
}

export function ListAndIndentToolbar({ blockType }: ListAndIndentToolbarProps) {
  const {
    formatBulletList,
    formatNumberedList,
    formatCheckList,
    removeList,
    handleOutdent,
    handleIndent,
  } = useToolbarActions();

  const handleListClick = (listType: 'ul' | 'ol' | 'check') => {
    if (blockType === listType) {
      removeList();
    } else {
      if (listType === 'ul') formatBulletList();
      else if (listType === 'ol') formatNumberedList();
      else if (listType === 'check') formatCheckList();
    }
  };

  return (
    <>
      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => handleListClick('ul')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'ul' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Bullet List"
      >
        • 목록
      </button>
      <button
        onClick={() => handleListClick('ol')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'ol' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Numbered List"
      >
        1. 목록
      </button>
      <button
        onClick={() => handleListClick('check')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'check' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Check List"
      >
        ☑ 체크
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={handleOutdent}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Outdent"
      >
        ←
      </button>
      <button
        onClick={handleIndent}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Indent"
      >
        →
      </button>
    </>
  );
}
