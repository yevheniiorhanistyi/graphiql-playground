/* eslint-disable no-unused-vars */
import TypeIcon from '@/components/UI/TypeIcon/TypeIcon';
import { __InputValue, __Type } from '@/interfaces/schemaInterface';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';
import cn from 'classnames';
import styles from './DocsInputValue.module.scss';

type DocsInputValueType = {
  inputValue: __InputValue;
  handleClickValue: (value: __Type) => void;
};

const DocsInputValue: FC<DocsInputValueType> = ({ inputValue, handleClickValue }) => {
  const { typeName } = getTypeName(inputValue.type);

  const t = useTranslation();

  return (
    <div className={styles.input_value_container}>
      <p className={styles.title_name_main}>{inputValue.name}</p>
      <div className={cn(styles.title_name, 'section_underline')}>
        <TypeIcon />
        {t['Type']}
      </div>
      <p className="property_name docs_link" onClick={() => handleClickValue(inputValue.type)}>
        {typeName}
      </p>
    </div>
  );
};

export default DocsInputValue;
