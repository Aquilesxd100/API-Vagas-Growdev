import { SeparatedDateType } from "../types/types";
import dateConverter from "./dateConverter";

export default function isExpiredDateCheck
(date : string, expirationDate : string) : boolean {
    const cdate : SeparatedDateType = dateConverter(date);
    const exdate : SeparatedDateType = dateConverter(expirationDate);
    if (cdate.year > exdate.year) {
        return true;
    };

    if (cdate.year === exdate.year && cdate.month > exdate.month) {
        return true;
    };

    if (cdate.year === exdate.year && cdate.month === exdate.month && cdate.day > exdate.day) {
        return true;
    };

    return false;
};