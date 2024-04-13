import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

                    
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_SECRET)


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has beed uploaded successfully
        console.log("file is uploaded on cloudinary", response.public_id);

        return response;


    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload didn't workout
    }
}

