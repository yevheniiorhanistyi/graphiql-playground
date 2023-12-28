/* eslint-disable no-unused-vars */
import TypeIcon from '@/components/UI/TypeIcon/TypeIcon';
import { __Field, __Type } from '@/interfaces/schemaInterface';
import useTranslation from '@/localization/useTranslation';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';
import ArgumentsIcon from '@/components/UI/ArgumentsIcon/ArgumentsIcon';
import cn from 'classnames';
import styles from './DocsField.module.scss';

type DocsFieldType = {
  field: __Field;
  handleClickValue: (value: __Type) => void;
};

const DocsField: FC<DocsFieldType> = ({ field, handleClickValue }) => {
  const t = useTranslation();

  const { typeName } = getTypeName(field.type);
  return (
    <div className={styles.field_container}>
      <p>{field.description}</p>
      <div className={styles.field_container}>
        <p className={cn(styles.title_name, 'section_underline')}>
          <TypeIcon />
          {t['Type']}
        </p>
        <p className="property_name docs_link" onClick={() => handleClickValue(field.type)}>
          {typeName}
        </p>

        {field.args.length > 0 && (
          <div className={styles.field_container}>
            <p className={cn(styles.title_name, 'section_underline')}>
              <ArgumentsIcon />
              {t['Arguments']}
            </p>
            {field.args.map((arg) => {
              const { typeName } = getTypeName(arg.type);
              return (
                <div key={arg.name}>
                  <span style={{ color: '#9DC69D' }}>{arg.name}: </span>
                  <span
                    className="property_name docs_link"
                    onClick={() => handleClickValue(arg.type)}
                  >
                    {typeName}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsField;
