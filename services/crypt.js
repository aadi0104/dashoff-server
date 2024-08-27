const cryptoJs = require("crypto-js");
const secretKey = process.env.secretKey;

const encryptPassword = (password) => {
    return cryptoJs.AES.encrypt(password, secretKey).toString();
};

const decryptPassword = (password, originalPassword) => {
    const decrypt = cryptoJs.AES.decrypt(originalPassword, secretKey).toString(cryptoJs.enc.Utf8);
    if (password === decrypt) return true;
    return false;
};

module.exports = { encryptPassword, decryptPassword };