const mongoose = require('mongoose');

const FlightSchema = mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    time: Array,
    duration:Array,
    plane:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    via:{
        type:Array,
        default:null,
    },
    price:{
        type:Number
    }
})

module.exports = mongoose.model('Flights',FlightSchema)