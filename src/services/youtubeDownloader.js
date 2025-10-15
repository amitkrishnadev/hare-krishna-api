// src/services/youtubeDownloader.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const downloadYouTubeVideo = (url) => {
	return new Promise((resolve, reject) => {
		if (!url) return reject(new Error('❌ No YouTube URL provided'));

		// Ensure media directory exists
		const mediaDir = path.join(__dirname, '../../media');
		if (!fs.existsSync(mediaDir)) {
			fs.mkdirSync(mediaDir, { recursive: true });
		}

		// Unique filename
		const outputTemplate = path.join(mediaDir, `${Date.now()}.%(ext)s`);

		// yt-dlp arguments
		const args = [
			'-f',
			'bestvideo+bestaudio',
			'--recode-video',
			'mov', // force mov output (H.264 + AAC)
			'-o',
			outputTemplate,
			url,
		];

		console.log(`🎬 Starting yt-dlp with args: ${args.join(' ')}`);

		const ytDlp = spawn('yt-dlp', args);

		ytDlp.stdout.on('data', (data) => {
			process.stdout.write(`[yt-dlp] ${data}`);
		});

		ytDlp.stderr.on('data', (data) => {
			process.stderr.write(`[yt-dlp ERROR] ${data}`);
		});

		ytDlp.on('close', (code) => {
			if (code === 0) {
				// find the latest .mov file in media dir
				const files = fs
					.readdirSync(mediaDir)
					.filter((f) => f.endsWith('.mov'))
					.map((f) => path.join(mediaDir, f))
					.sort(
						(a, b) =>
							fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs
					);

				if (files.length === 0) {
					return reject(new Error('❌ No .mov file created.'));
				}

				console.log(`✅ Video downloaded: ${files[0]}`);
				resolve(files[0]);
			} else {
				reject(
					new Error(
						`❌ Download error: yt-dlp exited with code ${code}`
					)
				);
			}
		});
	});
};

module.exports = { downloadYouTubeVideo };
