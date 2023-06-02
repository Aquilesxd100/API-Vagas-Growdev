import dateConverter from "../helpers/dateConverter";

export default function validDateFormat(date : string) : boolean {
    if (date.length !== 10) {
        return false;
    };

    if (date.substring(2, 3) !== "/" || date.substring(5, 6) !== "/") {
        return false;  
    };

    const convertedDate = dateConverter(date);
    if (isNaN(convertedDate.day) || isNaN(convertedDate.month) || isNaN(convertedDate.year)) {
        return false;
    };

    if (convertedDate.day < 1 || convertedDate.day > 31) {
        return false;
    };

    if (convertedDate.month < 1 || convertedDate.month > 12) {
        return false;
    };
    
    return true;
};