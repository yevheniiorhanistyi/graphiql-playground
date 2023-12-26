/* eslint-disable no-unused-vars */
import { __Field, __InputValue, __Schema, __Type, __TypeKind } from '@/interfaces/schemaInterface';
import { FC } from 'react';
import DocsFields from '../DocsFields/DocsFields';
import DocsField from '../DocsField/DocsField';
import findGraphQLType from '@/utils/graphQL_API/findGraphQLType';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import DocsInputValues from '../DocsInputValues/DocsInputValues';
import DocsInputValue from '../DocsInputValue/DocsInputValue';
import DocsRoot from '../DocsRoot/DocsRoot';

type DocsSchemaType = {
  schema: __Schema;
  docsStack: Array<__Type | __Field | __InputValue>;
  setDocsStack: (value: Array<__Type | __Field | __InputValue>) => void;
};

const DocsSchema: FC<DocsSchemaType> = ({ schema, docsStack, setDocsStack }) => {
  const handleClickKey = (key: __Field | __InputValue) => {
    setDocsStack([...docsStack, key]);
  };

  const handleClickValue = (value: __Type) => {
    const { name } = getTypeName(value);

    if (name) {
      const type = findGraphQLType(schema, name);

      if (type) {
        setDocsStack([...docsStack, type]);
      }
    }
  };

  return (
    <>
      {docsStack.length === 1 && (
        <DocsRoot
          schema={schema}
          handleClickKey={handleClickKey}
          handleClickValue={handleClickValue}
        />
      )}

      {docsStack.length > 1 &&
        !('args' in docsStack[docsStack.length - 1]) &&
        'kind' in docsStack[docsStack.length - 1] &&
        (docsStack[docsStack.length - 1] as __Type).kind !== __TypeKind.INPUT_OBJECT && (
          <DocsFields
            type={docsStack[docsStack.length - 1] as __Type}
            handleClickKey={handleClickKey}
            handleClickValue={handleClickValue}
          />
        )}

      {docsStack.length > 1 &&
        !('kind' in docsStack[docsStack.length - 1]) &&
        (docsStack[docsStack.length - 1] as __Field) &&
        (docsStack[docsStack.length - 1] as __Field).args && ( //
          <DocsField
            field={docsStack[docsStack.length - 1] as __Field}
            handleClickValue={handleClickValue}
          />
        )}

      {docsStack.length > 1 &&
        (docsStack[docsStack.length - 1] as __Type).kind === __TypeKind.INPUT_OBJECT && (
          <DocsInputValues
            type={docsStack[docsStack.length - 1] as __Type}
            handleClickValue={handleClickValue}
            handleClickKey={handleClickKey}
          />
        )}

      {docsStack.length > 1 &&
        !('kind' in docsStack[docsStack.length - 1]) &&
        !('args' in (docsStack[docsStack.length - 1] as __InputValue)) && (
          <DocsInputValue
            inputValue={docsStack[docsStack.length - 1] as __InputValue}
            handleClickValue={handleClickValue}
          />
        )}
    </>
  );
};

export default DocsSchema;
