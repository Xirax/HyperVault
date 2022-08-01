class ServerCommunication{

    static createContainer(){
        window.location.href = '/vault/createNew';
    }

    static async toggleContainerSelection(data){
        await fetch('/vault/select', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data)
        })

        window.location.href = '/';
    }

    static async toggleStickerSelection(data){
        await fetch('/sticker/select', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data) 
        });

        window.location.href = '/';
    }

    static async changeContainerName(data){
        await fetch('/vault/changeName', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data)
        })

        window.location.href = '/';
    }

    static async changeStickerName(data){
        await fetch('/sticker/changeName', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data)
        })

        window.location.href = '/';
    }

    static async changeStickerValue(data){
        await fetch('/sticker/changeValue', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data)
        })

        window.location.href = '/';
    }

    static async createPasswordSticker(){
        window.location.href = '/sticker/createNew';
    }

    static async updateNotes(data){
        await fetch('/sticker/updateNotes', {
            method: 'POST',
            headers: {'Content-Type':  'application/json'},
            body: JSON.stringify(data)
        })
    }

    static async lockContainer(){
        window.location.href = '/vault/lock';
    }

    static async unlockContainer(data){
        let res = await fetch('/vault/unlock', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        try{
            res = await res.json();

            if(res.err != '') PopupBox.show(res.err, '#990000', 2200);
            else window.location.href = '/';

        }catch(err){
            alert(err);
        }

    }

    static async deleteSelectedSticker(){
        window.location.href = '/sticker/delete';
    }

    static deleteVault(){
        window.location.href = '/vault/delete';
    }

    static async changeVaultPassword(data){
        let res = await fetch('/vault/changePassword', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        try{
            res = await res.json();

            if(res.err != ''){
                PopupBox.show(res.err, '#990000', 2200);
            }
            else{
                PopupBox.show('Password changed successfully', '#339966', 800);
            }

        }catch(err){
            console.log(err);
        }
    }

    static async changeAutoCloseSettings(data){
        await fetch('/autoclose/changeSettings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        window.location.href = '/';
    }

    static async generateAutoPassword(){
        // let res = await fetch('/sticker/generatePassword', {method: 'GET', headers: {'Content-Type': 'application/json'}});
        // try{
        //     res = await res.json();
        //     return res.newPassword;
        // }catch(err){
        //     return "";
        // }

        window.location.href = '/sticker/generatePassword';
    }
}