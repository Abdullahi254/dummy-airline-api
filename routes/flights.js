const router = require('express').Router()
const e = require('express');
const Flights = require('../models/Flights')

const dayObj = {
    0: 'sunday',
    1:'monday',
    2:'tuesday',
    3:'wednesday',
    4:'thursday',
    5:'friday',
    6:'saturday', 
}

router.get('/',async (req,res)=>{
    try{
        const flights = await Flights.find();
        res.json(flights)
    }
    catch(er){
        res.json({
            message:er
        })
    }
})

router.get('/:day',async(req,res)=>{
    try{
        const flights = await Flights.find({
            'day':req.params.day
        })
        res.json(flights)
    }catch(er){
        res.json({
            message:er
        })
    }
})

router.get('/:from/:to/:date',(req,res)=>{
    const date = new Date(req.params.date)
    const flights = Flights.find({
        from:req.params.from,
        to:req.params.to,
        day:dayObj[date.getDay()]
    })
    flights.then(flights=>{
        res.json(flights)
    })
    .catch(er=>{
        res.status(404).json({
            msg:'flight not found'
        })
    })
        
})

router.get('/:from/:to',(req,res)=>{
    const flights = Flights.find({
        from:req.params.from,
        to:req.params.to,
    })
    flights.then(flights=>{
        res.json(flights)
    })
    .catch(er=>{
        res.status(404).json({
            msg:'flight not found'
        })
    })
        
})

router.put('/',async (req,res)=>{
    try{
        const flights = await Flights.updateMany({
            from:req.body.from,
            to:req.body.to,
        },{
            price:req.body.price
        })
        res.json(flights)
    }catch(er){
        res.json(
            {
                msg:er
            }
        )
    }
})

router.post('/',(req,res)=>{
    const flight = new Flights({
        from:req.body.from,
        to:req.body.to,
        time:req.body.time,
        duration:req.body.duration,
        plane:req.body.plane,
        day:req.body.day,
        via:req.body.via
    })
    flight.save()
        .then(flight=>{
            console.log('logged in flight')
            res.status(201).json(flight)
        })
        .catch(er=>{
            res.status(400).json({
                error:er
            })
        })
})
module.exports = router