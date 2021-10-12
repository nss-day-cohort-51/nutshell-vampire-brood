export const replaceT = (string) => {
    const regex = /t/i;
    const cross = "✞";
    return string.replace(regex, cross);
};
