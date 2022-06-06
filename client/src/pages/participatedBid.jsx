import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import Card from "./product Page/card";

function ParticipatedBid(){

    let isRendered = useRef(false);

    const [itemDetails, setitemDetails] = useState([]);

    const [products, setPorducts] = useState([]);

    const [error, setError] = useState("");

        useEffect(() => {

            setPorducts(JSON.parse(localStorage.getItem('participatedProducts')));

            if(itemDetails.length == 0){

                setError("Not participated in Bids yet");

                return;
            }else{
                isRendered.current = true;

                axios
                    .get("http://localhost:3301/product/getParticipatedProducts" + products)
                    .then(res => {
                        if (isRendered.current && res.status <= 200) {

                            setitemDetails(res.data.data);

                        }
                    })

                    .catch(err => console.log(err));
            }
            return () => {

                isRendered.current = false;

            };
        }, []);

    return(
        <div>

        <h1>My Bids</h1>

        <div className="wrapper">

            {itemDetails.length !== 0 ?
            itemDetails.map((item)=>{
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

        </div>

    );
}

export default ParticipatedBid;