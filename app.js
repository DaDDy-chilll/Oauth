require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
require("./config/passport")(passport);

const { PORT, MONGO_URL } = process.env;
const app = express();
//!-------server config-----------
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);
app.use("/auth", authRouter);
//!-------DATA BASE----------
mongoose.set("strictQuery", false);
mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready");
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//!-----------------------------

app.listen(PORT, () => {
  console.log(`server is running on port${PORT}`);
});
