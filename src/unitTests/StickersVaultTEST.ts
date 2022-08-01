import StickersVault from "../modules/StickersVault";
import PasswordsContainer from "../modules/StickersVault";
import Assert from "./Assert";


export default class StickersVaultTEST{

    private vault: StickersVault = new StickersVault();

    constructor(){
        Assert.setAssertionClassName("STICKERS VAULT");

        this.changeNameTEST();
        this.addPasswordStickerTEST();
        this.selectStickerTEST();
        this.changeStickerNameTEST();
        this.changeStickerValueTEST();
        this.changeStickerNotesTEST();
        this.lockTEST();
        this.unlockTEST();
        this.deleteSelectedStickerTEST();
    }

    changeNameTEST(){
        this.resetVault();
        let testName = "TEST";
        this.vault.changeName(testName);
        let vault = this.vault.extract();

        Assert.setAssertionTestName("Should Change Vault Name");
        Assert.equals(vault.name, testName);
    }

    addPasswordStickerTEST(){
        this.resetVault();
        this.vault.addPasswordSticker();
        let stickers = this.vault.extractAllPasswordStickers();

        Assert.setAssertionTestName("Should Add One New Password Sticker");
        Assert.equals(stickers.length, 1);
    }

    selectStickerTEST(){
        this.resetVault();
        this.addStickers(4);
        let expectedID = this.selectSticker(1);
        let selectedSticker = this.vault.extractSelectedSticker();

        Assert.setAssertionTestName("Should Select Right Sticker");
        Assert.equals(selectedSticker?.ID, expectedID);
    }

    changeStickerNameTEST(){
        this.resetVault();
        this.addStickers(2);
        this.selectSticker(0);
        let expectedName = "STICKER NAME";
        this.vault.changeStickerName(expectedName);
        let sticker = this.vault.extractSelectedSticker();

        Assert.setAssertionTestName("Should Change Selected Sticker Name");
        Assert.equals(sticker?.name, expectedName);
    }

    changeStickerValueTEST(){
        this.resetVault();
        this.addStickers(2);
        this.selectSticker(0);
        let expectedValue = "New pass 12345*)(!@#(**&0>>><<<<.,';:][";
        this.vault.changeStickerValue(expectedValue);
        let sticker = this.vault.extractSelectedSticker();

        Assert.setAssertionTestName("Should Change Selected Sticker Value");
        Assert.equals(sticker?.value, expectedValue);
    }

    changeStickerNotesTEST(){
        this.resetVault();
        this.addStickers(2);
        this.selectSticker(1);
        let expectedNotes = "new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway new notes, are long, should work anyway1234567890-=!@#$%^&*()_+;'.,/?><";
        this.vault.changeStickerNotes(expectedNotes);
        let sticker = this.vault.extractSelectedSticker();

        Assert.setAssertionTestName("Should Change Selected Sticker Notes");
        Assert.equals(sticker?.notes, expectedNotes);
    }

    lockTEST(){
        this.resetVault();
        this.addStickers(1);
        this.vault.lock();
        let password = this.vault.getPassword();
        let vault = this.vault.extract();

        Assert.setAssertionTestName("Should Lock Vault");
        Assert.multiEquals([password, vault.locked], ['', true]);
    }

    unlockTEST(){
        let testPassword = "test12345";
        this.vault.unlock(testPassword);
        let password = this.vault.getPassword();
        let vault = this.vault.extract();

        Assert.setAssertionTestName("Should Unlock Vault");
        Assert.multiEquals([password, vault.locked], [testPassword, false]);
    }

    deleteSelectedStickerTEST(){
        this.resetVault();
        this.addStickers(5);
        let deletedID = this.selectSticker(1);
        this.vault.deleteSelectedSticker();
        let stickers = this.vault.extractAllPasswordStickers();
        let ids = stickers.map(s => { return s.ID });

        Assert.setAssertionTestName("Should Delete Selected Sticker");
        Assert.allNotEquals(ids, deletedID);
        Assert.equals(ids.length, 4);
    }

    private resetVault(){
        this.vault = new StickersVault();
    }

    private selectSticker(index: number){
        let stickers = this.vault.extractAllPasswordStickers();
        this.vault.selectSticker(stickers[index].ID);
        return stickers[index].ID;
    }

    private addStickers(amount: number){
        for(let i=0; i<amount; i++) this.vault.addPasswordSticker();
    }


}

function shouldSelectRightSticker(){
    let container = new PasswordsContainer();

    for(let i=0;  i<10; i++)
        container.addPasswordSticker();

    let selectedIndex = 2;
    let stickers = container.extractAllPasswordStickers();
    let selectedID = stickers[selectedIndex].ID;
    container.selectSticker(selectedID);
    let selectedSticker = container.extractSelectedSticker();

    Assert.setAssertionTestName('Should Select Right Sticker');
    Assert.equals(selectedSticker?.ID, selectedID);
}

function shouldChangeContainerName(){
    let container = new PasswordsContainer();
    let expectedName = "TEST NAME";
    container.changeName(expectedName);

    let extractedCon = container.extract();

    Assert.setAssertionTestName("Should Change Container Name");
    Assert.equals(extractedCon.name, expectedName);
}