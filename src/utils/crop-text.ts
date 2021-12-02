export const cropText = (text?: string | null, length = 40) => {
  if (!text) return null;
  if (text?.length <= length) return text;
  return `${text?.substring(0, length)}...`;
};
