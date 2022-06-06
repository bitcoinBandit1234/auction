import { sidebarNavItems } from "./sidebar.jsx";
import "./cardDesign.css";
import NavBar from "../../component/navbar/nav_bar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductGridView from "./productGridView";
import { FooterContainer } from "../../component/footer";
import {FaSearch} from "react-icons/fa";

function CardDisplay(){

  const [auctionItems, setAuctionItems] = useState([]);

  const [searchParam, setSearchParam] = useState('');

  let isRendered = useRef(false);

  const [productError, setProductError] = useState("");

useEffect(() => {
    isRendered.current = true;
    axios
        .get("http://localhost:3301/product/addAuction")
        .then(res => {
            if (isRendered.current && res.status <= 200) {
                setAuctionItems(res.data.data);
            }
        })
        .catch(err => console.log(err));
    return () => {
        isRendered.current = false;
    };
}, []);

const getCategoryItems = (category)=>{

  axios
  .get("http://localhost:3301/product/productCategory/" + category)
  .then(res => {
      if (res.status <= 200 && res.data.data != null) {

          setAuctionItems(res.data.data);
      }
  }).catch(err=>console.log(err.message));
}

const getSearchedItems = () =>{

  axios
  .get("http://localhost:3301/product/productName/" + searchParam)
  .then(res => {
      if (res.status <= 200) {
          if(res.data.data.length !== 0){
            setProductError("");
            setAuctionItems(res.data.data);
          }
      }
  }).catch((err)=>{setProductError("No product found"); console.log(err)});

}

   return( 

      <>

      <NavBar/>

      <div>
        <div>
          <input className="productSearch" type="text" onChange={e=>setSearchParam(e.target.value)}/>
          <button className="prodSearchBtn" onClick={()=>{getSearchedItems()}}>Search<FaSearch/></button>
        </div>
      </div>

      {<div className="productDisplay">
          <div className="sidebarWrapper">
            <div style={{backgroundColor:"white"}} className='sidebar'>
              <div style={{backgroundColor:"white", color:"black"}} className="sidebarTitle">
              choose category
            </div>
        <div className="sidebarMenu" style={{backgroundColor:"white"}}>
            {
                sidebarNavItems.map((item, index) => (
                        <div className="sidebarMenuItem" key={index}>
                            <div className="sidebarText" onClick={()=>{getCategoryItems(item.display)}}>
                                {item.display}
                            </div>
                        </div>
                ))
            }
        </div>
    </div>
        </div>

        {
          productError !== "" ?
          <h1 style={{textAlign:"center"}}>No such product found</h1>
          :
          <ProductGridView auctionItems={auctionItems}/>
        }
      
        {/* <div className="wrapper">
          {auctionItems.length !== 0 ?
            auctionItems.map((item)=>{
              return(
                <Link key={item.auction_id} style={{textDecoration:"none", color: "black"}} to={"/productDetail/" + item.auction_id}>
                  <Card key={item.auction_id} img={item.image} title={item.title} startDate={item.auction_start_date} startTime={item.auction_start_time} endDate={item.auction_end_date} endTime={item.auction_end_time}/>
                </Link>
              );
            })
            :
              <>no product found</>
          }
        </div>  */}
    </div>}

      <FooterContainer/>

    </>
  );

}
export default CardDisplay;