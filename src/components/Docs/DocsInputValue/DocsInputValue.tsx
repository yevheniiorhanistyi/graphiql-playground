/* eslint-disable no-unused-vars */
import { __InputValue, __Type } from '@/interfaces/schemaInterface';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';

type DocsInputValueType = {
  inputValue: __InputValue;
  handleClickValue: (value: __Type) => void;
};

const DocsInputValue: FC<DocsInputValueType> = ({ inputValue, handleClickValue }) => {
  const { typeName } = getTypeName(inputValue.type);
  return (
    <div>
      <p>
        <b>{inputValue.name}</b>
      </p>
      <p>
        <b>Type</b>
      </p>
      <p className="property_name docs_link" onClick={() => handleClickValue(inputValue.type)}>
        {typeName}
      </p>
    </div>
  );
};

export default DocsInputValue;
