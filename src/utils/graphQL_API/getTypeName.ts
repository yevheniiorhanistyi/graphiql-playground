import { __Type, __TypeKind } from '@/interfaces/schemaInterface';

const getTypeName = (
  type: __Type,
  arrayKind: Array<string> = []
): { name: string | null; typeName: string | null } => {
  if (type.ofType && !type.name) {
    arrayKind.push(type.kind);
    return getTypeName(type.ofType, arrayKind);
  } else if (!type.ofType && type.name) {
    const name = type.name;
    let typeName = type.name;

    arrayKind.reverse().forEach((item) => {
      if (item === __TypeKind.NON_NULL) {
        typeName = `${typeName}!`;
      }

      if (item === __TypeKind.LIST) {
        typeName = `[${typeName}]`;
      }
    });

    return { name, typeName };
  }

  return { name: null, typeName: null };
};

export default getTypeName;
