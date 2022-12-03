const express=require("express");
const cors=require('cors');

const app=express()
const path = require('path');

app.use(cors());

const houseListingRoute=require('./Routes/HouseListing/HouseListing')
const houseFetchRoute =require('./Routes/HouseFetchRoutes/HouseFetch');
const ContactFormRoute = require("./Routes/EmailRoute/Email");

app.use(houseListingRoute);
app.use(houseFetchRoute);
app.use(ContactFormRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started on PORT "+PORT);
});


