import { Component } from "react/cjs/react.production.min";

class Helper extends Component{

    constructor(){
        super();
        this.state = {
            opacity:0.25
        }
        this.frame = 0;
    }


    render(){
        /*this.setState({opacity:Math.abs(Math.cos(this.frame))})
        this.frame+=1;*/
        return(
            <div className="helper_row" style={{opacity:this.state.opacity}}>
                <div className="helper">
                    <img src="media/drag1.gif" alt="drag to move"></img>
                </div>
                <p color="white">Drag to discover.</p>
            </div>
            
        )
    }
}

export default Helper;