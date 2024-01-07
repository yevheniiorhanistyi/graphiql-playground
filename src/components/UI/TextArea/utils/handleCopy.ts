export const handleCopy = async (code: string) => {
  await navigator.clipboard.writeText(code);
};
