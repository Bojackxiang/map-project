import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.SECRET as string);

export const encodePassword = (password?: string) => {
    if (!password) return undefined;
    return cryptr.encrypt(password);
};

export const decodePassword = (password?: string) => {
    if (!password) return undefined;
    return cryptr.decrypt(password);
};
