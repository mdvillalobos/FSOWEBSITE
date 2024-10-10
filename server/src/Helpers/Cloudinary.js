import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';
import PQueue from 'p-queue';
import { createCache } from 'cache-manager';

// Initialize Cloudinary
const cloudinaryInstance = cloudinary.v2;

// Configuration
cloudinary.config({ 
    cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.APP_CLOUDINARY_API_KEY, 
    api_secret: process.env.APP_CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uploadQueue = new PQueue({ concurrency: 5 }); 
const cache = createCache({ store: 'memory' });

export const uploadImageToCloudinary = async (filePath, folderName) => {
    const cacheKey = `${filePath}:${folderName}`;
    const cachedResponse = await cache.get(cacheKey);
    if (cachedResponse) return cachedResponse;

    const upload = await cloudinaryInstance.uploader.upload(filePath, {
      folder: folderName,
    });

    const secureUrl = upload.secure_url;
    await cache.set(cacheKey, secureUrl);
    return secureUrl;
}


export const filterAndUploadedRequirements = async (files, folderName) => {
    const start = Date.now();
    const userSubmittedRequirements = Object.values(files).map(file => file[0].path); 
    
    const uploadPromises = userSubmittedRequirements.map(path => {
        return uploadQueue.add(() => uploadImageToCloudinary(path, folderName, { concurrent: true }))
    })
    
    const uploadResponses = await Promise.all(uploadPromises);
    
    const tae = uploadResponses?.map((response, i) => ({
        requirementNumber: i + 1,
        imagePath: response,
    }))
    console.log(`${Date.now() - start}ms`)
    return tae
}

export const DestroyImageInCloudinary = async (secureURL) => {
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
