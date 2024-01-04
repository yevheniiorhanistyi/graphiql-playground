import { Dispatch, RefObject, SetStateAction } from 'react';

export const handlePaste = async (
  code: string,
  setCode: Dispatch<SetStateAction<string>>,
  codeEditorRef: RefObject<HTMLTextAreaElement>
) => {
  try {
    const text = await navigator.clipboard.readText();

    if (!codeEditorRef.current) return;

    const startPos = codeEditorRef.current.selectionStart || 0;
    const endPos = codeEditorRef.current.selectionEnd || 0;

    const currentCode = code || '';
    const updatedCode =
      currentCode.substring(0, startPos) + text + currentCode.substring(endPos, currentCode.length);

    setCode(updatedCode);

    if (codeEditorRef.current) {
      codeEditorRef.current.focus();
      codeEditorRef.current.selectionStart = startPos + text.length;
      codeEditorRef.current.selectionEnd = startPos + text.length;
    }

    console.log('Text pasted from clipboard');
  } catch (error) {
    console.error('Failed to paste text: ', error);
  }
};
