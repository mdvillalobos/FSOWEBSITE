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
        if(filePath) {
            const upload = await cloudinary.uploader.upload(filePath, {
                folder: folderName
            });

            return upload.secure_url
        }

        return null;
    }

    catch(error) {
        console.log(`Uploading To Cloudinary Error: ${ error.message }`);
    }
}


const DestroyImageInCloudinary = async (secureURL) => {
    try {
        if(secureURL) {
            const publicID = secureURL.split('/').join().split('.')[0];
            return await cloudinary.uploader.destroy(publicID)
        }

        return null;
    } catch (error) {
        console.log(`Deleting Image From Cloudinary Error: ${ error.message }`);
    }
}

module.exports = {
    uploadImageToCloudinary, 
    DestroyImageInCloudinary
}