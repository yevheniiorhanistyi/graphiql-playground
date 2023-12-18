import { __Field } from '@/interfaces/schemaInterface';
import { FC } from 'react';

type DocsTypeType = {
  field: __Field;
};

const DocsType: FC<DocsTypeType> = ({ field }) => {
  return (
    <div>
      <p>
        <span className="key_name docs-link">{field.name}</span>
        <span>( arguments ): </span>
        <span className="property_name docs-link">{field.type.name}</span>
      </p>
    </div>
  );
};

export default DocsType;
