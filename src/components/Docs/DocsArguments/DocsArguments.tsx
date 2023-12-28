/* eslint-disable no-unused-vars */
import { __Field, __Type } from '@/interfaces/schemaInterface';
import getTypeName from '@/utils/graphQL_API/getTypeName';
import { FC } from 'react';

type DocsArgumentsType = {
  field: __Field;
  handleClickValue: (value: __Type) => void;
};

const DocsArguments: FC<DocsArgumentsType> = ({ field, handleClickValue }) => {
  const argumentsList = field.args.map((arg, index) => {
    const { typeName } = getTypeName(arg.type);
    return (
      <span key={arg.name}>
        <span style={{ color: 'var(--font-key-argument-color)' }}>{arg.name}</span>
        <span>: </span>
        <span className="property_name docs-link" onClick={() => handleClickValue(arg.type)}>
          {typeName}
        </span>
        {field.args.length - 1 !== index && <span>, </span>}
      </span>
    );
  });
  return field.args.length > 0 ? <span>({argumentsList})</span> : null;
};

export default DocsArguments;
