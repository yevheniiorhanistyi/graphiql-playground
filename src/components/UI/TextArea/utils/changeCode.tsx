import { Key, TAB_SPACES } from '../constants/keyDown';

export const changeCode = (
  code: string,
  beforeChangedCode: number,
  afterChangedCode: number,
  key: string
): [string, number] => {
  let addCode = '';
  let removeTextChars = 0;
  let selectionStart = beforeChangedCode;

  switch (key) {
    case Key.TAB:
      addCode = ' '.repeat(TAB_SPACES);
      selectionStart += TAB_SPACES;
      break;
    case Key.BACKSPACE:
      removeTextChars = TAB_SPACES;
      selectionStart -= TAB_SPACES;
      break;
    case Key.OPEN_CURLY_BRACE:
      addCode = '{}';
      selectionStart += 1;
      break;
    case Key.ENTER: {
      const beforeBrace = code.slice(0, beforeChangedCode);
      let openCurlyBracesCount =
        (beforeBrace.match(/{/g) || []).length - (beforeBrace.match(/}/g) || []).length;
      openCurlyBracesCount = openCurlyBracesCount < 0 ? 0 : openCurlyBracesCount;
      const openCurlyBracesCountOneLess =
        openCurlyBracesCount - 1 < 0 ? 0 : openCurlyBracesCount - 1;
      addCode = `\n${' '.repeat(TAB_SPACES * openCurlyBracesCount)}${
        /{ *}/.test(code) ? '\n' + ' '.repeat(TAB_SPACES * openCurlyBracesCountOneLess) : ''
      }`;
      selectionStart += openCurlyBracesCount * TAB_SPACES + 1;
      break;
    }
  }
  return [
    code.slice(0, beforeChangedCode - removeTextChars) + addCode + code.slice(afterChangedCode),
    selectionStart,
  ];
};
