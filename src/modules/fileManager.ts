import fs from 'fs';

export default class FileManager{

    private static path: string = "dat/";
    private static format: string = '.hvd';

    static setPath(newPath: string){
        this.path = newPath;
    }

    static async save(fileName: string, data: string){
        let path = this.path + fileName + this.format;
        fs.writeFile(path, data, (err) => { if(err) console.log(err) });
    }

    static load(fileName: string) {
        try{
            let path = 'dat/' + fileName + this.format;
            let data = fs.readFileSync(path);
            return data.toString();
        }
        catch(err){
            return '[]';
        }
    }

    static delete(fileName: string){
        try{
            let path = 'dat/' + fileName + this.format;
            fs.unlink(path, () => {});
        }catch(err){
            console.log(err);
        }
    }
}