const express = require("express");
const staticRouter = express.Router();

const { handlePostLogin, handlePostSignup, handlePostChangePassword, handleGetMyProfile } = require("../controller/staticController");

staticRouter.post("/login", handlePostLogin);

staticRouter.post("/signup", handlePostSignup);

staticRouter.post("/changepassword", handlePostChangePassword);

staticRouter.get("/myprofile", handleGetMyProfile);

module.exports = { staticRouter };