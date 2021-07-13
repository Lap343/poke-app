import splashBackground from "../assets/splash-background.png"
// import splashStar from "../assets/splash-star.png"
// import splashTitle from "../assets/splash-title.png"
import TypeCheck from "./TypeCheck"
import "../styles/TypeCheck.css"

const Main = () => {
    return <div className="main">
        <img className="splash-background" src={splashBackground} alt=""/>
        {/* <img className="splash-star" src={splashStar} alt=""/>
        <img className="splash-title" src={splashTitle} alt=""/> */}
        <TypeCheck />
    </div>
}

export default Main;