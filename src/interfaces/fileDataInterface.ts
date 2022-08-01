import IExtractedPasswordsContainer from "./ExtractedStickersVaultInterface";
import IExtractedPasswordSticker from "./ExtractedPasswordStickerInterface";

export default interface IFileData{
    containerInfo: IExtractedPasswordsContainer;
    encryptedInfo: string;
}