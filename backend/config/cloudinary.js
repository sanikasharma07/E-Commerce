import {v2 as cloudinary, v2} from 'cloudinary'

const connectcloudinary=async ()=>{
    v2.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}
export default connectcloudinary