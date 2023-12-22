import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
import styles from './TextArea.module.scss';
import useTranslation from '@/localization/useTranslation';

const TextEditor = () => {
  const t = useTranslation();
  const [code, setCode] = useState('');

  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const lineCounterRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const selectionStart = target.selectionStart;
    const lastChar = value[selectionStart - 1];
    const nextChar = value[selectionStart];

    if (lastChar === '{' && nextChar !== '}') {
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

  const handleScroll = () => {
    if (codeEditorRef.current && lineCounterRef.current) {
      lineCounterRef.current.scrollTop = codeEditorRef.current.scrollTop;
      lineCounterRef.current.scrollLeft = codeEditorRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const { selectionStart, selectionEnd } = event.currentTarget;
      const value = event.currentTarget.value;
      const newValue = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);

      setCode(newValue);

      const newCursorPosition = selectionStart + 2;
      setTimeout(() => {
        codeEditorRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
      return;
    }

    setInput(event.key);
    const finded = snippets.filter((snippet) => snippet.startsWith(event.key));
    setMatches(finded);
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

  const [input, setInput] = useState('');
  const [matches, setMatches] = useState(['']);

  const snippets = ['query', 'quswer', 'mutation'];

  const handleMatchClick = (match) => {
    setInput(match);
    setMatches([]);
  };

  return (
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
          onInput={handleCodeChange}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className={styles.code_editor}
          placeholder={t['Enter text here...']}
        />
        {matches.map((match, index) => (
          <div key={index} onClick={() => handleMatchClick(match)}>
            {match}
          </div>
        ))}
      </div>
      <p>{code.length}</p>
    </div>
  );
};

export default TextEditor;
