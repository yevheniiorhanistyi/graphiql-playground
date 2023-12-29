import { Dispatch, KeyboardEvent, MutableRefObject, SetStateAction } from 'react';
import { Key, TAB_SPACES } from '../constants/keyDown';
import { changeCode } from './changeCode';
import snippets from '../data/snippets';

export const handleKeyDown = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  inputValueRef: MutableRefObject<string>,
  setMatches: Dispatch<SetStateAction<string[]>>
) => {
  const key = event.key;

  const target = event.target as HTMLTextAreaElement;
  const code = target.value;
  const beforeChangedCode = target.selectionStart;
  const afterChangedCode = target.selectionEnd;
  const isNotSelected = beforeChangedCode === afterChangedCode;
  const hasSpacesToDelete =
    code.slice(beforeChangedCode - TAB_SPACES, beforeChangedCode) === ' '.repeat(TAB_SPACES);

  let changedCode = null;
  let selectionPoint = null;

  inputValueRef.current = key;
  const found = snippets.filter((snippet) => snippet.startsWith(event.key));
  setMatches(found);

  if (
    key === Key.ENTER ||
    key === Key.TAB ||
    key === Key.OPEN_CURLY_BRACE ||
    (key === Key.BACKSPACE && isNotSelected && hasSpacesToDelete)
  ) {
    event.preventDefault();
    [changedCode, selectionPoint] = changeCode(code, beforeChangedCode, afterChangedCode, key);
  }
  return {
    value: changedCode,
    selectionPoint,
  };
};
