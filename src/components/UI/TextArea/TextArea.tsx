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
import setValueInTextArea from './utils/setValueInTextArea';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  value?: string;
}

const TextArea: FC<TextAreaProps> = ({ readOnly = false, onChange, value }) => {
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

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const { value, selectionPoint } = handleKeyDown(event, inputValueRef, setMatches);
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
            value={code || value}
            onChange={handleOnChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDownEvent}
            onClick={handleCursorPositionEvent}
            className={styles.code_editor}
            placeholder={!readOnly ? t['Enter code here...'] : ''}
            readOnly={readOnly}
          />
          <div>
            {matches.length !== 0 && matches[0] !== '' && (
              <select
                multiple
                size={2}
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
                  matches.length = 0;
                }}
                className={styles.snippetList}
              >
                {matches.map((match, index) => (
                  <option key={index} value={match}>
                    {match}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {!readOnly && (
          <p
            className={styles.info_line}
          >{`Space: ${TAB_SPACES}, Ln ${cursorCount.row}, Col ${cursorCount.col}, Ch ${code.length}`}</p>
        )}
      </div>
      {!readOnly && <button onClick={handleClear}>Очистить</button>}
    </div>
  );
};

export default TextArea;
