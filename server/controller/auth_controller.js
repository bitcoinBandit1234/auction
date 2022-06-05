const bcrypt = require('bcrypt')
const db = require('../config/database.js')

async function registerUser(req, res){

    try{
        const {username, email, password} = req.body;

        let results = await db.query('SELECT username FROM customers WHERE username=?', [username]);
        if(results.length >= 1) return res.status(409).json({loggedIn: false, error: "Username already exists"});
        
        results = await db.query('SELECT username FROM customers users WHERE email=?', [email]);
        if(results.length >= 1) return res.status(409).json({loggedIn: false, error: "Email already exists"});
        
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt)

        // save username, email, and hashed password on the database

        await db.query('INSERT INTO customers (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email])

        const id = await db.query('Select customer_id FROM customers WHERE username=?', [username]);
        console.log(id)
        req.session.user = {
            id: id[0].customer_id,
            username: username
        }

        return res.status(201).json({username: username, loggedIn: true})

    }catch(error){
        console.log(`Server Error: ${error.message}`)
        return res.status(500).json({error: "Internal server Error"})
    }
}






async function loginUser(req, res){

    try{
        
        const {username, password} = req.body;

        const loginDetails = await db.query('SELECT customer_id, username, password FROM customers WHERE username=?', [username]);
        if(loginDetails.length < 1) return res.status(400).json({loggedIn: false, error: "Username or password inorrect"});

        const isSamePassword = await bcrypt.compare(password, loginDetails[0].password);

        if(isSamePassword){
            req.session.user = {
                id: loginDetails[0].customer_id,
                username: username
            }

            return res.status(200).json({loggedIn: true, username: username, userId: req.session.user.id})
            
        }else{
            return res.status(400).json({loggedIn:false, error: "username or password inorrect"})
        }
        
    }catch(error){
        console.log(`Server Error: ${error.message}`)
        return res.status(500).json({loggedIn: false, error: "Internal server Error"})
    }
}

async function logoutUser(req, resp){
    if(req.session.user && req.session.user.username){
        req.session.destroy();
        resp.clearCookie('connect.sid');
        return resp.status(200).json({loggedIn: false});
    }
}

function isAuthenticated(req, res){
    if(req.session.user && req.session.user.username){
        return res.status(200).json({loggedIn: true, username: req.session.user.username})
    }
    return res.status(200).json({loggedIn: false, message: "Not logged in"})
}

module.exports = {registerUser, loginUser, isAuthenticated, logoutUser}