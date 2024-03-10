const express = require("express")
const urlRoute = require("./routes/url.js")
const { connectToMongo } = require("./connect")
const URL = require("./model/url.models.js")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use("/url", urlRoute)


app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        if(!shortId){
            return res.status(401).json({ msg: "ShortId is not defined" })
        }
        
        const updatedUrl = await URL.findOneAndUpdate({ shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            });
            console.log("updated Url added",updatedUrl)
            if(updatedUrl){
                return res.redirect(updatedUrl.redirectUrl);
            }
    } catch (error) {
        console.log(error, "Here is some kind of error")
        return res.status(500).json({ msg: "here is a error" })
    }
})


const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
connectToMongo().then((result) => {
    console.log("MongoDB Connection successfully")
}).catch((err) => {
    console.log("Error")
});