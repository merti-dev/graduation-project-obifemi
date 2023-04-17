const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => console.log('Connected to MongoDB'))

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'MertinKedisi' })
// kitty.save().then(() => console.log('meow'))
