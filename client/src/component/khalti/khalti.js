import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti(){
    let checkout = new KhaltiCheckout(config);

    return(
        <button onClick={()=>checkout.show({amount: 1000})}>pay via khalti</button>
    )
}