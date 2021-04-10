const mongoose = require(`mongoose`);
require(`dotenv`).config();

(async ()=>{
    //This block will try to establish initial connection and handle any errors occuring while connecting
    try{
        await mongoose.connect(
            process.env.DSTRING,
            {
                useNewUrlParser:true,
                useUnifiedTopology: true,
            },()=>{
                console.log("DB Connected");
            }
        )
    }catch(err){
        console.log(err);
    }
    // This block will handle any error after a connection is established

    mongoose.connection.on('error', err => {
        console.err(err);
    });

    //   Prompts if the database is disconnected
    mongoose.connection.on('disconnected', ()=>{
        console.log("DB Disconnected");
    })

})();


