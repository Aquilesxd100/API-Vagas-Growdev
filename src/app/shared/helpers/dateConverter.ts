import { SeparatedDateType } from "../types/types";

export default function dateConverter(date : string) : SeparatedDateType {
    return {
        day: Number(date.substring(0, 2)),
        month: Number(date.substring(3, 5)), 
        year: Number(date.substring(6, 10))
    };
};