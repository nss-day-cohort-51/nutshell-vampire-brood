export function dateTimeFormatter(DateObject){

    const dateString = new Date(DateObject);

    const formattedDate = dateString.toDateString();

    return formattedDate

}

