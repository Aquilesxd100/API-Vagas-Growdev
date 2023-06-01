export default class BadRequestError extends Error {
    code : number = 400;
    constructor(message: string) {
        super(message);
    };
};