const router = require("express").Router();
const{House} = require("../../Models/House");
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const mongoose  = require("mongoose");
require('dotenv').config()


const mongoURI = process.env.MONGO_URI;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });


  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
 })
 .then(()=>{
    console.log('con to db established')
 })

  
router.post('/api/house-listing', (request,response) => {

    const form = new formidable.IncomingForm();
    form.parse(request, (error,fields,files)=>{

        const{price,
            city,
            province,
            numOfBedrooms,
            numOfBathrooms,
            numOfGarages ,
            isSaleOrRent,
        }=fields;

            const {houseImage}=files;

           cloudinary.uploader.upload(houseImage.filepath,{folder:"/houseAgency/houses"},async(error,results) => {
               if(error){
                   return console.log(error);

               }
               const image_url = results.url

               const newHouse = new House({
                   house_location: {
                       province: province,
                       city: city,

                   },

                   house_details:{
                       price: price,
                       isSaleOrRent: isSaleOrRent,
                       numOfBedRooms: numOfBedrooms,
                       numOfBathRooms:numOfBathrooms,
                       numOfGarages:numOfGarages,

                       house_image: image_url,
                   },
               });

               const savedHouse = await newHouse.save();
               return response.status(200).json(savedHouse);


           });





    });
});

module.exports=router;




//console.log('PROVINCE:' , province);
//console.log('city:' , city);

//console.log('numOfBedrooms:' , numOfBedrooms);
//console.log('numOfBathrooms:' , numOfBathrooms);
//console.log('numOfGarages:' , numOfGarages);
//console.log('isSaleOrRent:' , isSaleOrRent);
//console.log('houseImage:' , houseImage.path);