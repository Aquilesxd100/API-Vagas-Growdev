export default class ForbiddenError extends Error {
    code : number = 403;
    constructor(message: string) {
        super(message);
    };
};