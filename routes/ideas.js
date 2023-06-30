const express = require('express');
const router = express.Router();

const ideas = [
    {
      id: 1,
      text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
      tag: 'Technology',
      username: 'TonyStark',
      date: '2022-01-02',
    },
    {
      id: 2,
      text: 'Milk cartons that turn a different color the older that your milk is getting',
      tag: 'Inventions',
      username: 'SteveRogers',
      date: '2022-01-02',
    },
    {
      id: 3,
      text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
      tag: 'Software',
      username: 'BruceBanner',
      date: '2022-01-02',
    },
  ];

  router.get('/', (req, res)=>{
    res.json({sucess: true, data: ideas})
})

router.get('/:id', (req, res)=>{
    const idea = ideas.find(idea => idea.id === +req.params.id)

    if(!idea){
      return  res.status(404).json({sucess:false, error: 'resource not found'})
    }
    
    res.json({sucess: true, data: idea})
})

//add idea

router.post('/', (req, res) =>{
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag : req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    }

    ideas.push(idea)

    res.json({sucess: true, data: idea})
})

//update idea

router.put('/:id', (req, res)=>{
    const idea = ideas.find(idea => idea.id === +req.params.id)

    if(!idea){
      return  res.status(404).json({sucess:false, error: 'resource not found'})
    }

    idea.text =req.body.text || idea.text
    idea.tag =req.body.tag || idea.tag
    
    res.json({sucess: true, data: idea})
})

//remove idea

router.delete('/:id', (req, res)=>{
    const idea = ideas.find(idea => idea.id === +req.params.id)

    if(!idea){
      return  res.status(404).json({sucess:false, error: 'resource not found'})
    }

    ideas.splice(ideas.indexOf(idea), 1);
    console.log(ideas);
    
    res.json({sucess: true, data: `idea removed`})
})

module.exports = router