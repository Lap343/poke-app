import { useState } from "react"
import { getPokeByNameOrId } from "../utils/api"
// import splashBackground from "../assets/splash-background.png"
// import splashStar from "../assets/splash-star.png"
// import splashTitle from "../assets/splash-title.png"
import TwoSearched from "./TwoSearched"


const Main = () => {
    let pokemon = getPokeByNameOrId("ditto");

    return <div className="main">
        {/* <img className="splash-background" src={splashBackground} alt=""/>
        <img className="splash-star" src={splashStar} alt=""/>
        <img className="splash-title" src={splashTitle} alt=""/> */}
        <TwoSearched name={pokemon}/>
    </div>
}

export default Main;