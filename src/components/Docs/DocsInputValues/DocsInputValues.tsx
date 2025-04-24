/* eslint-disable no-unused-vars */
import FieldsIcon from '@/components/UI/FieldsIcon/FieldsIcon';
import { __Field, __InputValue, __Type } from '@/interfaces/schemaInterface';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';
import cn from 'classnames';
import styles from './DocsInputValues.module.scss';

type DocsInputValuesType = {
  type: __Type;
  handleClickValue: (value: __Type) => void;
  handleClickKey: (key: __Field | __InputValue) => void;
};

const DocsInputValues: FC<DocsInputValuesType> = ({ type, handleClickKey, handleClickValue }) => {
  const t = useTranslation();

  return (
    <div className={styles.input_values_container}>
      <div>{type.description ? type.description : t['No description']}</div>
      <p className={cn(styles.title_name, 'section_underline')}>
        <FieldsIcon />
        {t['Fields']}
      </p>
      {type.inputFields ? (
        <ul className={styles.input_values_container}>
          {type.inputFields.map((inputField) => {
            const { typeName } = getTypeName(inputField.type);
            return (
              <li key={inputField.name}>
                <span className="key_name docs_link" onClick={() => handleClickKey(inputField)}>
                  {inputField.name}:
                </span>
                <span> </span>
                <span
                  className="property_name docs_link"
                  onClick={() => handleClickValue(inputField.type)}
                >
                  {typeName}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{t['No fields']}</p>
      )}
    </div>
  );
};

export default DocsInputValues;
