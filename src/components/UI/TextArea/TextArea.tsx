import {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  FormEvent,
  TextareaHTMLAttributes,
  FC,
} from 'react';
import styles from './TextArea.module.scss';
import useTranslation from '@/localization/useTranslation';
import { handleKeyDown } from './utils/handleKeyDown';
import snippets from './data/snippets';
import { handleCodeChange } from './utils/handleCodeChange';
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
  const [text, setText] = useState<string>('');

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
    const lineCount = text.split('\n').length;
    let lines = '';
    for (let x = 0; x < lineCount; x++) {
      lines += `${x + 1}\n`;
    }
    if (lineCounterRef.current) {
      lineCounterRef.current.value = lines;
    }
  }, [text]);

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(event, text, setText, codeEditorRef, snippets, inputValueRef, setMatches);
  };

  const handleCodeChangeEvent = (event: FormEvent<HTMLTextAreaElement>) => {
    handleCodeChange(event, setText);
    if (onChange) {
      onChange(event.currentTarget.value);
    }
  };

  const handleCursorPositionEvent = (event: FormEvent<HTMLTextAreaElement>) => {
    handleCursorPosition(event, setCursorPosition, setCursorCount);
    if (onChange) {
      onChange(event.currentTarget.value);
    }
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
            value={text || value}
            onInput={(event) => {
              handleCodeChangeEvent(event);
              handleCursorPositionEvent(event);
            }}
            onScroll={handleScroll}
            onKeyDown={handleKeyDownEvent}
            onClick={handleCursorPositionEvent}
            className={styles.code_editor}
            placeholder={!readOnly ? t['Enter text here...'] : ''}
            readOnly={readOnly}
          />
          <div>
            {matches.length !== 0 && matches[0] !== '' && (
              <select
                style={{
                  position: 'absolute',
                  top: cursorPosition.top,
                  left: cursorPosition.left,
                }}
                onChange={(e) =>
                  setValueInTextArea(
                    text,
                    cursorCount.row - 1,
                    cursorCount.col - inputValueRef.current.length - 1,
                    e.target.value,
                    setText
                  )
                }
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
          >{`Space: ${TAB_SPACES}, Ln ${cursorCount.row}, Col ${cursorCount.col}, Ch ${text.length}`}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
