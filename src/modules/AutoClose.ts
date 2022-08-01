import IAutoCloseSettings from "../interfaces/AutoCloseSettingsInterface";
import FileManager from "./fileManager";
import closeWindow from "../window";
import internal from "stream";

export default class AutoClose{

    private active: boolean;
    private clock: number;
    private closeTime: number;
    private tick: NodeJS.Timer | undefined;

    constructor(){
        let data = FileManager.load('autosettings');
        this.clock = 0;

        try{
            let closeSettings: IAutoCloseSettings = JSON.parse(data);
            this.active = closeSettings.active;
            this.closeTime = closeSettings.closeTime;
        }
        catch(err){
            this.active = false;
            this.closeTime = 900;
        }

        if(this.active) this.run();
    }

    run(){
        this.stop();
        this.active = true;
        this.clock = 0;
        
        this.tick = setInterval(() => {
            console.log(this.clock);
            this.clock++;
            if(this.clock > this.closeTime) this.closeApp();
        }, 1000)
    }

    stop(){
        this.active = false;
        this.clock = 0;

        clearInterval(this.tick);
    }

    settings(settings: IAutoCloseSettings){
        this.active = settings.active;
        this.closeTime = settings.closeTime;

        if(this.active) this.run();
        else this.stop();

        console.log('Time set to ' + this.closeTime);

        FileManager.save('autosettings', JSON.stringify(settings));
    }

    getSettings(){
        let settings: IAutoCloseSettings = {
            active: this.active,
            closeTime: this.closeTime
        }

        return settings;
    }

    closeApp(){
        closeWindow();
    }
}