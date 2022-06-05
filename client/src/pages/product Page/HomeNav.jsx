function HomeNav(){
    return(
        <div style={{marginLeft:"450px",display:"flex",justifyContent:"space-evenly" ,flexDirection:"row", height: "50px"}}>
            <input className="mainSearchText" type="text" style={{color: "#555555", height: "35px",width: "500px", position: "relative",border: "2px solid #cdcdcd",borderColor: "rgba(0, 0, 0, .14)",backgroundColor: "AliceBlue",fontSize: "20px", fontWeight:"lighter"}}/>
            <button style={{color: "#555555" ,width: "100px", height: "35px", fontSize: "20px", fontWeight: 100}}>search</button>
        </div>
    )
}

export default HomeNav;