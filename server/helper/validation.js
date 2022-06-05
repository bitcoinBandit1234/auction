function validate(req, resp, next){
    if(!req.body.username || req.body.username === ""){
        return resp.status(409).json({loggedIn: false, error: "plz enter username"});
    }
    if(!req.body.email || req.body.email === ""){
        return resp.status(409).json({loggedIn: false, error: "plz enter email"});
    }
    if(!req.body.password || req.body.password === ""){
        return resp.status(409).json({loggedIn: false, error: "plz enter password"});
    }
    if(!(req.body.username.match(/^[a-zA-Z][a-zA-Z0-9_-]{3,12}$/))){
        return resp.status(409).json({loggedIn: false, error: "username should be 3 to 12 chars long with no special chars except - and _"});
    }
    if(!(req.body.email.match(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/))){
        return resp.status(409).json({loggedIn: false, error: "enter valid email address"});
    }
    if(!(req.body.password.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/))){
        return resp.status(409).json({loggedIn: false, error: "password should be at least 8 chars long with special char, uppercase and a number"});
    }
    next();
}

module.exports = validate;