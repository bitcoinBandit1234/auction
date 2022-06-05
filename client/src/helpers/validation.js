function validate(username, password, email, errorMsg){
    if(!username || username === ""){
        errorMsg("plz enter username");
        return false;
    }
    if(!email || email === ""){
        errorMsg("plz enter email");
        return false;
    }
    if(!password || password === ""){
        errorMsg("plz enter password");
        return false;
    }
    if(!(username.match(/^[a-zA-Z][a-zA-Z0-9_-]{3,12}$/))){
        errorMsg("username should be 3 to 12 chars long with no special chars except - and _");
        return false;
    }
    if(!(email.match(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/))){
        errorMsg("enter valid email address");
        return false;
    }
    if(!(password.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/))){
        errorMsg("password should be at least 8 chars long with special char, uppercase and a number");
        return false;
    }

    return true;
}

export default validate;