import React, { Component, useEffect, useState } from 'react'


class Ticker extends Component {

    constructor(){
        super();
        this.state = {
            position: 0,
            text: "TRACK #1",
        }
    }

    animate(){
        const music = true;
        console.log(this.state.position)
        if(music)
        {
            if(this.state.position>0)
            {
                this.rotate();
            }
            else this.setState({position:100})
        }
    }

    rotate(){
        let pos = this.state.position;
        this.setState({position:--pos})
    }
    
    render() {
        return (
            <div className='ticker' style={{left:this.state.position.toString()+"%"}}>
                NOW PLAYING {this.state.text.toUpperCase()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                NOW PLAYING {this.state.text.toUpperCase()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                NOW PLAYING {this.state.text.toUpperCase()}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                NOW PLAYING {this.state.text.toUpperCase()}
            </div>
            
        )
    } 
}

export default Ticker;