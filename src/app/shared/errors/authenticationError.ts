export default class AuthenticationError extends Error {
    code : number = 401;
    constructor(message: string) {
        super(message);
    };
};