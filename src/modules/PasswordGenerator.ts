
export default class PasswordGenerator{

    private static library: string = "1234567890-!@#$%^&*()_+qwertyuiop[]asdfghjkl;zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:ZXCVBNM<>?";

    static generate(minLen: number=9, maxLen: number = 30){
        let length = Math.round(Math.random() * (maxLen - minLen)) + minLen;
        let passStr = "";

        for(let i=0; i<length; i++){
            let pos = Math.round(Math.random() * (this.library.length - 1));
            passStr += this.library[pos];
        }

        return passStr;
    }
}