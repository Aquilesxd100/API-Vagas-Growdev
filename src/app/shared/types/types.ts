export interface JobsQueriesType {
    date: string | undefined,
    recruiter: string | undefined,
    active: string | undefined | boolean,
    full: string | undefined | boolean,
    empty: string | undefined | boolean,
    search: string | undefined
};

export interface SeparatedDateType {
    day: number,
    month: number,
    year: number
};