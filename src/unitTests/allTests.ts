import VaultsManagerTEST from "./vaultsManagerTEST";
import dateFormaterTEST from "./dateFormaterTEST";
import StickersVaultTEST from "./StickersVaultTEST";
import passwordStickersTEST from "./passwordStickerTEST";
import PasswordGeneratorTEST from "./PasswordGeneratorTEST";


function runAllTests(){
    new passwordStickersTEST();
    console.log('\n\n --------------- ');
    new StickersVaultTEST();
    console.log('\n\n --------------- ');
    new VaultsManagerTEST();
    console.log('\n\n --------------- ');
    dateFormaterTEST();
    console.log('\n\n --------------- ');
    new PasswordGeneratorTEST();
}


runAllTests();