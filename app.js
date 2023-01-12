require("dotenv").config();
const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const app = express();
const { PORT, CLIENT_ID, CLIENT_SECRET } = process.env;

//!---application configure-------------
app.set("view engine", "ejs");

//!-----------process-------------------
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("calling...");
  console.log(profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

//! ---------ROUTE---------------

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/auth/login", (req, res) => {
  return res.render("login");
});

app.get("/failure", (req, res) => {
  return res.send("Fail to login!");
});

app.get("/home", (req, res) => {
  return res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Google call us back");
    return res.render("home");
  }
);

app.listen(PORT, (_) => {
  console.log(`Server is running on PORT:${PORT}`);
});
