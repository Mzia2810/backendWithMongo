const express = require("express");
const router = express.Router();
const {getGoals,setGoals,putGoals,delGoals} = require('../controller/goalController')
const {Protect } = require('../middleware/authMiddleware')

// getting all functions from controller function
router.get("/",Protect,getGoals)
router.post("/",Protect,setGoals)



router.put("/:id",Protect,putGoals);
router.delete("/:id",Protect,delGoals);

module.exports = router;
