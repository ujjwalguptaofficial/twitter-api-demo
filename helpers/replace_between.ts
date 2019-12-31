export const replaceBetween = (val: string, start, end, textToReplace) => {
    return val.substring(0, start) + textToReplace + val.substring(end);
};