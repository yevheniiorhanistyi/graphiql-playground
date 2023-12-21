/* eslint-disable no-unused-vars */
import FieldsIcon from '@/components/UI/FieldsIcon/FieldsIcon';
import { __Field, __Type, __TypeKind } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsFieldsType = {
  type: __Type;
  handleClickKey: (value: __Field) => void;
  handleClickValue: (value: __Type) => void;
};

const DocsFields: FC<DocsFieldsType> = ({ type, handleClickKey, handleClickValue }) => {
  const getTypeName = (type: __Type, arrayKind: Array<string> = []): string | null => {
    if (type.ofType && !type.name) {
      arrayKind.push(type.kind);
      return getTypeName(type.ofType, arrayKind);
    } else if (!type.ofType && type.name) {
      let name = type.name;

      arrayKind.reverse().forEach((item) => {
        if (item === __TypeKind.NON_NULL) {
          name = `${name}!`;
        }

        if (item === __TypeKind.LIST) {
          name = `[${name}]`;
        }
      });

      return name;
    }

    return null;
  };

  return (
    <div>
      <p>
        <b>{type.name}</b>
      </p>
      <div>{type.description ? type.description : 'No description FIELDS'}</div>
      {type.fields && (
        <>
          <FieldsIcon />
          <b>Fields</b>
          <ul>
            {type.fields.map((field) => {
              return (
                <li key={field.name}>
                  <p>
                    <span className="key_name docs-link" onClick={() => handleClickKey(field)}>
                      {field.name}
                    </span>
                    <span>( arguments ): </span>
                    <span
                      className="property_name docs-link"
                      onClick={() => handleClickValue(field.type)}
                    >
                      {getTypeName(field.type)}
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
