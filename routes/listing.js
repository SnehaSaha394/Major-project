const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middlewires.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))//INDEX ROUTE
    .post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.createListing));//CREATE LISTING
    
    

//new ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm);    

router.route("/:id")    
    .get(wrapAsync(listingController.showListing))//SHOW ROUTE
    .put(isLoggedIn,isOwner,validateListing,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))//update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))// delete route




//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;
