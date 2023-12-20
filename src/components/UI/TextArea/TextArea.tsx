import React, { ChangeEvent, useState } from 'react';
import styles from './TextArea.module.scss';

const Textarea = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const getLineNumbers = () => {
    const lines = text.split('\n');
    return lines.map((_, index) => (
      <div key={index} className={styles.lineNumber}>
        {index + 1}
      </div>
    ));
  };

  return (
    <div className={styles.textareaContainer}>
      <p className={styles.lineNumbers}>{getLineNumbers()}</p>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
        data-line-number={getLineNumbers()}
      />
    </div>
  );
};

export default Textarea;
