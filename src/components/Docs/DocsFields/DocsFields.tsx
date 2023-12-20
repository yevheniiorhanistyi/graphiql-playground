/* eslint-disable no-unused-vars */
import { __Field, __Type, __TypeKind } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsFieldsType = {
  type: __Type;
  handleClickKey: (value: __Field) => void;
  handleClickValue: (value: __Type) => void;
};

const DocsFields: FC<DocsFieldsType> = ({ type, handleClickKey, handleClickValue }) => {
  const getNestedType = (type: __Type, value: string = ''): string | null => {
    console.log('nested Type: ', type);

    let name = value;

    console.log('name: ', name);

    if (type.ofType) {
      return getNestedType(type.ofType, name);
    }

    if (!type.ofType && type.name) {
      if (type.kind === __TypeKind.OBJECT) {
        name = type.name;
      }
      if (type.kind === __TypeKind.LIST) {
        name = `[${name}]`;
      }
      if (type.kind === __TypeKind.NON_NULL) {
        name = `${name}!`;
      }

      return name;
    }

    return name;
  };

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
                {field.type.kind === __TypeKind.OBJECT
                  ? field.type.name
                  : getNestedType(field.type)}
              </span>
            </p>
          </div>
        );
      })}
    </ul>
  );
};

export default DocsFields;
