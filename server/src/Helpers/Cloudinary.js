require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
    cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.APP_CLOUDINARY_API_KEY, 
    api_secret: process.env.APP_CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});


const uploadImageToCloudinary = async (filePath, folderName) => {
    try {
        const result = cloudinary.uploader.upload(filePath, {
            folder: folderName
        });

        return console.log(`Cloudinary response: ${result}`)
    }

    catch(error) {
        console.log(`Uploading To Cloudinary Error: ${ error.message }`);
    }
}

module.exports = uploadImageToCloudinary