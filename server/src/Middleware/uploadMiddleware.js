const multer = require('multer');
const path = require('path');
const { errorMonitor } = require('stream');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../requirements'))
    },

    filename: (req, file, cb) =>  {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const isFileTypeValid = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.split('.').pop().toLowerCase());
        
        if (isFileTypeValid) {
            return cb(null, true);
        }
        console.log(file.originalname)
        return cb(new Error('Error: File type not supported!'));
    },
    limits: { fileSize: 50 * 1024 * 1024 }
});

const multerErrorHandler = (req, res, next) => {
    const start = Date.now();
    upload.fields([{ name: 'requirement_1', maxCount: 1}, { name: 'requirement_2', maxCount: 1}, 
        { name: 'requirement_3', maxCount: 1}, { name: 'requirement_4', maxCount: 1 }, { name: 'requirement_5', maxCount: 1}, 
        { name: 'requirement_6', maxCount: 1}, { name: 'requirement_7', maxCount: 1 }, { name: 'requirement_8', maxCount: 1}, 
        { name: 'requirement_9', maxCount: 1}, { name: 'requirement_10', maxCount: 1}, 
    ])(req, res, (err) => {
        if (err.message === 'Error: File type not supported!') {
            console.log(`Sending Invalid File Type Error: ${err.message}`);
            return res.status(400).json({ error: 'invalid file type' });
            console.log(`General Error Sended: ${ err.message }`);
        }

        if(err instanceof multer.MulterError) {
            console.log(`Sending Multer Error: ${err.message}`);
            res.json({ error: err.message })
            console.log(`Multer Error Sended: ${ err.message }`);
            console.log(`MUlter Error Timeout at: ${ Date.now() - start }ms`)
            return;
        }
    
        console.log('Go to the next Step');
        console.log(`Multer Error Handler run at: ${ Date.now() - start }ms`);
        next();
    })
}

module.exports = {
    upload,
    multerErrorHandler
}
 
