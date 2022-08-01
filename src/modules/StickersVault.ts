import IExtractedPasswordsContainer from "../interfaces/ExtractedStickersVaultInterface";
import IExtractedPasswordSticker from "../interfaces/ExtractedPasswordStickerInterface";
import DateFormater from "./DateFormater";
import IDGenerator from "./IDGenerator";
import PasswordSticker from "./PasswordSticker";

export default class StickersVault{

    public readonly ID: string;
    private name: string = "New Container";
    private selectedStickerID: string = '';
    private lastOpenTime: Date;
    private password: string = "";
    private locked: boolean = false;

    private passwordStickers: Map<string, PasswordSticker> = new Map<string, PasswordSticker>();

    constructor(ID: string = '-', openTime: Date | undefined = undefined){
        if(ID == '-') this.ID = IDGenerator.generate('PC');
        else this.ID = ID;
        if(openTime != undefined) this.lastOpenTime = new Date(openTime);
        else this.lastOpenTime = new Date(Date.now());
    }

    changeName(newName: string){
        if(!this.locked) this.name = newName;
    }

    addPasswordSticker(){
        if(!this.locked){
            let sticker = new PasswordSticker();
            this.passwordStickers.set(sticker.ID, sticker);
        }
    }

    deleteSelectedSticker(){
       this.passwordStickers.delete(this.selectedStickerID);
       this.resetSelection();
    }

    loadStickers(stickers:IExtractedPasswordSticker[]){
        this.passwordStickers = new Map<string, PasswordSticker>();
        stickers.forEach(s => {
            let sticker = new PasswordSticker(s.ID);
            sticker.editName(s.name);
            sticker.editValue(s.value);
            sticker.editNotes(s.notes);
            this.passwordStickers.set(sticker.ID, sticker);
        })
    }

    extract(){

        DateFormater.setFormat('hh:mm | DD.MM.YY');

        let extractedContainer: IExtractedPasswordsContainer = {
            ID: this.ID,
            name: this.name,
            storedPasswordsCount: Array.from(this.passwordStickers.values()).length,
            lastOpenTime: DateFormater.formatDate(this.lastOpenTime),
            lastOpenTimeDate: this.lastOpenTime,
            locked: this.locked,
        }

        return extractedContainer;
    }

    extractAllPasswordStickers(){
        let stickers = Array.from(this.passwordStickers.values()).map(s => { return s.extract() });
        return stickers;
    }

    selectSticker(ID: string){

        if(ID== this.selectedStickerID)
            this.selectedStickerID = '';
        else
            this.selectedStickerID = ID;
    }

    changeStickerName(name: string){
        this.passwordStickers.get(this.selectedStickerID)?.editName(name);
    }

    changeStickerValue(value: string){
        this.passwordStickers.get(this.selectedStickerID)?.editValue(value);
    }

    changeStickerNotes(notes: string){
        this.passwordStickers.get(this.selectedStickerID)?.editNotes(notes);
    }

    resetSelection(){
        this.selectedStickerID = '';
    }

    extractSelectedSticker(){
        return this.passwordStickers.get(this.selectedStickerID)?.extract()
    }

    lock(){
        this.locked = true;
        this.passwordStickers.clear();
        this.password = "";
    }

    unlock(passwd: string){
        this.locked = false;
        this.password = passwd;
        this.lastOpenTime = new Date(Date.now());
    }

    changePassword(passwd: string){
        this.password = passwd;
    }

    getPassword(){
        return this.password;
    }
}