import { Dispatch, FC, MutableRefObject, SetStateAction } from 'react';
import setValueInTextArea from '../utils/setValueInTextArea';
import styles from './SelectSnippet.module.scss';

interface SelectSnippetProps {
  matches: Array<string>;
  setMatches: Dispatch<SetStateAction<string[]>>;
  cursorPosition: {
    top: number;
    left: number;
  };
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  cursorCount: {
    row: number;
    col: number;
  };
  inputValueRef: MutableRefObject<string>;
}

const SelectSnippet: FC<SelectSnippetProps> = ({
  matches,
  setMatches,
  cursorPosition,
  code,
  setCode,
  cursorCount,
  inputValueRef,
}) => {
  const MAX_NUMBER_OF_OPTIONS = 8;
  const MIN_NUMBER_OF_OPTIONS = 2;

  return (
    <div>
      <select
        multiple
        size={Math.min(Math.max(matches.length, MIN_NUMBER_OF_OPTIONS), MAX_NUMBER_OF_OPTIONS)}
        style={{
          position: 'absolute',
          top: cursorPosition.top,
          left: cursorPosition.left,
        }}
        onChange={(e) => {
          setValueInTextArea(
            code,
            cursorCount.row - 1,
            cursorCount.col - inputValueRef.current.length,
            inputValueRef,
            e.target.value,
            setCode
          );
          setMatches([]);
        }}
        className={styles.snippetList}
      >
        {matches.map((match, index) => (
          <option key={index} value={match}>
            {match}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSnippet;
