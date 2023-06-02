import { JobsQueriesType } from "../../../shared/types/types";

export default function queriesLowCaseConveter(queries : JobsQueriesType) {
    if(typeof queries.active === "string") {
        queries.active = queries.active.toLowerCase();
    };

    if(typeof queries.full === "string") {
        queries.full = queries.full.toLowerCase();
    };
    
    if(typeof queries.empty === "string") {
        queries.empty = queries.empty.toLowerCase();
    };

    return queries;
}