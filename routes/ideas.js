const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')

//get all ideas
  router.get('/', async (req, res)=>{
    try {
      const ideas = await Idea.find();
      res.json({sucess: true, data: ideas})
    } catch (error) {
        res.status(500).json({sucess: false, error : ':c'})
        console.log(error);
    }
  })

//get single idea
router.get('/:id', async (req, res)=>{
    try {
      const idea = await Idea.findById(req.params.id);
      res.json({sucess:true, data: idea})
    } catch (error) {
      console.log(error);
      res.status(500).json({sucess:false, error: ':c'})
    }

})

//add idea

router.post('/', async (req, res) =>{
    const idea = new Idea({
        text: req.body.text,
        tag : req.body.tag,
        username: req.body.username
    })


    try {
      const savedIdea = await idea.save();
      res.json({sucess: true, data: savedIdea})
    } catch (error) {
      console.log(error);
      res.status(500).json({sucess:false, error: ':c'})
    }
})

//update idea

router.put('/:id', async (req, res)=>{
  try {

  const idea =  await Idea.findById(req.params.id);

  if(idea.username === req.body.username){
    const upIdea = await Idea.findByIdAndUpdate(
    req.params.id,
      {
        $set : {
          text: req.body.text,
          tag : req.body.tag
        }
      },
        {new: true} // jeśli nie znajdzie id, stworzy nową ideę
    );
    return res.json({sucess: true, data: upIdea})
  }
  res.status(403).json({sucess:false, error: 'non valid username'})
  
 } catch (error) {
    console.log(error);
    res.status(500).json({sucess:false, error: ':c'})
 }
})

//remove idea

router.delete('/:id', async (req, res)=>{
  try {

    const idea =  await Idea.findById(req.params.id);
    if(idea.username === req.body.username){
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({sucess: true, data: {}})
    }
    res.status(403).json({sucess:false, error: 'non valid username'})

   } catch (error) {
      console.log(error);
      res.status(500).json({sucess:false, error: ':c'})
   }
  })

module.exports = router