import { Component } from "react/cjs/react.production.min";
import "./styles/cardinfo.css"

class CardInfo extends Component {

    constructor() {
        super();
        this.state = {
            opacity: 0.8
        }
    }

    onClick = (event) => {
        // const isOpen = this.state.opened;
        // if(isOpen)
        //     this.props.parentCallback(false);
        // else
        //     this.props.parentCallback(true);
        // // this.setState({ opened: isOpen ? false : true });
        this.props.parentCallback(true);
        console.log(event);

        event.preventDefault();
    }

    render() {
        return (
            <div className="card">
                <h1 style={{color:"white", textAlign:"center"}}>Sample Header</h1>
                <i style={{color:"white", fontSize: "smaller"}}> Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed venenatis hendrerit orci, 
                in mollis dolor maximus eget. Sed in accumsan felis, id maximus ipsum. 
                Sed ornare dui id nibh vehicula fringilla. Pellentesque aliquam massa ac lorem ultricies hendrerit. 
                Nam id tellus risus. Vestibulum aliquam quis augue eu pellentesque. Cras rhoncus, urna nec auctor bibendum, 
                dui velit elementum elit, in ultrices nisi nibh cursus tellus. Aliquam mollis dignissim facilisis. 
                Integer eu libero leo. Fusce aliquet, erat et sollicitudin consequat, sapien lacus mattis libero
                </i> 
                <br />
                <span className="material-icons" style={{color:"white", 
                textAlign:"center", 
                width: "100%", 
                borderBottom: "1px solid grey",
                opacity:0.65,
                marginTop: "20px"}} onClick={this.onClick}>expand_more</span>
            </div>
        )
    }
}

export default CardInfo;