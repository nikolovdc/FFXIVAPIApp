// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { pipeline } = require('node:stream');
const { Readable } = require('stream');
// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.use('/user', authMiddleware, userRoutes);
router.get('/', authMiddleware, (req, res) => {
    res.render("main");
});

router.get('/xiv/map', async (req, res) => {
    try {
        const response = 
            await fetch(`https://v2.xivapi.com/api/sheet/Map/02?fields=Id`);
        console.log("Status:", response.status);
        const text = await response.json();
        console.log("Raw response:", text);

        /* const placeRow = data.fields.PlaceName.value;
        const placeData = await placeRow.json();
        const placeName = await placeData.fields.Name;

        res.json({mapData: data, placeName: placeName}); */
        
    } catch (error) {
        console.error("Error fetching map list:", error);
    }
});

/* router.get('/xiv/map/:territory/:index', async (req, res) => {
    const { territory, index } = req.params;
    try {
        const response = await fetch(`https://v2.xivapi.com/api/asset/map/${territory}/${index}`);
        //const data = await response.json();
        const content = response.headers.get('content-type');
        res.setHeader('Content-Type', content);
        const webStream = response.body;
        const nodeStream = Readable.fromWeb(webStream);

        pipeline(nodeStream, res, (err) => {
            if (err) {
              console.error('Pipeline error:', err);
              res.sendStatus(500);
            }
          });
        } catch (error) {
            console.error("Error fetching map image:", error);
          }
    });
 */


module.exports = router;
