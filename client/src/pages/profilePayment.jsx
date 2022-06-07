import  { useEffect, useState, useRef } from "react"
import { useContext } from "react";
import axios from "axios";
import Card from "./product Page/card";
import { AccountContext } from "../component/AccountContext";
import config from "../component/khalti/khaltiConfig";
import KhaltiCheckout from "khalti-checkout-web";

function ProfilePayment(){

    const {user} = useContext(AccountContext);

    const username = user.username;

    let isRendered = useRef(false);
    const [myPayment, setMyPayment] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {

        isRendered.current = true;

            axios
                .get("http://localhost:3301/product/getWonProducts/"+ username)
                .then(res => {
                    if (isRendered.current && res.status <= 200) {

                        setMyPayment(res.data.data);

                    }
                })

                .catch((err) => {console.log(err); setError("Not won bids yet")});
        
        return () => {

            isRendered.current = false;

        };
    }, []);

    return(
        <>
        <div>
        <h2 style={{color: "#555555", marginLeft:"600px"}}>Due Payments</h2>
        </div>
        
        <div style={{marginTop:"30px"}}>
            {error !== "" ?

                <h1>No Bids won yet</h1>
                
                :
        
                <div className="wrapper">
                    {myPayment.length !== 0 ?
                    myPayment.map((item)=>{
                        return(

                        <div onClick={()=>{
                            config.productIdentity = item.auction_id;
                            config.productName = item.title;
                            let checkout = new KhaltiCheckout(config);
                            checkout.show({amount: 3000})}} key={item.auction_id} >

                            <Card  key={item.auction_id} img={item.image} title={item.title} startDate={item.auction_start_date} startTime={item.auction_start_time} amount={item.bid_amount} endDate={item.auction_end_date} endTime={item.auction_end_time}/>
                        
                        </div>
                        
                        );
                    })

                    :

                    <>Loading....</>
                    }
                </div>
            }
        </div>

        {/* <h1><button ref={chatBtnRef} onClick={()=>{checkout.show({amount: 1200})}} className="cart">pay via khalti</button></h1> */}
        </>
    )

}


export default ProfilePayment;