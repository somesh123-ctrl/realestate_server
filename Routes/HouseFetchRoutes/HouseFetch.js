const router = require('express').Router();
const {House} = require('../../Models/House');



router.get("/api/house-sale", async(request,response) => {
    try{
        House.find({"house_details.isSaleOrRent": "SALE"})
        .exec()
        .then((data) => {
            return response.status(200).json(data);
        });
    } catch(error)  {
        return response.status(500).json({msg: "server is currently down :("});
    }
});


router.get("/api/house-rent", async(request,response) => {
    try{
        House.find({"house_details.isSaleOrRent": "RENT"})
        .exec()
        .then((data) => {
            return response.status(200).json(data);
        });
    } catch(error)  {
        return response.status(500).json({msg: "server is currently down :("});
    }
});


router.get("/house/description/:id", async (request, response) => {
    await House.find({ _id: request.params.id })
      .exec()
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  router.get("/house/:location", async (request, response) => {
    const req_location = request.params.location;
    const location = req_location.charAt(0).toUpperCase() + req_location.slice(1);
  
    await House.find({ "house_location.city": location })
      .exec()
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  

  router.get("/api/house-search/:query", async (request, response) => {
    const city = [
      "Hyderabad",
      "Ahmedabad",
      "Mumbai",
      "Pune",
      "Chennai",
      "Delhi",
      "Banaras",
      "Jaipur",
    ];
    const query = request.params.query;
  
    const result = [];
    for (let counter = 0; counter < city.length; counter++) {
      let currentcity = city[counter];
      if (query.toLowerCase().includes(currentcity.toLowerCase())) {
        result.push(currentcity);
      }
    }
  
    House.find({ "house_location.city": result[0] })
      .exec()
      .then((data) => {
        return response.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


module.exports = router;
