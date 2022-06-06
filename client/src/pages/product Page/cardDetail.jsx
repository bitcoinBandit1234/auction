import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import './cardDetail.css';
import { socket } from '../Home page/home_page';
import ChatBox from '../../component/chatBox/chatBox';
import { AccountContext} from '../../component/AccountContext';
import { useContext } from 'react';
import toSecond from "../../helpers/timeCalculator";
import Countdown from "react-countdown";
import { useNavigate } from "react-router";
import KhaltiCheckout from "khalti-checkout-web";
import config from '../../component/khalti/khaltiConfig';
import NavBar from '../../component/navbar/nav_bar';
import { FooterContainer } from '../../component/footer';

function ProductDetail(){
    let checkout = new KhaltiCheckout(config);
    const [itemDetail, setItemDetail] = useState([]);
    const [nextBidAmt, setNextBid] = useState(10);
    const [currentBid, setCurrentBid] = useState(10);
    const [currentBidder, setCurrentBidder] = useState("");
    const {user} = useContext(AccountContext);
    const [render, setRender] = useState(false);
    let isRendered = useRef(false);
    const bidBtnRef = useRef();
    const chatBtnRef = useRef();
    const {id} = useParams();
    const navigate = useNavigate();
    const [localProducts, setLocalProducts] = useState([]);

    const joinChat = ()=>{
      setRender(true);
      socket.emit('joinChat', itemDetail[0].customer_id);
    }

  useEffect(() => {
      isRendered.current = true;

      if(!user.username){
        navigate("/signup");
      }

      axios
          .get("http://localhost:3301/product/productDetail/" + id)
          .then(res => {
              setItemDetail(res.data.data);
              }
          )
          .catch(err => console.log(err));
      return () => {
          isRendered.current = false;
      }; 
  }, []);

  const enterBid = ()=>{

    setLocalProducts(JSON.parse(localStorage.getItem('participatedProducts')));

    if(!localProducts.includes(itemDetail[0].auction_id)){

      setLocalProducts(...localProducts, itemDetail[0].auction_id);

      localStorage.setItem('participatedProducts', JSON.stringify(localProducts));

    }

    socket.emit('updateBid', itemDetail[0].auction_id);

  }

  const completeFunction = ()=>{
    bidBtnRef.current.classList.add("unclickable");
    chatBtnRef.current.classList.add("unclickable");
    socket.emit("setWinner", itemDetail[0].auction_id);
  }

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="expiredText">Expired</span>;
    } else { 
      return <span>{(days*24)+hours}hr:{minutes}min:{seconds}sec</span>;
    }
  };

  useEffect(()=>{
    if(itemDetail.length !== 0 ){

       socket.emit('joinBid', itemDetail[0].auction_id);

       socket.on('showBid', (data)=>{
         setCurrentBid(data.currentHighestBid);
         setCurrentBidder(data.highestBidder);
         setNextBid(data.nextBid);
       })

       socket.on('liveBids', (topBidder, nextBigBid, currBid)=>{
        setCurrentBid(currBid);
        setCurrentBidder(topBidder);
        setNextBid(nextBigBid);         
       })
    }
  },[itemDetail])

    return(
      <>
      <NavBar/>
      <div className="app" style={{fontFamily: "ubuntu, sans-serif"}}>
        {itemDetail.length !== 0? 
          <div className="details">
            <div className="big-img">
              <img src={itemDetail[0].image} alt=""/>
            </div>
      
            <div className="box">
              <div className="row">
                <h2>{itemDetail[0].title}</h2>
                <span>posted on: { itemDetail[0].auction_start_date}</span>
              </div>
              <p>{itemDetail[0].description}</p>
              <div style={{borderBottom: "2px solid	#778899", marginBottom: "6px"}}>
                <h4 style={{marginBottom: "5px"}}>Info</h4>
                <span className='card__detail'>auction end date: {itemDetail[0].auction_end_date}</span>
                <span className='card__detail'>auction end time: {itemDetail[0].auction_end_time}</span>
                <span className='card__detail'>starting price: {itemDetail[0].starting_price}</span>
              </div>

              <div>
                <h4 style={{marginBottom: "5px"}}>Auction</h4>
                <span className='card__detail'>current Highest Bidder: {currentBidder}</span>
                <span className='card__detail'>Current Bid Amount: {currentBid}</span>
                <span className='card__detail'>Next bid amount: {nextBidAmt}</span>
                <span className='card__detail'>Time Left: <Countdown date={Date.now()+(toSecond(itemDetail[0].auction_end_date+ " ", itemDetail[0].auction_end_time+":12"))} renderer={renderer} onComplete={completeFunction}/></span>
                {itemDetail[0].expired == "true" || currentBidder==user.username?
                <></>
                :
                <>
                <button ref={bidBtnRef} className="cart" onClick={enterBid}>Bid</button>
                <button ref={chatBtnRef} className="cart cart2" onClick={joinChat}>Chat</button>
                </>
                }
              </div>
            </div>
          </div>:
          <>Item detail not found</>
          }
          {render? <ChatBox socket={socket} user={user} seller={itemDetail[0].customer_id}/>: <></>}
      </div>
      <FooterContainer/>
      </>
    );
  }


export default ProductDetail;