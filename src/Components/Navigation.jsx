import { Component } from "react/cjs/react.production.min";

class Navigation extends Component{

constructor(){
    super();
    this.state = {
        opened:false,
    }
}

onTrigger = (event) => {
    this.props.parentCallback();
    event.preventDefault();
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
                <span className="material-icons">arrow_back</span>
            </div>
            <div style={{width:"5rem",height:"1.5rem", border:"2px solid", borderRadius:"16px", display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span className="material-icons" onClick={this.onTrigger}>expand_more</span>
            </div>
            <div style={{width:"10rem"}}>
                <span className="material-icons">arrow_forward</span>
            </div>
        </div>
    )
}
}

export default Navigation;
