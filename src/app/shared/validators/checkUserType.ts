import ForbiddenError from "../errors/forbiddenError";

export default function checkUserType
(userType : string, typeCheck : string) : void {
    userType = userType.toLowerCase();
    if (userType !== typeCheck) {
        throw new ForbiddenError("Você não tem acesso a essa rota.");
    };
};