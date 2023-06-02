import BadRequestError from "../../../shared/errors/badRequestError";
import { JobsQueriesType } from "../../../shared/types/types";
import validDateFormat from "../../../shared/validators/validDateFormat";

export default function validAdminJobsQueries(queries : JobsQueriesType) {
    if (queries.active) {
        if (queries.active !== "true" && queries.active !== "false") {
            throw new BadRequestError("A query active só pode ter valor true ou false.");
        };       
    };

    if (queries.empty) {
        if (queries.empty !== "true" && queries.empty !== "false") {
            throw new BadRequestError("A query empty só pode ter valor true ou false.");
        };       
    };

    if (queries.full) {
        if (queries.full !== "true" && queries.full !== "false") {
            throw new BadRequestError("A query full só pode ter valor true ou false.");
        };       
    };

    if (queries.date) {
        const checkDate : boolean = validDateFormat(queries.date);

        if (!checkDate) {
            throw new BadRequestError("Informe uma data em formato válido. (ex:25/06/2023)");
        };       
    };    
};