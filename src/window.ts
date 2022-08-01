import { BrowserWindow, app } from 'electron';
import './app';
import path from 'path';

let appWindow: BrowserWindow;

function runWindow(){

    appWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
        icon: path.join(__dirname, '/static/imgs/ico.png')
    })

    appWindow.loadURL('http://localhost:8080/');
    appWindow.focus();
}

function closeWindow(){
    appWindow?.close();
}

app.on('ready', runWindow);

export default closeWindow;