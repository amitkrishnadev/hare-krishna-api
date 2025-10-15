// src/routes/youtubeRoutes.js
const express = require('express');
const { downloadYouTubeVideo } = require('../services/youtubeDownloader');

const router = express.Router();

router.post('/download', async (req, res) => {
	try {
		const { url } = req.body;
		if (!url)
			return res.status(400).json({ error: 'YouTube URL is required' });

		const filePath = await downloadYouTubeVideo(url);
		res.json({ success: true, file: filePath });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: err.message });
	}
});

module.exports = router;
