import express from 'express';
import ClientData from '../modules/ClientData';
import PasswordGenerator from '../modules/PasswordGenerator';
import VaultsManager from '../modules/VaultsManager';

const router = express.Router();
const vaultsManager = new VaultsManager();

router.get('/', (req, res) => {
    let clientData = ClientData.combine(vaultsManager);
    res.render('main', clientData);
})

router.get('/vault/createNew', (req, res) => {
    vaultsManager.addVault();
    res.render('main', ClientData.combine(vaultsManager));
})

router.post('/vault/select', (req, res) => {
    vaultsManager.selectVault(req.body);
    res.end();
})

router.post('/vault/changeName', (req, res) => {
    vaultsManager.changeVaultName(req.body);
    res.end();
})

router.get('/vault/lock', (req, res) => {
    vaultsManager.lockSelected();
    res.render('main', ClientData.combine(vaultsManager));
})

router.post('/vault/unlock', (req, res) => {
    let err = vaultsManager.unlockSelected(req.body);
    res.end(JSON.stringify({ err: err }));
})

router.get('/vault/delete', (req, res) => {
    vaultsManager.deleteVault();
    res.render('main', ClientData.combine(vaultsManager));
})

router.post('/vault/changePassword', (req, res) => {
    let err = vaultsManager.changeVaultPassword(req.body);
    console.log(err);
    res.end(JSON.stringify({ err: err }));
})

router.get('/sticker/createNew', (req, res) => {
    vaultsManager.addStickerToSelected();
    res.render('main', ClientData.combine(vaultsManager));
})

router.post('/sticker/select', (req, res) => {
    vaultsManager.selectSticker(req.body);
    res.end();
})

router.post('/sticker/changeName', (req, res) => {
    vaultsManager.updateSticker(req.body);
    res.end();
})

router.post('/sticker/changeValue', (req, res) => {
    vaultsManager.updateSticker(req.body);
    res.end();
})

router.post('/sticker/updateNotes', (req, res) => {
    vaultsManager.updateSticker(req.body);
})

router.get('/sticker/generatePassword', (req, res) => {
    let generatedPassowrd = PasswordGenerator.generate();
    vaultsManager.updateSticker({value: generatedPassowrd});
    res.render('main', ClientData.combine(vaultsManager));
})

router.get('/sticker/delete', (req, res) => {
    vaultsManager.deleteSticker();
    res.render('main', ClientData.combine(vaultsManager));
})


export default router;