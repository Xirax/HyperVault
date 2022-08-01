
export default class NoiseGenerator{

    private static dictionary: string = 'qwertyuiop[]asdfghjkl;zxcvbnm,.1234567890-=!@#$%^&*()_+QWERTYUIOPASDFGHJKLZXCVBNM';

    static generate(len: number){
        let noiseStr: string = "";

        for(let i=0; i<len; i++){
            let index = Math.round(Math.random() * (this.dictionary.length - 1));
            noiseStr += this.dictionary[index];
        }

        return noiseStr;
    }
}