const express = require("express");
const path = require("node:path");
const app = express();
const session = require('express-session');

//define port
const port = 3000 || process.env.PORT;

//Ready const for working method POST
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//define routes
const homeRoute = require("./routes/homeRoute");
const productsRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoute");

//define templates engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//midleware dir public
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(session({secret: "secreto"}));
//track routes
app.use("/", homeRoute);
app.use("/product", productsRoute);
app.use("/user", userRoute);
app.use("/cart", productsRoute)

//Configuration petitions user the method PUT an.d DELETE
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//Configuration 404 error handler
app.use((req,res,next) => {
res.status(404).render('not-found');
});

app.listen(port, () => {
  console.log(`Server run: http://localhost:${port}`);
});
