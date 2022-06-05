const db = require('../config/database.js')

const makePayment = async(req, resp)=>{
    try{
    db.query('INSERT INTO payment (token, amount, customer) VALUES (?, ?, ?)', [req.body.token, re.body.amount, req.session.user.username]);
    resp.status(200).json( {message:"succesfylly data inserted"});
    }catch(error){
        resp.status(400).json( {error:"cant store data"});
    }
}

module.exports = makePayment;