import mongoose from 'mongoose';

require("dotenv").config
export const connectDB = async () => {
  const uri : string = process.env.MONGO_URI!;
   
  try {
    await mongoose.connect(uri);
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`Connect failed !!!`, error);
  }
};
