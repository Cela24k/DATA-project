import { Component } from "react/cjs/react.production.min";
import Grid from './Grid';
import { Dimensions } from 'react';
import "./styles/cardpanel.css"
// in your class component

class CardPanel extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            generatedImages: []
        }
        
    }

    componentDidMount() {

        let images_list = Array(20).fill(1).map((val, index) => {
            // const height = Math.floor(Math.random() * (600 - 300) + 300)
            // const width = Math.floor(Math.random() * (700 - 200) + 200)
            const height = val.height
            const width = val.width

            return {
                src: `pics/` + index.toString() + ".jpg",
                width: width,
                height: height,
            };
        })


        this.setState({ generatedImages: images_list })
    }

    componentWillUnmount(){

    }

    render() {
        const images = this.state.generatedImages

        return (
            <div className="pictures-page">
                ciaooo

                {images.map((val,index)=>{
                    return (<img src={val.src} loading='lazy' width={val.width} height={val.height} alt='scritto sotto minaccia'></img>)
                })}
            </div>
        )
    }
}
export default CardPanel;