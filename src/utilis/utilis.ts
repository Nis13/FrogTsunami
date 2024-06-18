export const getRandom = (minValue:number, maxValue:number) => {
    return minValue + Math.random() * (maxValue - minValue);
}