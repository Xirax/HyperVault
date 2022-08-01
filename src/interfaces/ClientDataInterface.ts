import IExtractedPasswordsContainer from "./ExtractedStickersVaultInterface";
import IExtractedPasswordSticker from "./ExtractedPasswordStickerInterface";

export default interface IClientData{
    containers: IExtractedPasswordsContainer[];
    selectedCon: IExtractedPasswordsContainer | undefined;
    stickers: IExtractedPasswordSticker[] | undefined;
    selectedSticker: IExtractedPasswordSticker | undefined;
}