import IClientData from "../interfaces/ClientDataInterface";
import ContainersManager from "./VaultsManager";

export default class ClientData{

    static combine(manager: ContainersManager){
        let data: IClientData = {
            containers: manager.extractAllVaults(),
            selectedCon: manager.extractSelectedVault(),
            stickers: manager.extractSelectedContainerStickers(),
            selectedSticker: manager.extractSelectedSticker(),
        }

        return data;
    }
}