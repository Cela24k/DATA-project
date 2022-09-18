import { Component } from "react/cjs/react.production.min";
import "./styles/info.css"

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transition_pos: 0,
        }
    }

    componentDidMount(){
        console.log('mounted');
        let intervalId = setInterval(()=>{
            if(this.state.transition_pos >= 100)
                clearInterval(intervalId);
            else
                this.setState((state)=>{
                    return {transition_pos: state.transition_pos + 1}
                })
        },5);
    }

    render() {
        return (
            <div className="info">
                <div className="container">
                    <div className="flex-div">
                        <div className="paragraphs">
                            <p>Data is a project created by Pietro Giacon, Alessandro Celadon and Michele Dal Ponte</p>
                            <p>It is an archive of our personal ideas and works.</p>
                            <p>It consist in a creative platform, providing graphic designs , pictures, chill beats and everything that comes to our minds.</p>
                            <p>Data is based in creativity and sharing is the key to our work.</p>
                        </div>
                        <div className="credits">
                            <div className="credits-container" style={{ 'marginTop': '1.5em' }}>
                                <p className="header">Credits</p>
                                <p className="text">Alessandro Celadon, Pietro Giacon, Michele Dal Ponte, Serena Bedin</p>
                            </div>
                            <div className="credits-container">
                                <p className="header">Work with us</p>
                                <p className="text">If you want to share your project or bring something to light, send a message <u>here</u></p>
                            </div>
                            <div className="credits-container">
                                <p className="header">What's next</p>
                                <p className="text">...loading...</p>
                            </div>
                        </div>
                    </div>
                    <div className="eye-catcher">
                        <h1 >What's Data?</h1>
                    </div>
                </div>
                <div className="custom-div" style={{height: (100 - this.state.transition_pos) + '%'}}></div>
            </div>
        )
    }
}
export default Info;
