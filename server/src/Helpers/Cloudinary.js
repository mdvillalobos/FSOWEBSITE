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

    const upload = await cloudinaryInstance.uploader.upload(filePath, { folder: folderName });

    const secureUrl = upload.secure_url;
    await cache.set(cacheKey, secureUrl);
    return secureUrl;
}

export const updateFileToCloudinary = async(filePath) => {
     const publicID = secureURL.split('/').join().split('.')[0];
     const upload = await cloudinaryInstance.uploader.upload(filePath, { public_id: publicID });
}

export const filterAndUploadedRequirements = async (files, folderName) => {
    const start = Date.now();

    const userSubmittedRequirements = Object.values(files).map(fileArray => {
        const file = fileArray[0];
        return {
            requirementNumber: parseInt(file.fieldname.split('_')[1], 10),
            path: file.path,
            filename: file.originalname 
        };
    });

    const uploadPromises = userSubmittedRequirements.map(fileArray => {
        return uploadQueue.add(() => uploadImageToCloudinary(fileArray.path, folderName, { concurrent: true }))
    })
    
    const uploadResponses = await Promise.all(uploadPromises);
    
    const response = uploadResponses?.map((response, i) => ({
        requirementNumber: userSubmittedRequirements[i].requirementNumber,
        filePath: response,
        fileName: userSubmittedRequirements[i].filename
    }));

    console.log(`${Date.now() - start}ms`);
    return response;
}


export const DestroyImageInCloudinary = async (secureURL, folderName) => {
    if(secureURL) {
        const parts = secureURL.split('/');
        const publicIDWithExtension = parts[parts.length - 1];      

        // Remove the file extension
        const publicID = publicIDWithExtension.split('.')[0]; 
        return await cloudinary.uploader.destroy(`repository/${publicID}`)
    }
    return null;

}
