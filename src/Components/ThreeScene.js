import * as THREE from "three"
import React, { Component, useEffect, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Reflector } from "three/examples/jsm/objects/Reflector"
import { Mesh } from "three";
import { InteractionManager, InteractiveEvent } from "three.interactive";
import { Line3 } from "three";
import { Vector3 } from "three";
import Helper  from "./Helper";

var text = '';

export function getText(){
    return text
}

class ThreeScene extends Component {
    
    constructor() {
        super();
        this.state = {
            intro:0,
            autoMoving: true,
            translated:false,
            selected: 0,
            infoText: "ciao",
            opacity: 100,
            showHelper:true,
        };

    }

    componentDidMount() {
        const access = this;
        this.closest = undefined;
        this.objects = [];
        this.onFront = false;
        this.previousCoords = undefined;
        this.lockedControls = false;

        this.loader = new GLTFLoader();
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000,3.5,15);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
        });
        this.renderer.autoClear=false;
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(50, window.innerHeight / window.innerWidth, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 7;
        this.camera.rotation.x += 0;
        this.camera.rotation.y -= 0;

        this.interaction = new InteractionManager(
            this.renderer,
            this.camera,
            this.renderer.domElement
        );
        
        window.addEventListener("load", this.handleWindowResize1());
        window.addEventListener("resize", this.handleWindowResize1);
        
        window.addEventListener('touchstart', ()=>{
            //TODO 
            
            // setTimeout(()=>{this.setState({autoMoving: true})},5000);
            // setTimeout(()=>{console.log('first')},1000);

            this.setState({autoMoving:false});
        })
        window.addEventListener("mousedown", ()=>{
            this.setState({autoMoving:false});
            this.controls.autoRotate = false;
            this.lockedControls = true;
        })
        window.addEventListener("mouseup", ()=>{
            this.lockedControls = false;
        })
        window.addEventListener('scroll', function (e){
            access.setState({
                opacity: 100 - (window.scrollY/ 600) * 100 + "%"
            })

        });

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

        /*
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        */
       
        this.loadCards();
        this.addPlane();
        this.envLight();
        this.scene.add(this.camera);
        this.animation();
        this.renderer.render(this.scene, this.camera);
    }
    
    //FINE PREAMBOLO

    //mouseListener che si attiva quando premi su una carta per ruotare l'oggetto
    //MeshPhysicalMaterial clearcoat effetto shiny


    //Sfocatura gaussiana sulle carte dietro
    //logo che cade dall'alto; logo che gira
    //aggiungere logo che gira in mezzo al cerchio di carte
    //fare animazione in entrata delle carte
    //Fare in modo che la carta piu vicina si avvicini ulteriormente quando premuta e possa venire ruotata

    loadCards() {
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.PlaneBufferGeometry(1, 1.33333, 1, 1) //default 1,1
        const scene = this.scene
        const obj = this.objects
        const int = this.interaction
        //todo fare con ogni file della cartella
        const count = 20;

        for (let i = 0; i < count; i++) {
            loader.load(
                "pics/" + i.toString() + ".jpg",
                (texture) => this.loadElement(texture,scene,int,obj,i,count,geometry),
                undefined,
                function (err) {
                    console.error('An error happened loading a picture.');
                }
            )
        }
    }

    loadElement(texture,scene,int,obj,i,count,geometry) {
        
        const material = new THREE.MeshBasicMaterial({
            color: "white",
            map: texture,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        const t = i / count * 2 * Math.PI;

        mesh.name="nfts/test_image" + i.toString() + ".png"
        mesh.position.x = Math.cos(t) * status.radius;
        mesh.position.z = Math.sin(t) * status.radius;
        
        
        mesh.addEventListener("click", (event) =>{
            if(this.lockedControls === false && this.controls.autoRotate === false && event.distance <= 3.65)
            {
                this.setState({showHelper:false})
                if(!this.onFront){
                    this.previousCoords = new Vector3(this.closest.position.x,this.closest.position.y,this.closest.position.z) 
                    new Line3(this.closest.position,this.camera.position).getCenter(this.closest.position)
                    this.controls.enableRotate = false;
                    this.onFront = true;
                    this.scene.fog = new THREE.FogExp2(0x000000,0.2);
                }
                else{
                    this.closest.position.x = this.previousCoords.x
                    this.closest.position.y = this.previousCoords.y
                    this.closest.position.z = this.previousCoords.z
                    this.controls.enableRotate = true;
                    this.scene.fog = new THREE.Fog(0x000000,3.5,15);
                    this.onFront = false;
                }  
            } 
            event.stopPropagation();
        });

        scene.add(mesh);
        int.add(mesh)
        obj.push(mesh);
    }

    addPlane() {
        var planeGeometry = new THREE.PlaneBufferGeometry(30, 30)
        var glass = new THREE.PlaneBufferGeometry(30, 30, 100, 100)
        this.glass = new Mesh(glass, planeMat)
        planeMat.transparent = true;

        this.plane = new Reflector(planeGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: "0x777777",
            recursion: 4,
            antialias: true,
        })

        this.glass.position.y -= 0.659 //default 0.499
        this.glass.rotateX(-Math.PI / 2)
        this.plane.rotateX(-Math.PI / 2)
        this.plane.position.y -= 0.66 //default 0.5
        this.scene.add(this.glass)
        this.scene.add(this.plane)
    }

    envLight() {
        this.dlight = new THREE.DirectionalLight(0x95a4b3, 15);
        //this.dlight = new THREE.AmbientLight("white", 1);
        this.dlight.position.set(0, 0, 1);
        this.dlight.castShadow = true;
        this.scene.add(this.dlight)
    }

    lookAtCamera() {
        const objects = this.objects
        const camera = this.camera;

        objects.forEach(function (obj) {
            obj.lookAt(camera.position)
        })
    }

    processClosest() {
        const objects = this.objects;
        const camera = this.camera;
        var selected = 0;
        let distance = 100000;

        objects.forEach(function (obj) {
            const localdistance = obj.position.distanceTo(camera.position)
            if (localdistance < distance) {
                distance = localdistance;
                selected = objects.indexOf(obj);
            }
            else {
                //obj.material.transparent = true; 
                //console.log(obj.opacity)
            }
        })
        try {
            if (objects.at(selected)) {
                // console.log(objects.at(selected));
                text = objects.at(selected);

                const myobj = objects.at(selected)
                let orientation = 0;
            
                this.angle = camera.position.angleTo(myobj.position)*180/Math.PI;
                this.closest = myobj;

                orientation = this.closest.position.x * this.camera.position.z - this.closest.position.z * this.camera.position.x;
                if(orientation > 0) this.angle *= -1;
                
                myobj.rotation.z += Math.PI;
                this.setState({ infoText: myobj.name })
                
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.renderer.render(this.scene, this.camera);
        this.lookAtCamera();
        this.processClosest();
        this.rotateToTarget();

        this.interaction.update();
        this.controls.update();
    }

    handleWindowResize1 = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight ;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    rotateToTarget(){
        if(this.closest && !this.state.autoMoving){   
            if(Math.floor(this.angle)!==0){
                if(Math.floor(this.angle>0)){
                    this.setState({showHelper:false})
                    this.controls.autoRotateSpeed=2.0;
                    this.controls.autoRotate = true;
                }
                else{
                    this.controls.autoRotateSpeed=-2.0;
                    this.controls.autoRotate = true;
                }
            }
            else{
                this.controls.autoRotate = false;
            }
        } 
    }

    render() {  
        const access = this;
        const s = this.state.opacity;
        const helper = this.state.showHelper;
        let helperPanel;

        if(helper) helperPanel = (<Helper/>)
        else helperPanel = null;

        return (
            <div id="render" style={{opacity:s}}>
                <div
                    ref={mount => {
                        this.mount = mount;
                    }} />
                {helperPanel}
            </div>
        )
    }
}

const status = {
    radius: 4,
    elements:20,
}
const planeMat = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: "black",
    opacity: 0.67,
})

export default ThreeScene;