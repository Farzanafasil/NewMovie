const mongoose=require('mongoose')
const TheaterSchema=mongoose.Schema({

    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    addedmovies:[{
       type: mongoose.Types.ObjectId,
        ref:"Movies"

    }]



})

const theatermodel=mongoose.model('Theater',TheaterSchema);

module.exports=theatermodel;