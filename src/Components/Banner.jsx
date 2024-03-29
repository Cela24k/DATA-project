import { Component } from "react/cjs/react.production.min";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { getText } from "./ThreeScene";

class Banner extends Component {
    constructor() {
        super();
        this.state = {
            location: window.location.href.split('/').pop(),
            text: getText()
        }
        this.updateStyle = this.updateStyle.bind(this);
        // this.setState({text: getText()})
    }

    componentDidMount() {
        console.log(window.location.href.split('/').pop());
        this.setState({ location: window.location.href.split('/').pop() });
        setInterval(()=>{ this.setState({text: getText().name })},200);
    }

    // componentDidUpdate(){
    //     console.log('updated');
    //     this.setState({ location: window.location.href.split('/').pop() });
    // }

    updateStyle(url) {
        this.setState(prevState => ({
            location: url
        }));
    }

    render() {
        return (<div className={"banner_" + this.state.location}>
            <div className="flex-container">
                <div className={"logo_" + this.state.location}></div>
                <div className="label">
                    <p style={{ marginBottom: '2px' }}>Welcome to Data, our digital archive</p>
                    <p style={{ marginTop: '0', marginBottom: '0' }}>and personal space</p>
                </div>
            </div>
            <div className="divider">
            </div>
            <div className="section">
                <nav>
                    <ul className="lista" style={{ padding: "inherit" }}>
                        {this.state.location ?
                            <li><a className={"link_" + this.state.location} style={{ color: "grey", opacity:0 }} href="soundtrack">{this.state.text} </a></li>
                            :
                            <li><a className={"link_" + this.state.location} style={{ color: "grey" }} href="soundtrack">{this.state.text} </a></li>
                        }
                        {this.state.location ?
                            <li> <a className={"link_" + this.state.location} style={{opacity:0}} href="clothing">Contact</a></li>
                            :
                            <li><a className={"link_" + this.state.location} style={{ color: "grey" }} href="soundtrack">Contact </a></li>
                        }
                        <li> <Link to="/info" className={"link_" + this.state.location} onClick={() => { this.updateStyle('info') }} >Info</Link></li>
                        {/* METTERE COMPONENT */}
                        <li> <div style={{ border: "2px solid", borderRadius: "20px", paddingLeft: "10px", paddingRight: "10px", marginLeft: "185px", width: "40px", color: "grey", textAlign: "initial" }}> EN </div> </li>
                        {this.state.location? 
                            <Link to='/'> 
                                <span className="material-icons" style={{position:"absolute", color:"black", "marginLeft": "25px",}} onClick={()=>{this.updateStyle('')}}>close</span> 
                             </Link>
                            :
                            null
                        }
                    </ul>
                </nav>
            </div>
        </div>
        )
    }
}

export default Banner;