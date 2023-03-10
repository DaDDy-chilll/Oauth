const express = require("express");
const app = express();

const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
//!----------------

//todo passport
function verifyCallback(accessToken, refreshToken, profile, done) {
  // console.log("google profile", profile);
  done(null, profile);
}
passport.use(
  new Strategy(
    {
      callbackURL: "/auth/google/callback",
      clientID:
        "106185643281-8i7m5smek0kt5o8kj4jge8il7dtg0d6m.apps.googleusercontent.com",

      clientSecret: "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",
    },
    () => {
      //test
    }
  )
);

//!--------------
app.get("/auth/login", (req, res) => {
  res.render("login");
});

app.get("/auth/logout", (req, res) => {
  res.send("logging out" / auth);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
  }),
  (req, res) => {
    console.log("Google call us back!");
  }
);
app.get("/failure", (req, res) => {
  return res.send("Fail to login!");
});

//!--------------

app.listen(3000, () => {
  console.log(`Server is running on Port:3000`);
});
