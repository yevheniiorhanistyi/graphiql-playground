import { Dispatch, MutableRefObject, SetStateAction } from 'react';

const setValueInTextArea = (
  text: string,
  rowToInsert: number,
  columnToInsert: number,
  inputValueRef: MutableRefObject<string>,
  valueToInsert: string,
  setText: Dispatch<SetStateAction<string>>
) => {
  const lines = text.split('\n');
  if (lines.length > rowToInsert) {
    const line = lines[rowToInsert];
    if (line.length >= columnToInsert) {
      const start = line.substring(0, columnToInsert - inputValueRef.current.length);

      const end = line.substring(columnToInsert + inputValueRef.current.length);
      lines[rowToInsert] = start + valueToInsert + ' ' + end;
    } else {
      const spacesToAdd = columnToInsert - line.length;
      for (let i = 0; i < spacesToAdd; i++) {
        lines[rowToInsert] += ' ';
      }
      lines[rowToInsert] += valueToInsert;
    }
  } else {
    for (let i = lines.length; i < rowToInsert; i++) {
      lines.push('');
    }
    let newRow = '';
    for (let i = 0; i < columnToInsert; i++) {
      newRow += ' ';
    }
    newRow += valueToInsert;
    lines.push(newRow);
  }
  setText(lines.join('\n'));
};

export default setValueInTextArea;
