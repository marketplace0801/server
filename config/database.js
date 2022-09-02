
import mongoose from "mongoose";
export const connectDatabase = () => {
    mongoose
      .connect(process.env.DB)
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
  };