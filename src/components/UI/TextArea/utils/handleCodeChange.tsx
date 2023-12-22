import { Dispatch, FormEvent, SetStateAction } from 'react';

export const handleCodeChange = (
  event: FormEvent<HTMLTextAreaElement>,
  setCode: Dispatch<SetStateAction<string>>
) => {
  const target = event.currentTarget;
  const value = target.value;
  const selectionStart = target.selectionStart;
  const lastChar = value[selectionStart - 1];
  const nextChar = value[selectionStart];

  if (lastChar === '{' && nextChar !== ' }') {
    const newValue = value.substring(0, selectionStart) + '}' + value.substring(selectionStart);
    setCode(newValue);
    setTimeout(() => {
      target.selectionStart = selectionStart;
      target.selectionEnd = selectionStart;
    }, 0);
  } else {
    setCode(value);
  }
};
