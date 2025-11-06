'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { CUSTOM_TRANSFORMERS } from './utils/markdownTransformers';


/**
 * LexicalEditorProps 인터페이스
 * @interface LexicalEditorProps
 * @property {(content: string) => void} onChange - 내용 변경 시 호출되는 함수
 * @property {string} [title] - 에디터 상단 툴바에 표시될 제목
 * @property {string} [placeholder] - 에디터의 플레이스홀더 텍스트
 */
interface LexicalEditorProps {
  onChange: (content: string) => void;
  title?: string;
  placeholder?: string;
}

function EditorErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


/**
 * LexicalEditor 컴포넌트
 * @param param0 - LexicalEditorProps의 분해 할당
 * @property onChange: (content: string) => void - 내용 변경 시 호출되는 함수
 * @property title?: string - 에디터 상단 툴바에 표시될 제목
 * @property placeholder?: string - 에디터의 플레이스홀더 텍스트
 * @returns JSX.Element
 */
export default function LexicalEditor({
  onChange,
  title,
  placeholder = '내용을 입력하세요...',
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'PromoceanEditor',
    nodes: [
      HeadingNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      ListNode,
      ListItemNode,
      HorizontalRuleNode,
    ],
    theme: {
      paragraph: 'mb-2 text-gray-900 leading-relaxed',
      quote: 'border-l-4 border-blue-400 pl-4 italic text-gray-700 my-3 py-2 bg-blue-50',
      heading: {
        h1: 'text-4xl font-bold mb-4 mt-6 text-gray-900',
        h2: 'text-3xl font-bold mb-3 mt-5 text-gray-900',
        h3: 'text-2xl font-bold mb-2 mt-4 text-gray-900',
        h4: 'text-xl font-semibold mb-2 mt-3 text-gray-900',
        h5: 'text-lg font-semibold mb-1 mt-2 text-gray-900',
        h6: 'text-base font-semibold mb-1 mt-2 text-gray-900',
      },
      list: {
        nested: {
          listitem: 'list-none',
        },
        ol: 'list-decimal ml-5 my-2',
        ul: 'list-disc ml-5 my-2',
        listitem: 'mb-1 pl-1',
        checklist: 'list-none ml-0 my-2',
      },
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-blue-50 px-2 py-0.5 text-sm rounded text-blue-600 font-medium',
        hashtag: 'bg-blue-50 px-2 py-0.5 text-sm rounded text-blue-600 font-medium',
      },
      code: 'bg-gray-900 text-gray-100 p-4 rounded-lg my-3 font-mono text-sm overflow-x-auto block [&_*]:text-gray-100',
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
      <div className="rounded-lg overflow-hidden border-[2px] border-[#f9fafb] focus-within:border-[2px] focus-within:border-primary outline-none transition-colors duration-100">
        <ToolbarPlugin title={title}/>
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="w-full min-h-[350px] max-h-[400px] overflow-y-auto px-4 py-4 outline-none prose prose-sm max-w-none" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={EditorErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}
