export function formatDate(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export function getTwoYearsBackFromYesterday(): string {
    const today = formatDate(new Date());

    // Calculate yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() -1);

    // Calculate two years back from yesterday
    const twoYearsBack = new Date(yesterday);
    twoYearsBack.setFullYear(yesterday.getFullYear() -2);

    // format date as YYYY-MM-DD
    return twoYearsBack.toISOString().split('T')[0];
}

export function yesterdaysDateString(): string {
    const today = formatDate(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() -1);
    return yesterday.toISOString().split('T')[0];
}