import { JobsQueriesType } from "../../../shared/types/types";

export default function queryBooleanConverter
(queries : JobsQueriesType) : JobsQueriesType {
    if (queries.active) {
        queries.active = queries.active === "true" ? true : false;
    };

    if (queries.empty) {
        queries.empty = queries.empty === "true" ? true : false;
    };

    if (queries.full) {
        queries.full = queries.full === "true" ? true : false;
    };

    return queries;
};