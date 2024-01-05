import { Dispatch, FormEvent, SetStateAction } from 'react';
import getCharWidth from './getCharWidth';

const handleCursorPosition = (
  event: FormEvent<HTMLTextAreaElement>,
  setCursorPosition: Dispatch<SetStateAction<{ top: number; left: number }>>,
  setCursorCount: Dispatch<SetStateAction<{ row: number; col: number }>>
) => {
  const lineHeight = 22.4;
  const textarea = event.currentTarget;

  const rect = textarea.getBoundingClientRect();

  const cursorStart = textarea.selectionStart;

  const value = textarea.value.substring(0, cursorStart);
  const rows = value.split('\n');

  const currentRow = rows.length - 1;

  const currentColumn = cursorStart - rows.slice(0, currentRow).join('\n').length;

  const charWidth = getCharWidth();

  const cursorLeft = rect.left + window.pageXOffset + currentColumn * charWidth + 40;
  const cursorTop = rect.top + window.pageYOffset + currentRow * lineHeight - 132;

  setCursorPosition({ top: cursorTop, left: cursorLeft });
  setCursorCount({ row: currentRow + 1, col: currentColumn });
};

export default handleCursorPosition;
