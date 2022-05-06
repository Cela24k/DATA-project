import { Component } from "react/cjs/react.production.min";

class Info extends Component{
    
    constructor(){
        super();
        this.state = {
            opened:false
        }
    }

    render(){
        if(this.state.opened) {
            console.log("ciao");
            return InfoHTML();
        }
        else return null;
    }
}
export default Info;

function InfoHTML(){
    return (
        <div className="info">
            Ciaos
        </div>
    )
} 