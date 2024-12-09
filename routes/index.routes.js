const express = require('express');
const https = require('https');
const authMiddleware = require('../middlewares/auth');
const upload = require('../config/multer.config');
const router = express.Router();
const fileModel = require('../models/files.model');

router.get('/home', authMiddleware, async (req, res) => {
	const userFiles = await fileModel.find({ user: req.user.userId });
	res.render('home', {
		files: userFiles,
	});
});

router.post(
	'/upload',
	authMiddleware,
	upload.single('myfile'),
	async (req, res) => {
		const newFile = await fileModel.create({
			path: req.file.path,
			originalname: req.file.originalname,
			user: req.user.userId,
		});
		res.redirect('/home');
	}
);

// router.get('/download/*', authMiddleware, async (req, res) => {
// 	const path = req.params[0];
// 	res.download(path);
// });
const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

router.get('/download/*', authMiddleware, async (req, res) => {
	const requestedPath = req.params[0]; // This is the path you are receiving from the URL
	console.log(requestedPath);
	// Check if it's a local file path or a remote URL (like Cloudinary)
	if (
		requestedPath.startsWith('https://') ||
		requestedPath.startsWith('http://')
	) {
		// If it's a URL, fetch the file from the remote server (Cloudinary in this case)
		try {
			const response = await axios({
				method: 'get',
				url: requestedPath,
				responseType: 'stream',
			});

			// Set appropriate content-type based on file extension, if known (e.g., image/png)
			res.setHeader('Content-Type', 'image/png'); // Adjust based on the file type

			// Pipe the file stream to the response
			response.data.pipe(res);
		} catch (error) {
			res.status(500).send(
				'Error downloading the file from the remote server'
			);
		}
	} else {
		// // If it's a local file path, use res.download() for local files
		// const localFilePath = path.resolve(__dirname, 'your_local_directory', requestedPath);
		// if (fs.existsSync(localFilePath)) {
		//   res.download(localFilePath);
		// } else {
		//   res.status(404).send('File not found');
		// }
		res.status(404).send('File not found');
	}
});

module.exports = router;

// const loggedInUserId = req.user.userId;
// console.log(loggedInUserId);
// console.log(path);
// const file = await fileModel.findOne({ path: path, user: loggedInUserId });

// if (!file) {
// 	return res.status(401).json({ message: 'Unauthorized User' });
// }
