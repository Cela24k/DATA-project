import React, { Component, useEffect, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from "three"

class Music extends Component {

    componentDidMount(){
       this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
        });
        this.renderer.autoClear=false;
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(50, window.innerHeight / window.innerWidth, 0.1, 1000);
        this.camera.position.x = 6;
        this.camera.position.y = 10;
        this.camera.rotation.x += 0;
        this.camera.rotation.y -= 0;
        const cubeGeometry = new THREE.BoxGeometry(1,1,1);
        const cubeMesh = new THREE.MeshBasicMaterial({
            color:"green",
            wireframe:false
        });

        this.cube = new THREE.Mesh(cubeGeometry,cubeMesh);
        this.scene.add(this.cube)
        this.renderer.render(this.scene,this.camera)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
    }

    animate(){
        requestAnimationFrame(this.animate);
        this.cube.rotation.x += 0.01;
        this.renderer.render( this.scene, this.camera)
    }

    render() {
        return (
            <div>
                <div
                    ref={mount => {
                        this.mount = mount;
                    }} />
            </div>

        )
    }

}

export default Music;
