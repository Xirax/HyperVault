
class Ratings{

    static #ratings = ['very bad', 'bad', 'weak', 'good', 'strong', 'very strong', 'insane'];
    static #colors = ['#990000', '#ff0000', '#ff8c1a', '#ccff66', '#4dff4d', '#00ff99', '#00e6b8'];
    static #dateColors = ['#00e673', '#00b300', '#c6ff1a', '#ffd11a', '#e65c00', '#e62e00', '#b30000'];
    
    static ratePassword(pass){
        let rating = 0;
    
        let bigLettersAmount = [...pass.matchAll(/[A-Z]/g)].length;
        let smallLettersAmount = [...pass.matchAll(/[a-z]/g)].length;
        let numbersAmount = [...pass.matchAll(/[0-9]/g)].length;
        let specialAmount = [...pass.matchAll(/[!@#$%^&*()_+\-[\]{};:<>?,./]/g)].length;
    
        if(pass.length >= 5) rating++;
        if(bigLettersAmount > 2 || smallLettersAmount > 2) rating++;
        if(bigLettersAmount >= 3 && smallLettersAmount >= 3) rating++;
        if(numbersAmount >= 2) rating++;
        if(specialAmount >= 1) rating++;
        if(specialAmount >= 2 && numbersAmount >= 3 && bigLettersAmount >= 4 && smallLettersAmount >= 4) rating++;
    
        return [this.#ratings[rating], this.#colors[rating]];
    } 

    static rateDate(date){
        let today = new Date(Date.now());
        date = new Date(2022, 6, 26);
        let day = 24 * 3600 * 1000;
        let stamp = Math.floor((today - date) / day);
        
        let rating = 0;

        if(stamp > 30) rating++;
        if(stamp > 90) rating++;
        if(stamp > 180) rating++;
        if(stamp > 300) rating++;
        if(stamp > 390) rating++;
        if(stamp > 720) rating++;

        return this.#dateColors[rating]; 
    }
}