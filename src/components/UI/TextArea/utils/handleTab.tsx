import { Dispatch, KeyboardEvent, RefObject, SetStateAction } from 'react';

export const handleTab = (
  event: KeyboardEvent<HTMLTextAreaElement>,
  text: string,
  setText: Dispatch<SetStateAction<string>>,
  codeEditorRef: RefObject<HTMLTextAreaElement>
) => {
  event.preventDefault();

  const { selectionStart, selectionEnd } = event.currentTarget;
  const value = event.currentTarget.value;
  const newValue = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);

  setText(newValue);

  const newCursorPosition = selectionStart + 2;
  setTimeout(() => {
    codeEditorRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
  }, 0);
  return true;
};
