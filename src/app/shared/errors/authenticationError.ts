export default class AuthenticationError extends Error {
    statusCode : number = 401;
    constructor(message: string) {
        super(message);
    };
};