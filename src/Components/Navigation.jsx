import { Component } from "react/cjs/react.production.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRightLong, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component{

constructor(){
    super();
    this.state = {
        opened:false,
    }
}


render(){
    return(
        <div style={{color:"white", width: "100%",
                     display:"flex",
                     justifyContent: "space-around",
                     textAlign:"center", 
                     zIndex:1,
                     position:"fixed", 
                     bottom:"100px"}}>
            <div style={{width:"10rem"}}>
                <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>
            </div>
            <div style={{width:"5rem",height:"1.5rem", border:"2px solid", borderRadius:"16px", display:"flex",alignItems:"center",justifyContent:"center"}}>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </div>
            <div style={{width:"10rem"}}>
                <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
            </div>
        </div>
    )
}
}

export default Navigation;
