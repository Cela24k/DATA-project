import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
        }
    }

    render() {
        return (this.state.type === "app") ? App() : Info();
    }
}

const App = function () {
    return (<div className="banner">
        <div style={{ display: "flex" }}>
            <div className="logo"></div>
            <div style={{ color: "Grey", alignSelf: "end", paddingBottom: "4px" }}>
                <p style={{ marginBottom: '2px' }}>Welcome to Data, our digital archive</p>
                <p style={{ marginTop: '0', marginBottom: '0' }}>and personal space</p>
            </div>
        </div>
        <div style={{ width: "150px" }}>
        </div>
        <div className="section">
            <nav>
                <ul className="lista" style={{ padding: "inherit" }}>
                    <li><a className="link" style={{ color: "grey" }} href="soundtrack">{'text'}, </a></li>
                    <li> <Link to="/info" className="link">Info,</Link></li>
                    <li> <a className="link" href="clothing">Contact</a></li>
                    {/* METTERE COMPONENT */}
                    <li> <div style={{ border: "2px solid", borderRadius: "20px", paddingLeft: "10px", paddingRight: "10px", marginLeft: "185px", width: "40px", color: "grey", textAlign: "initial" }}> EN </div> </li>
                </ul>
            </nav>
        </div>
    </div>
    )
}

const Info = function () {
    return (
        <div className="banner_info">
            <div style={{ display: "flex" }}>
                <div className="logo" style={{ backgroundColor: "black" }}></div>
                <div style={{ color: "Grey", alignSelf: "end", paddingBottom: "4px" }}>
                    <p style={{ marginBottom: '2px' }}>Welcome to Data, our digital archive</p>
                    <p style={{ marginTop: '0', marginBottom: '0' }}>and personal space</p>
                </div>
            </div>
            <div style={{ width: "150px" }}>
            </div>
            <div className="section">
                <nav>
                    <ul className="lista" style={{ padding: "inherit" }}>
                        <li> <a onClick={{}} style={{ color: "black", fontWeight: "bold" }} className="link" href="/">Info</a></li>
                        <li> <span className="material-icons" style={{ paddingLeft: "10px", paddingRight: "10px", marginLeft: "185px", width: "40px", color: "grey", textAlign: "initial" }}>close</span></li>
                        {/* METTERE COMPONENT */}
                        
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Banner;