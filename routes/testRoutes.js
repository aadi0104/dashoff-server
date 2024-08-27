const express = require("express");
const testRouter = express.Router();

const { handleGet1MinTest, handleGet3MinTest, handleGet5MinTest, handlePostTestResult, handleGetTestResult } = require("../controller/testController");

testRouter.get("/1-min", handleGet1MinTest);

testRouter.get("/3-min", handleGet3MinTest);

testRouter.get("/5-min", handleGet5MinTest);

testRouter.route("/result")
    .get(handleGetTestResult)
    .post(handlePostTestResult);

module.exports = { testRouter };