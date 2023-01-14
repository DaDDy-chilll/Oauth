const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const indexRouter = express.Router();

indexRouter.get("/", ensureGuest, (req, res) => {
  return res.render("login");
});

indexRouter.get("/log", ensureAuth, async (req, res) => {
  console.log(req.user);
  return res.render("index", { userinfo: req.user });
});
module.exports = indexRouter;
