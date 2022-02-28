//modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import connectHistoryApiCallback from "connect-history-api-fallback";  ONLY FOR PRODUCTION
//Helmet.js is a Node.js module that helps in securing HTTP headers. It is implemented in express applications. Therefore, we can say that helmet.js helps in securing express applications. It sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.
import helmet from "helmet";
// import path from "path"; UnComment in Production
import ApiRoutes from "./routes";
dotenv.config();
import BodyParser from "body-parser";
// App Variables
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(express.json()); // This will parse the json body in post request
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Using the helmet
// API Routes
app.use("/api", ApiRoutes);

//ALERT!!!!
//THIS THING IS FOR PRODUCTION
//WHEN YOU ARE PRODUCTION READY VIEW THE VIEWS DIR
//RUN `npm i connect-history-api-callback`
/*
app.use(
    connectHistoryApiCallback({
      verbose: false,
    })
  );
app.use(express.static(path.join(__dirname, "views")));
*/
//ALERT!!!!

// Listener
app.listen(PORT, () => {
  console.log(`I am live in http://localhost:${PORT}`);
});
