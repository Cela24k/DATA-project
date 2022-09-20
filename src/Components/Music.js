import React, { Component, useEffect, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { InteractionManager } from 'three.interactive';
import * as THREE from "three"

class Music extends Component {

    constructor(){
        super();
        this.state = {}
    }
    
    componentDidMount(){
       this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
        });
        this.renderer.autoClear=true;
        this.renderer.setClearColor(0xfff, 0.0);
        this.renderer.setSize(document.getElementById('music-container').offsetWidth, document.getElementById('music-container').offsetHeight);
        
        this.mount.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(50, document.getElementById('music-container').offsetWidth / document.getElementById('music-container').offsetHeight, 0.1, 1000);
        this.camera.position.x = 1;
        this.camera.position.y = 2;
        // this.camera.rotation.x += 0;
        // this.camera.rotation.y -= 0;
        const cubeGeometry = new THREE.BoxGeometry(1,1,1);
        const cubeMesh = new THREE.MeshBasicMaterial({
            color:"green",
            wireframe:true
        });
        
        this.interaction = new InteractionManager(
            this.renderer,
            this.camera,
            this.renderer.domElement
        );

        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        this.controls.rotateSpeed = 0.25;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        this.controls.minPolarAngle = Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -0.4;

        window.addEventListener("resize", this.handleWindowResize1);
        // window.addEventListener("mousedown", ()=>{
        //     this.setState({autoMoving:false});
        //     this.controls.autoRotate = false;
        //     this.lockedControls = true;
        // })
        // window.addEventListener("mouseup", ()=>{
        //     this.lockedControls = false;
        // })
        
        this.handleWindowResize1();

        this.envLight();
        this.cube = new THREE.Mesh(cubeGeometry,cubeMesh);
        this.scene.add(this.cube)
        this.renderer.render(this.scene,this.camera)
        this.animation();
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.renderer.render(this.scene, this.camera);

        this.interaction.update();
        this.controls.update();
    }

    envLight(){
        // this.dlight = new THREE.DirectionalLight(0x95a4b3, 15);
        this.dlight = new THREE.AmbientLight("white", 1);
        this.dlight.position.set(0, 0, 1);
        this.dlight.castShadow = true;
        this.scene.add(this.dlight)
    }

    handleWindowResize1 = () => {
        this.camera.aspect = document.getElementById('music-container').offsetWidth / document.getElementById('music-container').offsetHeight ;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(document.getElementById('music-container').offsetWidth, document.getElementById('music-container').offsetHeight);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div className='music'>
                <div
                    ref={mount => {
                        this.mount = mount;
                    }} />
            </div>

        )
    }

}

export default Music;
