
export default class DateFormater{

    private static format: string = "";
    private static subFormat: string = "";
    private static dateStr: string = "";
    private static formaters: string = 'hmsDMYW';

    static setFormat(format: string){
        this.format = format;
    }

    static formatDate(date: Date){
        this.subFormat = this.format;
        this.dateStr = "";

        while(this.subFormat.length > 0){
            if(this.formaters.includes(this.subFormat[0])){
                let value = this.getRightDateValue(this.subFormat[0], date);
                this.replaceWithValue(this.subFormat[0], value);
            }else{
                this.dateStr += this.subFormat[0];
                this.subFormat = this.subFormat.substring(1);
            }
              
        }

        return this.dateStr;
    }

    private static getRightDateValue(formater: string, date: Date){
        if(formater == 'h') return date.getHours();
        if(formater == 'm') return date.getMinutes();
        if(formater == 's') return date.getSeconds();
        if(formater == 'D') return date.getDate();
        if(formater == 'M') return date.getMonth() + 1;
        if(formater == 'Y') return date.getFullYear();
        if(formater == 'W') return date.getDay();

        return '';
    }


    private static replaceWithValue(element: string, value: string | number){
        let dualValue = this.subFormat.includes(element + element);

        if(dualValue && value < 10)
            this.dateStr += '0' + value.toString();
        else 
            this.dateStr += value.toString();   
        

        if(dualValue)
            this.subFormat = this.subFormat.substring(2);
        else
            this.subFormat = this.subFormat.substring(1);
    }
}