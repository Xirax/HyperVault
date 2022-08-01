import IExtractedStickersVault from "../interfaces/ExtractedStickersVaultInterface";
import DataEncryptor from "./DataEncryptor";
import FileManager from "./fileManager";
import NoiseGenerator from "./noiseGenerator";
import StickersVault from "./StickersVault";

export default class VaultsManager{
    private vaults: Map<string, StickersVault> = new Map<string, StickersVault>();
    private selectedVaultID: string = '';

    constructor(){
        this.loadVaults();
    }

    addVault(){
        let container = new StickersVault();
        this.vaults.set(container.ID, container);
        let allVaults = this.extractAllVaults();
        FileManager.save('data', JSON.stringify(allVaults));
    }

    loadVaults(){
        let data = FileManager.load('data');

        try{
            let vaults: IExtractedStickersVault[] = JSON.parse(data);
            vaults.forEach(v => {
                let vault = new StickersVault(v.ID, v.lastOpenTimeDate);
                vault.changeName(v.name);
                vault.lock();
                
                this.vaults.set(v.ID, vault);
            })
        }catch(err){}
    }

    deleteVault(){
        this.vaults.delete(this.selectedVaultID);
        FileManager.delete(this.selectedVaultID);
        this.selectedVaultID = '';
        let allVaults = this.extractAllVaults();
        FileManager.save('data', JSON.stringify(allVaults));
    }

    selectVault(reqBody: any){
        let ID: string = reqBody.ID; 
        this.vaults.get(this.selectedVaultID)?.resetSelection();   
        
        if(ID == this.selectedVaultID)
            this.selectedVaultID = '';
        else
            this.selectedVaultID = ID;
    }

    addStickerToSelected(){
        this.vaults.get(this.selectedVaultID)?.addPasswordSticker();
    }

    changeVaultName(reqBody: any){
        let name: string = reqBody.name;
        this.vaults.get(this.selectedVaultID)?.changeName(name);
        let allVaults = this.extractAllVaults();
        FileManager.save('data', JSON.stringify(allVaults));
    }

    changeVaultPassword(reqBody: any){
        let oldPass: string = reqBody.oldPassword;
        let newPass: string = reqBody.newPassword;
        let retypePass: string = reqBody.retypePassword;
        let selectedVault = this.vaults.get(this.selectedVaultID);

        if(selectedVault?.getPassword() == oldPass){
            if(newPass == retypePass){
                selectedVault?.changePassword(newPass);
                this.updateDataFile();
                return "";
            }
            else return "Passwords don't match";
        }
        else return "Wrong old password";
    }

    updateSticker(reqBody: any){
        let stickerName: string = reqBody.name;
        let stickerValue: string = reqBody.value;
        let stickerNotes: string = reqBody.notes;
        let selectedVault = this.vaults.get(this.selectedVaultID);

        if(stickerName) selectedVault?.changeStickerName(stickerName);
        if(stickerValue) selectedVault?.changeStickerValue(stickerValue);
        if(stickerNotes) selectedVault?.changeStickerNotes(stickerNotes);

        this.updateDataFile();
    }

    deleteSticker(){
        let selectedVault = this.vaults.get(this.selectedVaultID);
        selectedVault?.deleteSelectedSticker();
        if(selectedVault) this.updateDataFile();
    }

    lockSelected(){
        this.updateDataFile();
        let selectedVault = this.vaults.get(this.selectedVaultID);
        selectedVault?.lock();   
    }

    unlockSelected(reqBody: any){
        let password: string = reqBody.password;
        let encryptedData = FileManager.load(this.selectedVaultID);
        
        try{
            let decryptedData = DataEncryptor.decrypt(password, encryptedData);
            let selectedVault = this.vaults.get(this.selectedVaultID);
            selectedVault?.loadStickers(decryptedData.stickers);
            selectedVault?.unlock(password);
            return "";
        }catch(err){
            return "Wrong password";
        }
    }

    extractAllVaults(){
        let containers: IExtractedStickersVault[] = Array.from(this.vaults.values()).map(c => { return c.extract() });
        return containers;
    }

    extractSelectedVault(){
        let extracted = this.vaults.get(this.selectedVaultID)?.extract();
        return extracted;
    }

    extractSelectedContainerStickers(){
        return this.vaults.get(this.selectedVaultID)?.extractAllPasswordStickers();
    }

    selectSticker(reqBody: any){
        let stickerID: string = reqBody.ID;
        this.vaults.get(this.selectedVaultID)?.selectSticker(stickerID);
    }

    extractSelectedSticker(){
        return this.vaults.get(this.selectedVaultID)?.extractSelectedSticker();
    }

    private updateDataFile(){
        let selectedVault = this.vaults.get(this.selectedVaultID);
        let stickers = selectedVault?.extractAllPasswordStickers();
        let password = selectedVault?.getPassword();

        if(password == undefined) password = "";

        let dataToEncrypt = {
            stickers: stickers,
            randomNoise: NoiseGenerator.generate(2500)
        }

        let encryptedData = DataEncryptor.encrypt(password, JSON.stringify(dataToEncrypt));
        FileManager.save(this.selectedVaultID, encryptedData); 
    }
}