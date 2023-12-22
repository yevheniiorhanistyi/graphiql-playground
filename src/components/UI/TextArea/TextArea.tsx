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
import { handleMatchClick } from './utils/handleMatchClick';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  value?: string;
}

const TextArea: FC<TextAreaProps> = ({ readOnly = false, onChange, value }) => {
  const t = useTranslation();
  const [code, setCode] = useState('');

  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const lineCounterRef = useRef<HTMLTextAreaElement>(null);

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

  const inputValueRef = useRef<string>('');
  const [matches, setMatches] = useState(['']);

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(event, code, setCode, codeEditorRef, snippets, inputValueRef, setMatches);
  };

  const handleCodeChangeEvent = (event: FormEvent<HTMLTextAreaElement>) => {
    handleCodeChange(event, setCode);
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
            value={code || value}
            onInput={handleCodeChangeEvent}
            onScroll={handleScroll}
            onKeyDown={handleKeyDownEvent}
            className={styles.code_editor}
            placeholder={!readOnly ? t['Enter text here...'] : ''}
            readOnly={readOnly}
          />
          {matches.map((match, index) => (
            <div key={index} onClick={() => handleMatchClick(match, inputValueRef, setMatches)}>
              {match}
            </div>
          ))}
        </div>
        <p>{code.length}</p>
      </div>
    </div>
  );
};

export default TextArea;
