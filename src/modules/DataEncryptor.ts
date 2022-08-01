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
        
        for(let i=0; i<pass.length; i++){
            let ascii = pass.charCodeAt(i);
            ascii += Math.ceil(Math.pow(ascii, Math.floor(ascii / 2) - 1) / 3) % 150;
            if(ascii  > 32 && ascii < 127) hash += String.fromCharCode(ascii);
            else hash += ascii;
        }

        return hash;
    }
}
