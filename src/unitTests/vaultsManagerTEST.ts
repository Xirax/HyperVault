import VaultsManager from "../modules/VaultsManager";
import Assert from "./Assert";

export default class ContainersManagerTEST{

    private manager: VaultsManager;

    constructor(){
        Assert.setAssertionClassName("VAULTS MANAGER");
        this.manager = new VaultsManager();

        this.addVaultTEST();
        this.selectContainerTEST();
        this.addStickerToSelectedTEST();
        this.changeVaultNameTEST();
        this.extractSelectedVaultTEST();
        this.deleteVaultTEST();
    }

    addVaultTEST(){
        this.resetManager();
        this.addVaults(1);
        let vaults = this.manager.extractAllVaults();

        Assert.setAssertionTestName("Should Add One New Vault");
        Assert.equals(vaults.length, 1); 
    }

    selectContainerTEST(){
        this.resetManager();
        let selectedIndex = 1;
        this.addVaults(5);
        let selectedID = this.selectVault(selectedIndex);
        let selectedVault = this.manager.extractSelectedVault();

        Assert.setAssertionTestName("Should Select Right Vault");
        Assert.equals(selectedVault?.ID, selectedID);
    }

    addStickerToSelectedTEST(){
        this.resetManager();
        this.addVaults(2);
        this.selectVault(0);
        this.manager.addStickerToSelected();
        let stickers = this.manager.extractSelectedContainerStickers();

        Assert.setAssertionTestName("Should Add New Sticker To Selected Vault");
        Assert.equals(stickers?.length, 1);
    }

    changeVaultNameTEST(){
        this.resetManager();
        this.addVaults(2);
        this.selectVault(0);
        let testName = "TEST";
        this.manager.changeVaultName({name: testName});
        let vault = this.manager.extractSelectedVault();

        Assert.setAssertionTestName("Should Change Selected Vault Name");
        Assert.equals(vault?.name, testName);
    }

    extractSelectedVaultTEST(){
        this.resetManager();
        this.addVaults(5);
        let selectedID = this.selectVault(1);
        let extractedVault = this.manager.extractSelectedVault();

        Assert.setAssertionTestName("Should Extract Correct Vault (Selected)")
        Assert.equals(extractedVault?.ID, selectedID);
    }

    deleteVaultTEST(){
        this.resetManager();
        this.addVaults(3);
        let deletedID = this.selectVault(1);
        this.manager.deleteVault();
        let vaults = this.manager.extractAllVaults();
        let vaultsIDs = vaults.map(v => { return v.ID });

        Assert.setAssertionTestName("Should Delete Right Vault", 2);
        Assert.equals(vaults.length, 2);
        Assert.allNotEquals(vaultsIDs, deletedID);
    }

    private addVaults(amount: number){
        for(let i=0; i<amount; i++) this.manager.addVault();
    }
    
    private selectVault(index: number){
        let selectedID = this.manager.extractAllVaults()[index].ID;
        this.manager.selectVault({ID: selectedID});
        return selectedID;
    }
    
    private resetManager(){
        this.manager = new VaultsManager();
    }
}