import { Component } from "react/cjs/react.production.min";

class Navigation extends Component {

    constructor() {
        super();
        this.state = {
            opened: false,
        }

        window.addEventListener('scroll', (ev)=>{
            console.log(ev);
            console.log(document.body.scrollHeight);
            if(window.scrollY >= 400)
                this.setState({opened: true});
            else 
                this.setState({opened: false});
        })
    }

    onTrigger = (event) => {
        const isOpen = this.state.opened;
        if(isOpen)
            this.props.parentCallback(false);
        else
            this.props.parentCallback(true);
        // this.setState({ opened: isOpen ? false : true });
        event.preventDefault();
    }

    render() {

        return (
            <div style={{
                color: "white", width: "100%",
                display: "flex",
                justifyContent: "space-around",
                textAlign: "center",
                zIndex: 100,
                position: "absolute",
                bottom: '10vh',
            }}>
                <div style={{ width: "10rem" }}>
                    {
                        this.state.opened ? null :
                            <span className="material-icons">arrow_back</span>
                    }
                </div>
                <div style={{ width: "5rem", height: "1.5rem", border: "2px solid", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        this.state.opened ?
                            <span className="material-icons" onClick={this.onTrigger}>expand_less</span>
                            :
                            <span className="material-icons" onClick={this.onTrigger}>expand_more</span>

                    }
                </div>
                <div style={{ width: "10rem" }}>
                    {
                        this.state.opened ? null :
                            <span className="material-icons">arrow_forward</span>
                    }
                </div>
            </div>
        )
    }
}

export default Navigation;
