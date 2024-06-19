export const getRandom = (minValue: number, maxValue: number): number => {
    return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
};
