const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URI).then((data) => {
    console.log(`Connectin to DB is Successfull host is: ${data.connection.host}`);
})
