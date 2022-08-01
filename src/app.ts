import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import mainRouter from './routers/mainRouter';
import containerRouter from './routers/containerRouter';
import AutoClose from './modules/AutoClose';
import IAutoCloseSettings from './interfaces/AutoCloseSettingsInterface';

const app = express();
const PORT = 8080;
const autoClose = new AutoClose();

app.use(express.static(path.join(__dirname, '../static')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('layout', 'defaultLayout');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);
//app.use('/container', containerRouter);

let server = app.listen(PORT, () => { console.log('[OK] [' + PORT + ']'); });

app.post('/autoclose/changeSettings', (req, res) => {
    let body = req.body;
    let settings: IAutoCloseSettings = {
        active: body.active,
        closeTime: body.time
    }

    autoClose.settings(settings);
    res.end();
})

app.get('/autoclose', (req, res) => {
    res.render('autoclose', autoClose.getSettings());
})



export default server;