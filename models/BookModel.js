const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
{
name:{
    type: String,
    required: [true, "Please enter a product name"]
},

genre:{
    type: String,
    required: [true, "Please enter a genre for the book"]
},
price:{
    type: Number,
    required: true,
    default: 10
},
rating:{
    type: Number,
    required: true,
    default: 0
},
publisher:{
    type: String,
    required: [true, "Please enter a publisher for the book"]
}

},
{
    timestamps: true
}

)


const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel;