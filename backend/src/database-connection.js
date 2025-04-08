require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('Connected to MongoDB'))
//DB401

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'MertinKedisi' })
// kitty.save().then(() => console.log('meow'))
