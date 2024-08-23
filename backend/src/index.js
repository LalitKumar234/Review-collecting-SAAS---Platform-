import mongoose from "mongoose";
import app from "./app.js";

const connectionParams = {
     useNewUrlParser: true 
  };
  
  const connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Database Connected");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  connectDatabase()


app.listen((5500),  () => console.log('server started'))