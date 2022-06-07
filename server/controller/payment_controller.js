const db = require('../config/database.js')

const makePayment = async(req, resp)=>{
    try{
        console.log(req);
    db.query('INSERT INTO payment (token, amount, customer, product_id) VALUES (?, ?, ?, ?)', [req.body.token, req.body.amount, req.session.user.username, req.body.product_identity]);
    db.query('DELETE FROM auction_winners WHERE auction_id = ?', [req.product_identity]);
    console.log("here2");
    }catch(error){
        console.log(error);
        resp.status(400).json( {error:"cant store data"});
    }
}

module.exports = makePayment;