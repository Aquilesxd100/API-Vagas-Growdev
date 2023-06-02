import ForbiddenError from "../errors/forbiddenError";

export default function checkUserType
(userType : string, validTypes : Array<string>) : void {
    userType = userType.toLowerCase();
    if (!validTypes.some((validType) => validType === userType)) {
        throw new ForbiddenError("Você não tem acesso a essa rota.");
    };
};