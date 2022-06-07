import NavBar from "../../component/navbar/nav_bar.js";
import "./home_design.css"
import img1 from "../../assets/banner/banner-1.png";
import popular1 from "../../assets/ebay-images/antiques.png";
import popular2 from "../../assets/ebay-images/collectibles.jpg";
import popular3 from "../../assets/ebay-images/phone.jpg";
import popular4 from "../../assets/ebay-images/sell.jpg";
import popular5 from "../../assets/ebay-images/services.png";
import popular6 from "../../assets/ebay-images/watches.jpg";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { FooterContainer } from "../../component/footer.js";
import Card from "../product Page/card.jsx";

export const socket = io.connect("http://localhost:3301", {withCredentials: true});

 function Home_page(){

    const [popular, setPopular] = useState([]);

    const [underdogs, setUnderdogs] = useState([]);

    useEffect(() => {
      socket.on('connects', (data)=>{
          console.log(data);
      });

    socket.emit('getHomeDisplay');

     socket.on('homeProducts', (underdogs, popular)=>{
           setPopular([...popular]);
           setUnderdogs([...underdogs]);
       })
    }, [])


    
    return(
        <>
        <NavBar />
        <section className="featured-section">
            <div className="featured-writting">
                <h2 className="f1-header">Find Your Next<span className="f1-span"> Deal!</span> </h2>
                <p className="f1-description"> Online Auction is where everyone goes to shop, sell,and give, while discovering variety and affordability.</p>
                <Link to="/product" className="f1-link">Get Started</Link>
            </div>
            <div className="featured-image">
                <img src={img1}/>
            </div>
        </section>

        <div className="frontpagefull">
            <section className="popular-category-section">
                <h3>Explore popular categories</h3>
                <div className="popular-cat-list">
                    <Link style={{textDecoration:"none", color:"black"}} to="/product">
                    <div className="pop img-1" >
                        <img className="pop-image" src={popular1} alt=""/>
                        <p className="pop-title">antiques</p>
                    </div>
                    </Link>
                    <Link style={{textDecoration:"none" , color:"black"}} to="/product">
                    <div className="pop img-2">
                        <img className="pop-image" src={popular2} alt=""/>
                        <p className="pop-title">collectibles</p>
                    </div>
                    </Link>
                    <Link style={{textDecoration:"none" , color:"black"}} to="/product">
                    <div className="pop img-3">
                        <img className="pop-image" src={popular3} alt=""/>
                        <p className="pop-title">phones</p>
                    </div>
                    </Link>
                    <Link style={{textDecoration:"none" , color:"black"}} to="/addAuction">
                    <div className= "pop img-4">
                        <img className="pop-image" src={popular4} alt=""/>
                        <p className="pop-title">sell</p>
                    </div>
                    </Link>
                    <Link style={{textDecoration:"none" , color:"black"}} to="/product">
                    <div className="pop img-5">
                        <img className="pop-image" src={popular5} alt=""/>
                        <p className="pop-title">services</p>
                    </div>
                    </Link>

                    <Link style={{textDecoration:"none"}} to="/product">
                    <div className="pop img-6">
                        <img className="pop-image" src={popular6} alt=""/>
                        <p className="pop-title">watches</p>
                    </div>
                    </Link>
                </div>
            </section>

            <section className="popular-category-section" style={{marginTop: "24px"}}>

                <h3>Popular Products</h3>

                <div className="wrapper">
                    {popular.length !== 0 ?
                        popular.map((item)=>{
                        return(
                            <Link key={item.auction_id} style={{textDecoration:"none", color: "black"}} to={"/productDetail/" + item.auction_id}>
                                <Card key={item.auction_id} img={item.image} title={item.title} startDate={item.auction_start_date} startTime={item.auction_start_time} endDate={item.auction_end_date} endTime={item.auction_end_time}/>
                            </Link>
                        );
                    })
                    :
                        <>Loading....</>
                    }
                </div>  

            </section> 

            <section className="popular-category-section" style={{marginTop: "24px"}}>

                <h3>Explore Hidden</h3>

                <div className="wrapper">
                    {underdogs.length !== 0 ?
                        underdogs.map((item)=>{
                        return(
                            <Link key={item.auction_id} style={{textDecoration:"none", color: "black"}} to={"/productDetail/" + item.auction_id}>
                                <Card key={item.auction_id} img={item.image} title={item.title} startDate={item.auction_start_date} startTime={item.auction_start_time} endDate={item.auction_end_date} endTime={item.auction_end_time}/>
                            </Link>
                        );
                    })
                    :
                        <>Loading....</>
                    }
                </div>  

            </section>
    </div>
</>

    );
}

export default Home_page;