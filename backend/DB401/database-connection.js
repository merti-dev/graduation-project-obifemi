const mongoose = require('mongoose')

mongoose.connect(
  'authentication mongodb url',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', function () {
  console.log('connected to the db.')
})

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'MertinKedisi' })
// kitty.save().then(() => console.log('meow'))
