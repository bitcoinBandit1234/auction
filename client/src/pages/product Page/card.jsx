import "./card.scss";
import toSecond from "../../helpers/timeCalculator";
import Countdown from "react-countdown";
import { socket } from '../Home page/home_page';
import { useEffect, useState } from "react";

function Card(props){

  const [expired, setExpired] = useState(false);

  useEffect(()=>{
    if(expired){
      completeFunction();
    }
  },[])

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="expiredText">Expired</span>;

    } else { 
      return <span>{(days*24)+hours}hr:{minutes}min:{seconds}sec</span>;
    }
  };

  const completeFunction = ()=>{
    setExpired(true);
    console.log("completed");
    socket.emit("setWinner", props.auction_id);
  }

    return (
        <div className="card">
          <div className="card__body">
            <img src={props.img} className="card__image" />
            <h4 className="card__title">{props.title}</h4>
            {props.amount?
              <span style={{display:"block", marginLeft:"15px", marginBottom:"10px", fontSize:"18px", color:"#f85606"}}>Amount: {props.amount}</span>:
              <span style={{display:"block", marginLeft:"15px", marginBottom:"10px", fontSize:"18px", color:"#f85606"}}>minimum Bid: {props.minimumBid}</span>
          }
          {props.amount?
          <></>:
            <span style={{display:"block", marginLeft:"15px", color: "#9e9e9e"}}>Time left: <Countdown date={Date.now()+(toSecond(props.endDate+ " ", props.endTime+":12"))} renderer={renderer} onComplete={completeFunction}/></span>
          }
            </div>
        </div>
      );
}

export default Card;