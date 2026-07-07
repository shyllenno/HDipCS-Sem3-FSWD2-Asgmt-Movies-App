import mongoose from "mongoose";
import Hapi from "@hapi/hapi";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Movies App DB Cluster");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.start();

  console.log("Movies App Server running on:", server.info.uri);
};

init();