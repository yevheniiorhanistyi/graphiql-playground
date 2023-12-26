/* eslint-disable no-unused-vars */
import RootIcon from '@/components/UI/RootIcon/RootIcon';
import { SchemaTypes } from '@/constants/enums';
import { TypeInterface, __Field, __Schema, __Type } from '@/interfaces/schemaInterface';
import React, { FC, useState } from 'react';
import DocsFields from '../DocsFields/DocsFields';
import useTranslation from '@/localization/useTranslation';
import cn from 'classnames';
import styles from './DocsRoot.module.scss';

type DocsRootType = {
  schema: __Schema;
  handleClickKey: (value: __Field) => void;
  handleClickValue: (value: __Type) => void;
};

const DocsRoot: FC<DocsRootType> = ({ schema, handleClickKey, handleClickValue }) => {
  const [isQueryTypeDisplayed, setIsQueryTypeDisplayed] = useState<boolean>(false);
  const [isMutationDisplayed, setIsMutationDisplayed] = useState<boolean>(false);
  const [isSubscriptionDisplayed, setIsSubscriptionDisplayed] = useState<boolean>(false);

  const t = useTranslation();

  const handleTypeClick = (value: string) => {
    if (value === SchemaTypes.QUERY_TYPE) {
      setIsQueryTypeDisplayed((prev) => !prev);
    }
    if (value === SchemaTypes.MUTATION_TYPE) {
      setIsMutationDisplayed((prev) => !prev);
    }
    if (value === SchemaTypes.SUBSCRIPTION_TYPE) {
      setIsSubscriptionDisplayed((prev) => !prev);
    }
  };

  const typeList = Object.keys(schema).map((schemaKey) => {
    if (
      schema[schemaKey as keyof __Schema] !== null &&
      (schemaKey === SchemaTypes.QUERY_TYPE ||
        schemaKey === SchemaTypes.MUTATION_TYPE ||
        schemaKey === SchemaTypes.SUBSCRIPTION_TYPE)
    ) {
      let isDisplay = null;
      if (schemaKey === SchemaTypes.QUERY_TYPE) {
        isDisplay = isQueryTypeDisplayed;
      }
      if (schemaKey === SchemaTypes.MUTATION_TYPE) {
        isDisplay = isMutationDisplayed;
      }
      if (schemaKey === SchemaTypes.SUBSCRIPTION_TYPE) {
        isDisplay = isSubscriptionDisplayed;
      }

      return (
        <div key={schemaKey} className={styles.list_container}>
          <p>
            <span className="key_name_title">{t['Type']}: </span>
            <span onClick={() => handleTypeClick(schemaKey)} className="property_name docs-link">
              {(schema[schemaKey as keyof __Schema] as TypeInterface).name}
            </span>
          </p>

          {isDisplay && (
            <DocsFields
              type={schema.types.find((type) => type.name === schema[schemaKey]?.name)!}
              handleClickKey={handleClickKey}
              handleClickValue={handleClickValue}
            />
          )}
        </div>
      );
    }
  });

  return (
    <div className={styles.root_container}>
      <p>{t['Schema description']}</p>

      <div className={cn(styles.section_title, 'section_underline')}>
        <RootIcon />
        <p className={styles.title_main}>{t['Root Types']}</p>
      </div>

      <div className={styles.sections_container}>{typeList}</div>
    </div>
  );
};

export default DocsRoot;
