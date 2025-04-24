import { __Field, __InputValue, __Schema, __Type } from '@/interfaces/schemaInterface';
import { FC, useEffect, useState } from 'react';
import DocsHeader from './DocsHeader/DocsHeader';
import DocsContent from './DocsContent/DocsContent';
import styles from './Docs.module.scss';
import useTranslation from '@/localization/useTranslation';

type DocsType = {
  schema: __Schema;
  handleClose: () => void;
};

const Docs: FC<DocsType> = ({ schema, handleClose }) => {
  const [headerPrevTitle, setHeaderPrevTitle] = useState<string>('');
  const [docsStack, setDocsStack] = useState<Array<__Type | __Field | __InputValue>>([]);

  const t = useTranslation();

  useEffect(() => {
    const queryName = schema.queryType.name;
    const query = schema.types.find((type) => type.name === queryName);
    if (query) {
      setDocsStack([query]);
    }
  }, [schema]);

  useEffect(() => {
    if (docsStack.length === 1) {
      setHeaderPrevTitle(t['GraphQL Docs']);
    } else if (docsStack.length >= 2) {
      setHeaderPrevTitle(docsStack[docsStack.length - 2].name || t['No type name found']);
    }
  }, [docsStack, t]);

  const handleBackClick = () => {
    if (docsStack.length !== 0) {
      const newArray = docsStack.filter((item, index) => index !== docsStack.length - 1);
      setDocsStack(newArray);
    }
  };

  return (
    <div className={styles.container}>
      <DocsHeader
        titlePrevType={headerPrevTitle}
        handleClose={handleClose}
        handleBack={handleBackClick}
        isRoot={docsStack.length > 1}
      />
      {docsStack.length === 0 ? (
        <p>{t['No GraphQL schema']}</p>
      ) : (
        <DocsContent schema={schema} docsStack={docsStack} setDocsStack={setDocsStack} />
      )}
    </div>
  );
};

export default Docs;
