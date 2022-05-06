import * as THREE from "three"
import React, { Component, useEffect, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Reflector } from "three/examples/jsm/objects/Reflector"
import { Mesh } from "three";
import { InteractionManager, InteractiveEvent } from "three.interactive";
import { Line3 } from "three";
import { Vector3 } from "three";
class ThreeScene extends Component {

    constructor() {
        super();
        this.state = {
            intro:0,
            moving: false,
            translated:false,
            selected: 0,
            infoText: "ciao",
            opacity: 100,
        };
    }

    componentDidMount() {
        const access = this;
        this.closest = undefined;
        this.objects = [];
        this.onFront = false;
        this.previousCoords = undefined;

        this.loader = new GLTFLoader();
        this.scene = new THREE.Scene();
        //this.scene.fog = new THREE.Fog(0x000000,3.5,10);
        this.scene.fog = new THREE.FogExp2(0x000000,0.095);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
        });
        this.renderer.autoClear=false;
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.setSize(window.innerWidth, window.innerWidth);
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
        window.addEventListener("keypress", function (){
            const factor = access.controls.dampingFactor;
            access.controls.dampingFactor = 0;
            access.camera.position.x = access.closest.position.x;
            access.camera.position.z = access.closest.position.z;
            access.controls.dampingFactor = factor;
            access.controls.update();
            
        });
        window.addEventListener("scroll", function (e){
            access.setState({
                opacity: 100 - (window.scrollY/ 600) * 100 + "%"
            })
        });

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.enableZoom = false;
        this.controls.rotateSpeed = 0.25;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        
        this.controls.minPolarAngle = Math.PI / 2 //- 0.2;
        //this.controls.maxPolarAngle = Math.PI / 2;

        //this.deprecatedModels();
        this.loadCards();
        this.addPlane();
        this.envLight()
        this.scene.add(this.camera);
        //this.scene.add(this.light);
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

    approachCamera(){
        if(this.angle > 0)
            this.camera.rotateY()
    }

    setStateStopped()
    {
        this.setState({
            moving: this.state.moving ? false : true,
        })
    }

    setThird()
    {
        this.setState({
            intro:2,
        })
    }

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
                    console.error('An error happened.');
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
            if(!this.onFront){
                this.previousCoords = new Vector3(this.closest.position.x,this.closest.position.y,this.closest.position.z) 
                new Line3(this.closest.position,this.camera.position).getCenter(this.closest.position)
                this.onFront = true;
            }
            else{
                this.closest.position.x = this.previousCoords.x
                this.closest.position.y = this.previousCoords.y
                this.closest.position.z = this.previousCoords.z
                this.onFront = false;
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

    deprecatedModels() {
        this.loader.load('SuperG2.glb', (gltf) => {
            gltf.scene.scale.set(1, 1, 1)
            this.scene.add(gltf.scene)
        }, undefined, function (error) {

            console.error(error);

        });
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
                const myobj = objects.at(selected)
                let orientation = 0;
            
                this.angle = camera.position.angleTo(myobj.position)*180/Math.PI;
                this.closest = myobj;

                //DA VEDERE, CARTA DAVANTI SI MUOVE IN FUORI QUANDO HOVERATA. NOOOOOOOOOOOO

                

                /*
                this.closest.addEventListener("mouseover", (event) =>{
                    if(!this.onFront){
                
                        this.previousCoords = new Vector3(this.closest.position.x,this.closest.position.y,this.closest.position.z) 
                        new Line3(this.closest.position,this.camera.position).getCenter(this.closest.position)
                        this.onFront = true;
                    }
                });
                this.closest.addEventListener("mouseout", (event) =>{
                    if(this.onFront){
                
                        this.closest.position.x = this.previousCoords.x
                        this.closest.position.y = this.previousCoords.y
                        this.closest.position.z = this.previousCoords.z
                        this.onFront = false;
                    }
                });
                */

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

    schermata(){
        this.controls.autoRotate = false;

        if(this.camera.position.y > -5)
        {
            this.controls.target.y -=0.03;
            this.camera.position.y -= 0.03;
            this.camera.position.x -= 0.06;  
        }
    }

    splash(){
        if(this.camera.position.y > 0.5)
        {
            this.camera.position.y -= 0.04;
            this.camera.position.x -= 0.06;
        }
        else
        {
            this.controls.maxPolarAngle = Math.PI / 2;
            this.setState({intro:1});
        }
    }

    menu(){
        this.controls.autoRotate = this.state.moving;
        this.controls.autoRotateSpeed = -0.4
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.renderer.render(this.scene, this.camera);

        if(this.state.intro === 0)
            this.splash();
        else if(this.state.intro === 1)
            this.menu();
        else if(this.state.intro === 2)
            this.schermata();

        this.lookAtCamera();
        this.processClosest();
        this.rotateToTarget();

        this.interaction.update();
        this.controls.update();
    }

    animateParticles = () => {
        requestAnimationFrame(this.animateParticles);
    }

    handleWindowResize1 = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    render() {  
        const s = this.state.opacity;

        return (
            <div id="render" style={{opacity:s} }>
                <div
                    ref={mount => {
                        this.mount = mount;
                    }} />
            </div>

        )
    }

    rotateToTarget(){
        if(this.closest){
            //console.log(Math.floor(this.angle));
            
            if(Math.floor(this.angle)!==0){
                if(Math.floor(this.angle>0)){
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