import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../../lib/cloudinary"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const {publicID} = await req.body()
        try {
            const result = await cloudinary.uploader.destroy(publicID) 
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            
        }
    }
}