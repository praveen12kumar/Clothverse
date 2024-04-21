import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


const uploadOnCloudinary = async(localFilePath)=>{
    //console.log("local file path on cloudinary",localFilePath)
    cloudinary.config({ 
        cloud_name: process.env.NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });  
      
    try {
        if(!localFilePath) return;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has beed uploaded successfully
        //console.log("file is uploaded on cloudinary", response);

        return response;


    } catch (error) {
        console.log("Error", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload didn't workout
        return null;
    }
}

export {uploadOnCloudinary}