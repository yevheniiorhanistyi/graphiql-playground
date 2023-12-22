/* eslint-disable no-unused-vars */
import TypeIcon from '@/components/UI/TypeIcon/TypeIcon';
import { __InputValue, __Type } from '@/interfaces/schemaInterface';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';

type DocsInputValueType = {
  inputValue: __InputValue;
  handleClickValue: (value: __Type) => void;
};

const DocsInputValue: FC<DocsInputValueType> = ({ inputValue, handleClickValue }) => {
  const { typeName } = getTypeName(inputValue.type);

  const t = useTranslation();

  return (
    <div>
      <p>
        <b>{inputValue.name}</b>
      </p>
      <p>
        <TypeIcon />
        <b>{t['Type']}</b>
      </p>
      <p className="property_name docs_link" onClick={() => handleClickValue(inputValue.type)}>
        {typeName}
      </p>
    </div>
  );
};

export default DocsInputValue;
