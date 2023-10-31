const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    userId: {

       type: String,
       require: true

    },
    
    bookId: {

        type: Number,
        require: true

    }
  })

  const User = mongoose.model('user', userSchema)
  module.exports = User;