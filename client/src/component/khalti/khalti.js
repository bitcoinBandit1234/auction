import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti(props){
    let checkout = new KhaltiCheckout(config);

    return(
        <button onClick={()=>checkout.show({amount: props.amount})}>pay via khalti</button>
    )
}