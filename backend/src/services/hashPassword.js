const bcrypt = require('bcryptjs');
const tables = require("../tables");

const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            next();
        } else {
            res.status(400).send("Password is required");
        }
    } catch (err) {
        next(err);
    };
};
    const verifyPassword = async (req, res, next) => {
        try {
            const [user] = await tables.users.checkEmail(req.body.email);
            if (!user) {
                res.status(401).json({error :"Email ou mot de passe incorrect"});
            }
    
            if (await bcrypt.compare(req.body.password, user.password)) {
                delete user.password;
                req.user = user;
                next();
            } else {
                res.status(422).json({error : "Email ou mot de passe incorrect"});
            }
        } catch (err) {
            next(err);
        }
    };

    module.exports = { hashPassword, verifyPassword};