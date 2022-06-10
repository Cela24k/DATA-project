import { Component } from "react/cjs/react.production.min";
import Banner from "./Banner";

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="info">
                <Banner type="info"/>
            </div>
        )
    }
}
export default Info;
