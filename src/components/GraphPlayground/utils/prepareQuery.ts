export const prepareQuery = (input: string): string => {
  return input.replace(/'/g, '"');
};
