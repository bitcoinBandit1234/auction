import { sidebarNavItems } from "./sidebar.jsx";
import "./cardDesign.css";
import NavBar from "../../component/navbar/nav_bar";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductGridView from "./productGridView";
import { FooterContainer } from "../../component/footer";

function CardDisplay(){

  const [auctionItems, setAuctionItems] = useState([]);

  const [searchParam, setSearchParam] = useState('');

  let isRendered = useRef(false);

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

   return( 

      <>

      <NavBar/>

      <div>
        <div>
          <input type="text" onChange={e=>setSearchParam(e.target.value)}/>
          <button>Search</button>
        </div>
      </div>

      {<div className="productDisplay">
          <div className="sidebarWrapper">
            <div className='sidebar'>
              <div className="sidebarTitle">
              choose category
            </div>
        <div className="sidebarMenu">
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
        
        <ProductGridView auctionItems={auctionItems}/>

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