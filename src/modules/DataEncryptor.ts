import CryptoJS from "crypto-js";

export default class DataEncryptor{

    static encrypt(password: string, data: string){
        let key = this.hashPassword(password);
        let encryption = CryptoJS.AES.encrypt(data, key).toString();
        return encryption;
    }

    static decrypt(password: string, encryption: string){
        let key = this.hashPassword(password);
        let data = CryptoJS.AES.decrypt(encryption, key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data.toString());
    }


    private static hashPassword(pass: string){
        let hash = '';
        // Here is password hashing code to make encoding stronger and I want to keep it secret ;)

        return hash;
    }
}
