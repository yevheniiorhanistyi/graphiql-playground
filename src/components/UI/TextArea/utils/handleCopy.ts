export const handleCopy = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
    console.log('Text copied to clipboard');
  } catch (error) {
    console.error('Failed to copy text: ', error);
  }
};
