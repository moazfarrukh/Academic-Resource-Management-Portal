const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = file.originalname;
        const extension = originalName.split('.').pop(); 
        cb(null, originalName.split('.')[0]+ '-' + uniqueSuffix + '.' + extension); 
    },
});

const upload = multer({ storage: storage });

const uploadFile = upload.single('file');

const uploadResourceMiddleware = (req, res, next) => {
    uploadFile(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading file');
        }
        const resourceJson = req.body.resource;

        if (!resourceJson) {
            return res.status(400).send('Resource JSON data is required');
        } else {
            console.log(resourceJson);
        }

        try {
            req.body.resource = JSON.parse(resourceJson);
            req.body.file = req.file;

            // Now req.body.event contains the JSON data, and req.file contains the uploaded file
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).send('Invalid JSON data in the resource key');
        }
    });
};

module.exports = { uploadResourceMiddleware };
