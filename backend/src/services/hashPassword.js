const bcrypt = require('bcryptjs');
const tables = require("../tables");

const hashPassword = async (req, res, next) => {
    try {

        // Extract the password from the request body
        const { password } = req.body;
        const saltRounds = 10;
        // If the password is provided, hash it and add it to the request body
        if (password) {

            // Hash the password using bcrypt
            const hash = await bcrypt.hash(password, saltRounds);
            req.body.password = hash;
            next();
        } else {
            // If the password is not provided, respond with HTTP 400 (Bad Request)
            res.status(400).send("Password is required");
        }
    } catch (err) {
        next(err);
    };
};
    const verifyPassword = async (req, res, next) => {
        try {
            // Check if the email exists in the database
            const [user] = await tables.users.checkEmail(req.body.email);
            if (!user) {
                // If the email does not exist, respond with HTTP 404 (Not Found)
                res.status(404).json({error :"Email ou mot de passe incorrect"});
            }
    
            if (await bcrypt.compare(req.body.password, user.password)) {
                // If the password is correct, remove the password from the user object and add it to the request object
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