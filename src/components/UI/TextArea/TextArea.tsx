import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  FormEvent,
  TextareaHTMLAttributes,
  FC,
  ChangeEvent,
} from 'react';
import styles from './TextArea.module.scss';
import { handleKeyDown } from './utils/handleKeyDown';
import handleCursorPosition from './utils/handleCursorPosition';
import { TAB_SPACES } from './constants/keyDown';
import { handleCopy } from './utils/handleCopy';
import { handlePaste } from './utils/handlePaste';
import { __Schema } from '@/interfaces/schemaInterface';
import SelectSnippet from './components/SelectSnippet';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  value?: string;
  schema?: __Schema | null;
  placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({
  readOnly = false,
  onChange,
  value,
  schema,
  placeholder,
}) => {
  const [code, setCode] = useState<string>('');
  const [codeSelectionPoint, setCodeSelectionPoint] = useState<null | number>(null);

  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const lineCounterRef = useRef<HTMLTextAreaElement>(null);

  const inputValueRef = useRef<string>('');
  const [matches, setMatches] = useState(['']);

  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [cursorCount, setCursorCount] = useState({ row: 0, col: 0 });

  const handleScroll = () => {
    if (codeEditorRef.current && lineCounterRef.current) {
      lineCounterRef.current.scrollTop = codeEditorRef.current.scrollTop;
      lineCounterRef.current.scrollLeft = codeEditorRef.current.scrollLeft;
    }
  };

  const handleLineCounterClick = () => {
    if (codeEditorRef.current) {
      codeEditorRef.current.focus();
    }
  };

  useEffect(() => {
    const lineCount = code.split('\n').length;
    let lines = '';
    for (let x = 0; x < lineCount; x++) {
      lines += `${x + 1}\n`;
    }
    if (lineCounterRef.current) {
      lineCounterRef.current.value = lines;
    }
  }, [code]);

  useEffect(() => {
    if (value) {
      setCode(value);
    }
  }, [value]);

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { value, selectionPoint } = handleKeyDown(
      event,
      inputValueRef,
      setMatches,
      setCursorPosition,
      setCursorCount,
      schema
    );
    if (value === null) return;

    setCode(value);
    setCodeSelectionPoint(selectionPoint);
  };

  const handleCursorPositionEvent = (event: FormEvent<HTMLTextAreaElement>) => {
    handleCursorPosition(event, setCursorPosition, setCursorCount);
    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  const handleClear = () => {
    setCode('');
    if (onChange) {
      onChange('');
      setCursorCount({ row: 0, col: 0 });
    }
  };

  useEffect(() => {
    if (codeSelectionPoint === null || !codeEditorRef) return;

    codeEditorRef.current!.selectionStart = codeSelectionPoint;
    codeEditorRef.current!.selectionEnd = codeSelectionPoint;
  }, [codeEditorRef, code, codeSelectionPoint]);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (codeSelectionPoint !== null) {
      setCodeSelectionPoint(null);
    }

    setCode(event.target.value);
    handleCursorPositionEvent(event);
  };

  return (
    <div>
      <div>
        <div className={styles.text_editor}>
          <textarea
            id="lineCounter"
            ref={lineCounterRef}
            wrap="off"
            readOnly
            onClick={handleLineCounterClick}
            className={styles.line_counter}
          />
          <textarea
            id="codeEditor"
            data-testid="codeEditor"
            ref={codeEditorRef}
            wrap="off"
            value={code}
            onChange={handleOnChange}
            onBlur={handleOnChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDownEvent}
            onClick={handleCursorPositionEvent}
            className={styles.code_editor}
            placeholder={placeholder}
            readOnly={readOnly}
          />
          <div className={styles.tools}>
            {!readOnly && (
              <button data-testid="clear-button" onClick={handleClear}>
                <svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1 3.5h12m-10.5 0h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9h0Zm2 0V3a2.5 2.5 0 0 1 5 0v.5m-4 2V11m3-5.5V11"
                  />
                </svg>
              </button>
            )}
            {!readOnly && (
              <button onClick={() => handleCopy(code)}>
                <svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.5 10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V1.5a1 1 0 0 1 1-1h4.5l3 3Z" />
                    <path d="M9.5 13.5h-7a1 1 0 0 1-1-1v-9" />
                  </g>
                </svg>
              </button>
            )}
            {!readOnly && (
              <button onClick={() => handlePaste(code, setCode, codeEditorRef)}>
                <svg width="24" height="24" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 3.5v-1a1 1 0 0 0-1-1h-1m-2.5 9H1.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h1" />
                    <rect width="7" height="8" x="6.5" y="5.5" rx="1" />
                    <path d="M6.75.5h-4.5l.41 1.62a.49.49 0 0 0 .48.38h2.72a.49.49 0 0 0 .48-.38Zm1.75 8h3m-3 2h3" />
                  </g>
                </svg>
              </button>
            )}
          </div>
          {matches.length !== 0 && matches[0] !== '' && (
            <SelectSnippet
              matches={matches}
              setMatches={setMatches}
              cursorPosition={cursorPosition}
              code={code}
              setCode={setCode}
              cursorCount={cursorCount}
              inputValueRef={inputValueRef}
              codeEditorRef={codeEditorRef}
            />
          )}
        </div>
        {!readOnly && (
          <p
            className={styles.info_line}
          >{`Space: ${TAB_SPACES}, Ln ${cursorCount.row}, Col ${cursorCount.col}, Ch ${code.length}`}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
