const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'requirements/')
    },

    filename: (req, file, cb) =>  {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb, res) {
        const fileType = path.extname(file.originalname)
        fileType == '.jpg' || fileType == '.png' || fileType == '.jpeg' 
            ? cb(null, true)
            : cb(new Error('Invalid File Type.'), false)
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload