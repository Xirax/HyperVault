import express from 'express';

const router = express.Router();

router.get('/addContainer', (req, res) => {
    res.render('main');
})


export default router;