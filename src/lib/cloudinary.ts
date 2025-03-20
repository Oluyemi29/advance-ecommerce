import cloudinary from "cloudinary"

cloudinary.v2.config({
    api_key : process.env.CLOUDINARY_API_KEY,
    cloud_name : process.env.CLOUDINARY_NAME,
    api_secret : process.env.CLOUDINARY_API_SECRETKEY
})

export default cloudinary.v2