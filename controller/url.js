const URL =require("../model/url.models");
const shortid = require("shortid");
const handlegenerateNewShortURL=async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({msg:"URL is required"});
    const shortId=shortid();
    const newURL=await URL.create({
            shortId:shortId,
            redirectUrl:body.url,
            visitHistory:[]
        })
        console.log({id:newURL.shortId})
        return res.json({ id:newURL.shortId})
}

module.exports={handlegenerateNewShortURL}