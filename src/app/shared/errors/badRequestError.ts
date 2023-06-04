export default class BadRequestError extends Error {
    statusCode : number = 400;
    constructor(message: string) {
        super(message);
    };
};