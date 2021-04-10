const crypto = require(`crypto`);

const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var encrypt = (password, salt) =>{
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha256 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

const generateHash = (userpassword) => {
    const salt = genRandomString(16); /** Gives us salt of length 16 */
    const passwordData = encrypt(userpassword, salt);
    return passwordData.passwordHash + "salt=" + passwordData.salt;
}

module.exports = {
    generateHash, 
    encrypt,
}