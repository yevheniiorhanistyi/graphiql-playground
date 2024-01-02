/* eslint-disable no-unused-vars */
import FieldsIcon from '@/components/UI/FieldsIcon/FieldsIcon';
import { __Field, __Type } from '@/interfaces/schemaInterface';
import { FC } from 'react';
import DocsArguments from '../DocsArguments/DocsArguments';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import cn from 'classnames';
import styles from './DocsFields.module.scss';

type DocsFieldsType = {
  type: __Type;
  handleClickKey: (value: __Field) => void;
  handleClickValue: (value: __Type) => void;
};

const DocsFields: FC<DocsFieldsType> = ({ type, handleClickKey, handleClickValue }) => {
  const t = useTranslation();

  return (
    <div className={styles.fields_container}>
      <p className={styles.title_name_main}>{type.name}</p>
      <div>{type.description ? type.description : t['No description']}</div>
      {type.fields && (
        <>
          <div className={cn(styles.title_name, 'section_underline')}>
            <FieldsIcon />
            {t['Fields']}
          </div>
          <ul>
            {type.fields.map((field) => {
              const { typeName } = getTypeName(field.type);
              return (
                <li key={field.name}>
                  <p>
                    <span className="key_name docs-link" onClick={() => handleClickKey(field)}>
                      {field.name}
                    </span>
                    <span>
                      <DocsArguments field={field} handleClickValue={handleClickValue} />:{' '}
                    </span>
                    <span
                      className="property_name docs-link"
                      onClick={() => handleClickValue(field.type)}
                    >
                      {typeName}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default DocsFields;
