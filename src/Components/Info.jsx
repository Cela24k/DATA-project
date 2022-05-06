import { Component } from "react/cjs/react.production.min";

class Info extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            opened: this.props.open,
        }
    }

    render(){
        console.log(this.state.opened)
        if(this.state.opened) {
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