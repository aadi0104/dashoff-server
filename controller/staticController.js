const { Users } = require("../models/users");
const { encryptPassword, decryptPassword } = require("../services/crypt");

const handlePostLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        if (!user) return res.json({ message: "Username does not exist!", status: false });
        const response = decryptPassword(password, user.password);
        if (response === false) return res.json({ message: "Incorrect username or password!", status: false });
        let userDetail = { name: user.name, username: user.username };
        return res.json({ status: true, userDetail })
    } catch (error) {
        console.log(error);
    }
};

const handlePostSignup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const user = await Users.findOne({ username });
        if (user) return res.json({ message: "Username already exist!", status: false })
        const cypherText = encryptPassword(password);
        await Users.create({
            name,
            username,
            password: cypherText,
        });
        return res.json({ status: true });

    } catch (error) {
        console.log(error);
    }
};

const handlePostChangePassword = async (req, res) => {
    const { username, oldpassword, newpassword, } = req.body;
    const user = await Users.findOne({ username });
    const response = decryptPassword(oldpassword, user.password);
    if (response == false) return res.json({ message: "Incorrect old password!", status: false });
    const cypherText = encryptPassword(newpassword);
    await Users.findOneAndUpdate({ username }, { password: cypherText });
    return res.json({ status: true });
}

const handleGetMyProfile = async (req, res) => {
    const { username } = req.query;
    let { score } = await Users.findOne({ username });
    score = score.reverse();
    return res.json({ score });
}

module.exports = { handlePostLogin, handlePostSignup, handlePostChangePassword, handleGetMyProfile };