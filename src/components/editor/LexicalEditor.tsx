// frontend/src/components/editor/LexicalEditor.tsx
'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';

interface LexicalEditorProps {
  onChange: (content: string) => void;
  placeholder?: string;
}

// 간단한 ErrorBoundary 컴포넌트
function EditorErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function LexicalEditor({ 
  onChange, 
  placeholder = "내용을 입력하세요" 
}: LexicalEditorProps) {
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
      <div className="relative w-full min-h-64 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
        <RichTextPlugin
          contentEditable={
            <ContentEditable 
              className="w-full min-h-64 px-3 py-2 outline-none resize-y" 
            />
          }
          placeholder={
            <div className="absolute top-2 left-3 text-gray-400 pointer-events-none select-none">
              {placeholder}
            </div>
          }
          ErrorBoundary={EditorErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}