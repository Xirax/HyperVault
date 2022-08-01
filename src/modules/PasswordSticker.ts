import IExtractedPasswordSticker from "../interfaces/ExtractedPasswordStickerInterface";
import DateFormater from "./DateFormater";
import IDGenerator from "./IDGenerator";

export default class PasswordSticker{
    public readonly ID: string;
    private name: string = "New Sticker";
    private value: string = "";
    private creationDate: Date;
    private notes: string = "...";

    constructor(ID: string = '-'){
        this.creationDate = new Date(Date.now());

        if(ID == '-')
            this.ID = IDGenerator.generate('PS');
        else
            this.ID = ID;
    }

    editName(newName: string){
        this.name = newName;
    }

    editValue(newVal: string){
        this.value = newVal;
    }

    editNotes(notes: string){
        this.notes = notes;
    }

    extract(){

        DateFormater.setFormat('DD.MM.YY');

        let extractedSticker: IExtractedPasswordSticker = {
            ID: this.ID,
            name: this.name,
            value: this.value,
            creationDate: DateFormater.formatDate(this.creationDate),
            notes: this.notes
        }

        return extractedSticker;
    }
}