import { Dispatch, KeyboardEvent, MutableRefObject, RefObject, SetStateAction } from 'react';
import { handleTab } from './handleTab';
/* import { Key } from '../constants/keyDown'; */

export const handleKeyDown = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  text: string,
  setText: Dispatch<SetStateAction<string>>,
  codeEditorRef: RefObject<HTMLTextAreaElement>,
  snippets: string[],
  inputValueRef: MutableRefObject<string>,
  setMatches: Dispatch<SetStateAction<string[]>>
) => {
  if (event.key === 'Tab') {
    const tabHandled = handleTab(event, text, setText, codeEditorRef);
    if (tabHandled) return;
  }

  /* if (event.ctrlKey && event.code === Key.SPACE) {
    
  } */

  inputValueRef.current = event.key;
  const found = snippets.filter((snippet) => snippet.startsWith(event.key));
  setMatches(found);
};
