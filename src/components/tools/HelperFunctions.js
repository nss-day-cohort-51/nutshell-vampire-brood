export const RT = (string) => {
    if (string?.trim().length > 0) {
        const regex = /t/g;
        const cross = "✞";
        return string.replace(regex, cross);
    } else return string;
};
