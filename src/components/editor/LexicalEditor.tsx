// frontend/src/components/editor/LexicalEditorWithToolbar.tsx
'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
// 이렇게 변경
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, EditorState } from 'lexical';
import { useCallback, useEffect, useState } from 'react';

interface LexicalEditorWithToolbarProps {
  onChange: (content: string) => void;
  placeholder?: string;
}
function EditorErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex gap-2 p-2 border-b border-gray-300 bg-gray-50">
      <button
        onClick={() => formatText('bold')}
        className={`px-3 py-1 rounded ${isBold ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border border-gray-300 hover:bg-gray-100`}
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => formatText('italic')}
        className={`px-3 py-1 rounded ${isItalic ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border border-gray-300 hover:bg-gray-100`}
        type="button"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => formatText('underline')}
        className={`px-3 py-1 rounded ${isUnderline ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border border-gray-300 hover:bg-gray-100`}
        type="button"
      >
        <u>U</u>
      </button>
    </div>
  );
}

export default function LexicalEditorWithToolbar({ 
  onChange, 
  placeholder = "내용을 입력하세요" 
}: LexicalEditorWithToolbarProps) {
  const initialConfig = {
    namespace: 'PromoceanEditor',
    theme: {
      paragraph: 'mb-2 text-gray-900',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
      },
    },
    onError: (error: Error) => {
      console.error('Lexical Error:', error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const htmlString = editorState.toJSON();
      onChange(JSON.stringify(htmlString));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable 
              className="w-full min-h-64 px-3 py-2 outline-none resize-y" 
            />
          }
          placeholder={
            <div className="absolute top-14 left-3 text-gray-400 pointer-events-none select-none">
              {placeholder}
            </div>
          }
          // 여기를 이렇게 변경
          ErrorBoundary={EditorErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}