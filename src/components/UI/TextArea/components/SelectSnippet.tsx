import {
  Dispatch,
  FC,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
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
  codeEditorRef: RefObject<HTMLTextAreaElement>;
}

const SelectSnippet: FC<SelectSnippetProps> = ({
  matches,
  setMatches,
  cursorPosition,
  code,
  setCode,
  cursorCount,
  inputValueRef,
  codeEditorRef,
}) => {
  const MAX_NUMBER_OF_OPTIONS = 8;
  const MIN_NUMBER_OF_OPTIONS = 2;
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.selectedIndex = 0;
      selectRef.current.focus();
    }
  }, [matches]);

  const handleSelection = () => {
    const selectedValue = selectRef.current?.value;
    if (selectedValue) {
      const cursorPos = codeEditorRef.current?.selectionStart ?? 0;
      setValueInTextArea(
        code,
        cursorCount.row - 1,
        cursorCount.col - inputValueRef.current.length,
        inputValueRef,
        selectedValue,
        setCode
      );
      setMatches([]);

      if (codeEditorRef.current) {
        setTimeout(() => {
          if (codeEditorRef.current) {
            codeEditorRef.current.focus();
            codeEditorRef.current.selectionStart = cursorPos + (selectedValue?.length ?? 0) + 1;
            codeEditorRef.current.selectionEnd = cursorPos + (selectedValue?.length ?? 0) + 1;
          }
        }, 0);
      }
    }
  };

  return (
    <div>
      <select
        ref={selectRef}
        multiple
        size={Math.min(Math.max(matches.length, MIN_NUMBER_OF_OPTIONS), MAX_NUMBER_OF_OPTIONS)}
        style={{
          position: 'absolute',
          top: cursorPosition.top,
          left: cursorPosition.left,
        }}
        onClick={handleSelection}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSelection();
          }
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
