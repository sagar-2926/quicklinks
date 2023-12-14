import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Links from './models/Links.js';

const app = express();
app.use(express.json());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (conn){
        console.log('MongoDB connected....😎😎');
    }
};
connectDB();

app.post("/link", async(req, res)=>{
    const {url,slug} = req.body;

const randomSlug = Math.random().toString(36).substring(2,7);

    const link = new Links({
        url : url,
        slug : slug || randomSlug
    })
    try{
        const savedLink = await link.save();
        return res.json({
            success : true,
            data: {
                shortLinks:`${process.env.BASE_URL}/${savedLink.slug}`
            },
            message:"Link saved successfully"
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
})


app.get('/:slug', async (req, res) => {
 const {slug} = req.params;

 const link =await Links.findOne({slug:slug});

 await Links.updateOne({slug:slug}, {$set:{
    clicks:link.clicks +1 
 }} ); 

 if (!link) {
    return res.json({
        success:false,
        message:"Link not found"
    })
 }
res.redirect(link.url);

})




const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running port ${PORT}`);
});