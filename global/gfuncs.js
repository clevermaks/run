const bCrypt = require('bcrypt');

global.createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(11), null);
};