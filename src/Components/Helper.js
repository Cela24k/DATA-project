import { Component } from "react/cjs/react.production.min";

class Helper extends Component{

    constructor(){
        super();
        this.state = {
            opacity:0.8
        }
        this.frame = 0;
    }


    render(){
        /*this.setState({opacity:Math.abs(Math.cos(this.frame))})
        this.frame+=1;*/
        return(
            <div className="helper_row" style={{opacity:this.state.opacity}}>
                <div className="helper" style={{width: "4rem"}}>
                    <img src="media/Icone DRAG N SCROLL.svg" alt="drag to move"></img>
                </div>
                <p style={{fontFamily: "Uncut Sans Bold", fontStyle:"italic"}} color="white">SCROLL OR DRAG TO DISCOVER</p>
            </div>
            
        )
    }
}

export default Helper;