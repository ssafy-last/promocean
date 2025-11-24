// frontend/src/utils/lexicalConverter.ts

/**
 * 텍스트를 Lexical JSON 형식으로 변환
 * @param text - 변환할 텍스트
 * @returns Lexical JSON 문자열
 */
export function textToLexicalJSON(text: string): string {
  return JSON.stringify({
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
  });
}
