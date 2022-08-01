import PasswordSticker from "../modules/PasswordSticker";
import Assert from "./Assert";


export default class PasswordStickerTEST{

    private sticker: PasswordSticker = new PasswordSticker();

    constructor(){
        Assert.setAssertionClassName("PASSWORD STICKER");

        this.editNameTEST();
        this.editValueTEST();
        this.editNotesTEST();
    }

    editNameTEST(){
        let expectedName = "Test Sticker Name";
        this.sticker.editName(expectedName);
        let sticker = this.sticker.extract();

        Assert.setAssertionTestName("Should Edit Sticker Name");
        Assert.equals(sticker.name, expectedName);
    }

    editValueTEST(){
        let expectedValue = "09210sidfnnsd0q3rnfa dcl;ami0oAJKSFBsiuhw9";
        this.sticker.editValue(expectedValue);
        let sticker = this.sticker.extract();

        Assert.setAssertionTestName("Should Edit Sticker Value");
        Assert.equals(sticker.value, expectedValue);
    }

    editNotesTEST(){
        let note = "aeoknfsojfoqmo49013002rjfmodsklnksdvna foadsn n oNASIDFNPOASNFOn\n\n\nasjdnasoifasnf";
        this.sticker.editNotes(note);
        let sticker = this.sticker.extract();

        Assert.setAssertionTestName("Should Edit Sticker Notes");
        Assert.equals(sticker.notes, note);
    }


}