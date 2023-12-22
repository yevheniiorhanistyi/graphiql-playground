import { Dispatch, KeyboardEvent, MutableRefObject, RefObject, SetStateAction } from 'react';
import { handleTab } from './handleTab';

export const handleKeyDown = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  code: string,
  setCode: Dispatch<SetStateAction<string>>,
  codeEditorRef: RefObject<HTMLTextAreaElement>,
  snippets: string[],
  inputValueRef: MutableRefObject<string>,
  setMatches: Dispatch<SetStateAction<string[]>>
) => {
  if (event.key === 'Tab') {
    const tabHandled = handleTab(event, code, setCode, codeEditorRef);
    if (tabHandled) return;
  }

  inputValueRef.current = event.key;
  const found = snippets.filter((snippet) => snippet.startsWith(event.key));
  setMatches(found);
};
