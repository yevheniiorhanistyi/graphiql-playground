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
import useTranslation from '@/localization/useTranslation';
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
}

const TextArea: FC<TextAreaProps> = ({ readOnly = false, onChange, value, schema }) => {
  const t = useTranslation();
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
            ref={codeEditorRef}
            wrap="off"
            value={code}
            onChange={handleOnChange}
            onBlur={handleOnChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDownEvent}
            onClick={handleCursorPositionEvent}
            className={styles.code_editor}
            placeholder={!readOnly ? t['Enter code here...'] : ''}
            readOnly={readOnly}
          />
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
      {!readOnly && <button onClick={handleClear}>Clear</button>}
      <br />
      {!readOnly && <button onClick={() => handleCopy(code)}>Copy Text</button>}
      <br />
      {!readOnly && (
        <button onClick={() => handlePaste(code, setCode, codeEditorRef)}>Paste Text</button>
      )}
    </div>
  );
};

export default TextArea;
