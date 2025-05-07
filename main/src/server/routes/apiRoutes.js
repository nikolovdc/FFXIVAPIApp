const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const { listAllMapRowID, getMap, getMapRow } = require('../controllers/apiControllers');

app.use(cors({ origin: 'https://ffxiv-api-app-150199820340.us-central1.run.app' }));

router.get('/locations', (req, res) => {
	res.render('locations');
});

router.get('/map', listAllMapRowID);

router.get('/map/image/:territory/:index', getMap);

router.get('/map/row/:row', getMapRow);

module.exports = router;
