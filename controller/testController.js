const { Users } = require("../models/users");

const handleGet1MinTest = async (req, res) => {
    const response = await fetch("http://metaphorpsum.com/sentences/8");
    const paragraph = await response.text();
    return res.json({ paragraph });
};

const handleGet3MinTest = async (req, res) => {
    const response = await fetch("http://metaphorpsum.com/sentences/14");
    const paragraph = await response.text();
    return res.json({ paragraph });
}

const handleGet5MinTest = async (req, res) => {
    const response = await fetch("http://metaphorpsum.com/sentences/20");
    const paragraph = await response.text();
    return res.json({ paragraph });
}

const handlePostTestResult = async (req, res) => {
    const { correct, mistakes, timespan, username } = req.body;
    if (correct !== "") {
        const words = correct.split(" ");
        const totalCharacters = correct.length;
        const wpm = (words.length / Number(timespan)).toFixed(0);
        const accuracy = `${100 - ((mistakes / totalCharacters) * 100).toFixed(2)}%`;
        const time = `0${timespan}:00 min`;
        let timedetails = Date(Date.now()).toString();
        timedetails = timedetails.slice(0, 24);
        await Users.findOneAndUpdate({ username }, {
            $push: {
                "score": {
                    wpm,
                    accuracy,
                    time,
                    timedetails,
                }
            }
        });
    } else {
        const wpm = 0;
        const accuracy = "N/A";
        const time = `0${timespan}:00 min`;
        let timedetails = Date(Date.now()).toString();
        timedetails = timedetails.slice(0, 24);
        await Users.findOneAndUpdate({ username }, {
            $push: {
                "score": {
                    wpm,
                    accuracy,
                    time,
                    timedetails,
                }
            }
        });
    }
    return res.json({ status: true });
}

const handleGetTestResult = async (req, res) => {
    const username = req.query.username;
    let { score } = await Users.findOne({ username });
    score = score.reverse()[0];
    return res.json({ score });
}

module.exports = { handleGet1MinTest, handleGet3MinTest, handleGet5MinTest, handlePostTestResult, handleGetTestResult };