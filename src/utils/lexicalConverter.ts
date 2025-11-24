// frontend/src/utils/lexicalConverter.ts

/**
 * Lexical JSON 기본 구조
 */
interface LexicalNode {
  root: {
    children: Array<{
      children: Array<{
        detail: number;
        format: number;
        mode: string;
        style: string;
        text: string;
        type: string;
        version: number;
      }>;
      direction: null;
      format: string;
      indent: number;
      type: string;
      version: number;
      textFormat: number;
      textStyle: string;
    }>;
    direction: null;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

/**
 * 텍스트를 Lexical JSON 형식으로 변환
 * @param text - 변환할 텍스트
 * @returns Lexical JSON 문자열
 */
export function textToLexicalJSON(text: string): string {
  const lexicalNode = createLexicalNode(text);
  return JSON.stringify(lexicalNode);
}

/**
 * Lexical 노드 객체 생성 (JSON 문자열이 아닌 객체 반환)
 * @param text - 변환할 텍스트
 * @returns Lexical 노드 객체
 */
export function createLexicalNode(text: string): LexicalNode {
  return {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              type: 'text',
              version: 1,
            },
          ],
          direction: null,
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  };
}

/**
 * AI 응답을 Lexical JSON 객체로 변환
 * @param responseText - AI 응답 텍스트
 * @returns Lexical 노드 객체
 */
export function createLexicalResponse(responseText: string): LexicalNode {
  return createLexicalNode(responseText);
}
