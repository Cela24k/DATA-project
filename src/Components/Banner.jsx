import { Component } from "react/cjs/react.production.min";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
class Banner extends Component {
    constructor() {
        super();
        this.state = {
            location: window.location.href.split('/').pop(),
            text: ''
        }

        this.updateStyle = this.updateStyle.bind(this)
    }

    componentDidMount() {
        console.log(window.location.href.split('/').pop());
        this.setState({ location: window.location.href.split('/').pop() });
    }

    updateStyle(url) {
        this.setState(prevState => ({
            location: url
        }));
    }

    render() {
        // setTimeout(function(){this.setState({text: true})}, 1000);
        return (<div className={"banner_" + this.state.location}>
            <div style={{ display: "flex" }}>
                <div className={"logo_" + this.state.location}></div>
                <div className="label">
                    <p style={{ marginBottom: '2px' }}>Welcome to Data, our digital archive</p>
                    <p style={{ marginTop: '0', marginBottom: '0' }}>and personal space</p>
                </div>
            </div>
            <div class="divider">
            </div>
            <div className="section">
                <nav>
                    <ul className="lista" style={{ padding: "inherit" }}>
                        {this.state.location ?
                            <li><a className={"link_" + this.state.location} style={{ color: "grey", zIndex:-1 }} href="soundtrack">{'text'}, </a></li>
                            :
                            <li><a className={"link_" + this.state.location} style={{ color: "grey" }} href="soundtrack">{'text'}, </a></li>
                        }
                        {this.state.location ?
                            <li> <a className={"link_" + this.state.location} style={{zIndex:-1}} href="clothing">Contact</a></li>
                            :
                            <li><a className={"link_" + this.state.location} style={{ color: "grey" }} href="soundtrack">{'text'}, </a></li>
                        }
                        <li> <Link to="/info" className={"link_" + this.state.location} onClick={() => { this.updateStyle('info') }} >Info</Link></li>
                        {/* METTERE COMPONENT */}
                        <li> <div style={{ border: "2px solid", borderRadius: "20px", paddingLeft: "10px", paddingRight: "10px", marginLeft: "185px", width: "40px", color: "grey", textAlign: "initial" }}> EN </div> </li>
                        {this.state.location? 
                            <span className="material-icons" style={{position:"absolute", right:0, top:-20}}>close</span> 
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