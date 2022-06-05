import "./card.scss";
import toSecond from "../../helpers/timeCalculator";
import Countdown from "react-countdown";

function Card(props){

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="expiredText">Expired</span>;

    } else { 
      return <span>{(days*24)+hours}hr:{minutes}min:{seconds}sec</span>;
    }
  };

    return (
        <div className="card">
          <div className="card__body">
            <img src={props.img} className="card__image" />
            <h4 className="card__title">{props.title}</h4>
            <span style={{display:"block", marginLeft:"15px", marginBottom:"10px", fontSize:"18px", color:"#f85606"}}>minimum Bid: {props.minimumBid}</span>
            <span style={{display:"block", marginLeft:"15px", color: "#9e9e9e"}}>Time left: <Countdown date={Date.now()+(toSecond(props.endDate+ " ", props.endTime+":12"))} renderer={renderer}/></span>
          </div>
        </div>
      );
}

export default Card;