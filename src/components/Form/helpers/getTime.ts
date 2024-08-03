export default function getTime(str: string): number {
    const date: Date = new Date(str);

    if (date.toString() === 'Invalid Date') {
        return Infinity;
    }

    const time: number = date.getTime();

    return time;
}