import { __Field } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsFieldType = {
  field: __Field;
};

const DocsField: FC<DocsFieldType> = ({ field }) => {
  return (
    <div>
      <p>{field.description}</p>
      <div>
        <div>
          <p>Type:</p>
          <p className="property_name docs_link">{field.type.name}</p>
        </div>
        <div>
          <p>Arguments</p>
          {field.args.map((arg) => {
            return (
              <div key={arg.name}>
                <span>{arg.name}: </span>
                <span>{arg.type.ofType?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocsField;
