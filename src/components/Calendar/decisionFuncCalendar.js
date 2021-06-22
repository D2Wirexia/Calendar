const TOTAL_DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const getMouthDate = (year, mouth) => {
    const result = []
    const newDate = new Date(year, mouth)
    const totalDay = (newDate) => {
        const month = newDate.getMonth();
        const year = newDate.getFullYear();
        //проверка на высокосный Февраль
        const isLeapYear = !((year % 4) || (!(year % 100) && (year % 400)))
        return isLeapYear && month === 1 ? 29 : TOTAL_DAYS_IN_MONTH[month]
    }
    const startDay = newDate => {
        const dayOfWeek = newDate.getDay()
        return dayOfWeek === 0 ? 6 : dayOfWeek - 1
    }
    let day = 1
    for (let i = 0; i < (totalDay(newDate) + startDay(newDate)) / 7; i++) {
        result[i] = []
        for (let j = 0; j < 7; j++) {
            //проверка прошлого месяца              заполнить остаток
            (i === 0 && j < startDay(newDate)) || (day > totalDay(newDate))
                ? result[i][j] = undefined
                : result[i][j] = new Date(year, mouth, day++)
        }
    }
    return result
}
