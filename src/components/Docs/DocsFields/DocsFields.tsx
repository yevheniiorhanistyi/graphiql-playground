/* eslint-disable no-unused-vars */
import { __Field, __Type } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsFieldsType = {
  type: __Type;
  handleClickKey: (value: __Field) => void;
  handleClickValue: (value: __Type) => void;
};

const DocsFields: FC<DocsFieldsType> = ({ type, handleClickKey, handleClickValue }) => {
  return (
    <ul>
      <div>{type.description ? type.description : 'No description'}</div>
      {type.fields?.map((field) => {
        return (
          <div key={field.name}>
            <p>
              <span className="key_name docs-link" onClick={() => handleClickKey(field)}>
                {field.name}
              </span>
              <span>( arguments ): </span>
              <span
                className="property_name docs-link"
                onClick={() => handleClickValue(field.type)}
              >
                {field.type.name}
              </span>
            </p>
          </div>
        );
      })}
    </ul>
  );
};

export default DocsFields;
