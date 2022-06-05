import { useContext } from "react";
import { Link } from "react-router-dom";
import './navStyle.css'
import { AccountContext } from '../AccountContext.jsx'
import axios from "axios";
import { useNavigate } from "react-router";


function NavBar(){

  const {user, setUser} = useContext(AccountContext);

  const navigate = useNavigate();
  
  const logoutUser = async ()=>{
    try{
      const loggedOutStatus = await axios.get("http://localhost:3301/auth/logout", {withCredentials: true});
      setUser({... loggedOutStatus});
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }

    return (
     <nav> 
      <div className="logo">Lilami Nepal</div>
      <div className="nav-items" >
        <li><Link to="/">Home</Link></li>

        {user.loggedIn? <></>: 
        <li><Link to="/signup">Login</Link></li>
        }

        <li><Link to="/product">Browse</Link></li>


        {user.username? <li><Link to="/addAuction">Add Auction</Link></li>: 
          <></>
        }

        {user.username? <li className="logout" onClick={logoutUser}>logout</li>: 
          <></>
        }

        {user.username? <li style={{marginLeft:"200px"}}><a href="#">{user.username}</a></li>: 
          <></>
        }
      </div>
    </nav> 
    );
}

export default NavBar;