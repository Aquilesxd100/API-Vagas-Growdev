export default function validName(name: string) : true | string {
    if (name.length < 6 || name.length > 50) {
        return "O name precisa ter ao menos 6 caracteres e no máximo 50.";
    };
    if (name.split(" ").length === 1) {
        return "O name precisa incluir sobrenome.";
    };
    return true;
};