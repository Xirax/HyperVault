
export default class IDGenerator{

    static generate(letter: string){
        let idSeed = new Date(Date.now());
        let ID = letter + ';' + idSeed.getDate() + ';' + idSeed.getDay() + ';' + idSeed.getMonth() + ';' + idSeed.getFullYear() + ';';
        ID += idSeed.getHours() + ';' + idSeed.getMinutes() + ';' + idSeed.getSeconds() + ';' + Math.round(Math.random() * 1000);

        return ID;
    }
}