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
        return(
            <div className="helper_row" style={{opacity:this.state.opacity}}>
                {/*<div className="helper" style={{width: "4rem"}}>
                    <img src="media/Icone DRAG N SCROLL.svg" alt="drag to move"></img>
                </div>*/}
                <p style={{fontFamily: "Uncut Sans Bold", fontSize:"36px" /* fontStyle:"italic"*/}} color="white">Drag to discover.</p>
            </div>
            
        )
    }
}

export default Helper;