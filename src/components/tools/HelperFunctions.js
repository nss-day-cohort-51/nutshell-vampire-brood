export const RT = (string) => {
    const d = new Date();
    const time = d.getTime();
    const timeRounded = Math.floor(time / 2000) % 20;
    const symbols = [
        "✞",
        "τ",
        "Τ",
        "┳",
        "╦",
        "╥",
        "☂",
        "☺",
        "☾",
        "♰",
        "♱",
        "✞",
        "♰",
        "♱",
        "✞",
        "♰",
        "♱",
        "✞",
        "⚚",
        "ⲧ",
    ];

    if (string?.trim().length > 0) {
        const regex = /t/g;
        const cross = symbols[timeRounded];
        return string.replace(regex, cross);
    } else return string;
};
