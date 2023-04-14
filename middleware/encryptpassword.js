const bcrypt = require('bcryptjs');

exports.encrypt = async function(password){
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}