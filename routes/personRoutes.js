const express = require('express');
const  router = express.Router()
const person = require("./../models/person");

//post Method to add a person

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPeron = new person(data);
    const response = await newPeron.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server Error" });
  }
});


// Get Method to get the person

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server Error" });
  }
});


 router.get('/work/:workType', async (req,res)=>{
  try{
    const workType = req.params.workType;

    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await person.find({work: workType});
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({error: "Invalid work type"});
    }

  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.put('/:id',async (req,res) =>{
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true,
      runValidators: true
    })

    if(!response) {
      return res.status(404).json({error: "'Person not found"})
    }
    console.log("Data Updated");
    res.status(200).json(response);


  }catch(err){
    console.log(err)
    res.status(500).json({error: "internal Server Error"})
  }
});

router.delete('/:id',async(req,res)=> {
  try{
    const personId = req.params.id;

    const response = await person.findByIdAndUpdate(personId);

    if(!response) {
      return res.status(404).json({error: "'Person not found"})
    }
    console.log("Data Deleted");
    res.status(200).json(response);


  }catch(err){

  }

})

module.exports = router;