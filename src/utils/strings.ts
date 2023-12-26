export const processString = (inputString: string): string => {
  let processedString = inputString.replace(/[.'\s]/g, '');

  processedString = processedString.toLowerCase();

  return processedString;
}