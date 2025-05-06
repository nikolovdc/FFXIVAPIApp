

async function listAllMapRowID(req, res) {
    try {
        let { limit } = req.query;
        limit = parseInt(limit, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: "Invalid 'limit' query parameter." });
        }
        const response = 
            await fetch(`https://v2.xivapi.com/api/sheet/Map?limit=${limit}&after=1`);
        const data = await response.json();
        res.status(200).json(data.rows);        
    } catch (error) {
        console.error("Error fetching map list:", error);
    }
};

async function getMapRow(req, res) {
    try {
        let { row } = req.params;
        const response =
            await fetch(`https://v2.xivapi.com/api/sheet/Map/${row}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching map row:", error);
    }
};

async function getMap(req, res) {
    const { territory, index } = req.params;
    try {
        const response = await fetch(`https://v2.xivapi.com/api/asset/map/${territory}/${index}`);
        const buffer = await response.arrayBuffer();
        res.set('Content-Type', 'image/jpeg'); 
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error("Error fetching map list:", error);
    }
};

module.exports = {
    listAllMapRowID,
    getMap,
    getMapRow,
};