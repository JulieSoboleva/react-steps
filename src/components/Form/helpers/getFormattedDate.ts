export default function getFormattedDate(str: string) {
    const date: Date = new Date(str);

    if (date.toString() === 'Invalid Date') {
        return null;
    }

    const options: Intl.DateTimeFormatOptions= { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric' 
    };

    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return formattedDate;
}