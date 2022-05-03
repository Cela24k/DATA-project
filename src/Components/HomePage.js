import { Component } from "react/cjs/react.production.min";

class HomePage extends Component {

    constructor() {
        super();
        this.objects = [];
        this.closest = undefined;
        this.closestPoint = undefined;

        //mettere lo spawn delle foto qua
        // ********
        
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div id="three">
                <div
                    ref={mount => {
                        this.mount = mount;
                    }} />
            </div>
        )
    }
}