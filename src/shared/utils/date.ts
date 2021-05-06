export function getFormatDate(d: Date, extraDay = 0) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + (d.getDate() + extraDay);
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
