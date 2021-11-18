import React, {Component} from 'react'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

class ThreeScene extends Component{
    componentDidMount(){
        this.scene = new THREE.Scene();
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75,window.innerHeight/ window.innerWidth,0.1,1000);
        this.camera.position.z=0.5;
        this.light = new THREE.AmbientLight(0x404040,1);

        window.addEventListener("load",this.handleWindowResize1);

        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({
            color: 0xf3f3f3,
            wireframe:true
        });
        /*var material = new THREE.MeshPhongMaterial({
            color: 'red',
        })*/

        this.cube = new THREE.Mesh(geometry,material);

        this.scene.add( this.camera );
        this.scene.add(this.cube);
        this.scene.add(this.light);
        this.animation(); 
        
        new OrbitControls(this.camera,this.renderer.domElement);
        
        this.renderer.render(this.scene,this.camera);

        window.addEventListener("resize",this.handleWindowResize1);
    }

animation = ()=>{
    requestAnimationFrame(this.animation);
    this.cube.rotation.x +=0.001
    this.cube.rotation.y +=0.0005
    this.renderer.render(this.scene,this.camera);
}

handleWindowResize1= () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene,this.camera);
}
    render(){
        return(
            <div
            ref={mount => {
                this.mount = mount;
            }}/>
        )
    } 
}

export default ThreeScene;