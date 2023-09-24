
const mongoose = require('mongoose')

const contactschema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    age:{
        type:Number,
        required:true,
    },

    favouritfood:{
        type:Number,
        required:true,
    },
   },
    
    {
        timestamp:true
    }

)

const  Contacts = mongoose.model('Contacts' , contactschema);
module.exports  = Contacts;