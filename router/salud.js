const express = require('express');
const router = express.Router();

router.get('/matematica', (req, res) => {
    res.render('matematica.ejs')
})

module.exports = router;