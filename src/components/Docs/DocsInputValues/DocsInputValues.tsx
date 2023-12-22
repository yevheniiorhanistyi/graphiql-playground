/* eslint-disable no-unused-vars */
import FieldsIcon from '@/components/UI/FieldsIcon/FieldsIcon';
import { __Field, __InputValue, __Type } from '@/interfaces/schemaInterface';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';

type DocsInputValuesType = {
  type: __Type;
  handleClickValue: (value: __Type) => void;
  handleClickKey: (key: __Field | __InputValue) => void;
};

const DocsInputValues: FC<DocsInputValuesType> = ({ type, handleClickKey, handleClickValue }) => {
  const t = useTranslation();

  return (
    <div>
      <div>{type.description ? type.description : t['No description']}</div>
      <FieldsIcon />
      <p>{t['Fields']}</p>
      {type.inputFields ? (
        type.inputFields.map((inputField) => {
          const { typeName } = getTypeName(inputField.type);
          return (
            <li key={inputField.name}>
              <span className="key_name docs_link" onClick={() => handleClickKey(inputField)}>
                {inputField.name}:{' '}
              </span>
              <span
                className="property_name docs_link"
                onClick={() => handleClickValue(inputField.type)}
              >
                {typeName}
              </span>
            </li>
          );
        })
      ) : (
        <p>{t['No fields']}</p>
      )}
    </div>
  );
};

export default DocsInputValues;
