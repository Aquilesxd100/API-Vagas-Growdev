export default class ForbiddenError extends Error {
    statusCode : number = 403;
    constructor(message: string) {
        super(message);
    };
};