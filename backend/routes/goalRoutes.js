const express = require("express");
const router = express.Router();
const {getGoals,setGoals,putGoals,delGoals} = require('../controller/goalController')

// getting all functions from controller function
router.get("/",getGoals)
router.post("/",setGoals)
// .get(getGoals).post(setGoals);
// router.put("/:id").put(putGoals).delete(delGoals);


router.put("/:id",putGoals);
router.delete("/:id",delGoals);

module.exports = router;
