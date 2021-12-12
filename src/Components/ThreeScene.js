import * as THREE from "three"
import React, { Component } from 'react'
import { BoxGeometry } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { RGBELoader } from "three/examples/js/loaders/RGBELoader.js"

class ThreeScene extends Component {

    componentDidMount() {
        this.loader = new GLTFLoader();

        this.matrix = [];

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerWidth, 0.1, 1000);
        this.camera.position.z = 0.4;
        this.camera.position.y = 0.7;
        this.camera.rotation.x += 150;
        this.camera.rotation.y -= 150;

        this.light = new THREE.AmbientLight(0x404040, 1);

        window.addEventListener("load", this.handleWindowResize1());

        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({
            color: 0xf3f3f3,
            wireframe: true
        });
        var mat_triangle = new THREE.MeshPhongMaterial({
            color: 'grey',
            wireframe: true
        })

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.rotation.y = Math.floor(Math.random() * 620) / 100;
        this.triangle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat_triangle);
        this.triangle.rotation.y = Math.floor(Math.random() * 620) / 100;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;

        this.controls.rotateSpeed = 0.25;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;

        /*
        this.loader.load( 'SuperG2.glb', ( gltf ) => {
            
            this.scene.add(gltf.scene)
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );*/
        this.loadModels()
        this.envLight()
        this.scene.add(this.camera);
        this.scene.add(this.cube);
        this.scene.add(this.triangle);
        this.scene.add(this.light);
        this.animation();

        this.renderer.render(this.scene, this.camera);

        window.addEventListener("resize", this.handleWindowResize1);
    }

    envLight() {
        this.dlight = new THREE.DirectionalLight(0x95a4b3, 15);
        this.dlight.position.set(0, 0, 1);
        this.dlight.castShadow = true;
        this.scene.add(this.dlight)
    }
    /*
    loadChains() {

        for (let index = 0; index < 100; index++) {
            this.loader.load("chain/scene.gltf", (gltf) => {

                const dragon = gltf.scene.children.find((mesh) => mesh.name === "chain_Spikes_modelling");
                //const dragon = gltf.scene.children.pop()

                // Just copy the geometry from the loaded model
                const geometry = dragon.geometry.clone();
                //const geometry = dragon.clone();

                // Adjust geometry to suit our scene
                geometry.rotateX(Math.PI / 2);
                geometry.translate(0, -4, 0);

                // Create a new mesh and place it in the scene
                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.0135, 0.0135, 0.0135);
                mesh.position.x = Math.floor(Math.random() * 100) / 100
                mesh.position.y = Math.floor(Math.random() * 100) / 100
                mesh.position.z = Math.floor(Math.random() * 100) / 100
                this.scene.add(mesh);


                // Discard the model
                dragon.geometry.dispose();
                dragon.material.dispose();
            }, undefined, function (error) {

                console.error(error);

            });
        }
    }
    */

    loadModels(){
        for (let i = 0; i < 16; i++) {
            this.loader.load('chain/scene.gltf', (gltf) => {
                this.chain=gltf.scene.clone()
                this.scene.add(gltf.scene)
                gltf.scene.scale.set(0.03,0.03,0.03)
                gltf.scene.traverse( child => {
                    if ( child.material ) child.material = material;
                });
                gltf.scene.position.x = Math.floor(Math.random() * 50) / 100;
                gltf.scene.position.y = Math.floor(Math.random() * 50) / 100;
                gltf.scene.position.z = Math.floor(Math.random() * 50) / 100;
                gltf.scene.rotation.set(Math.floor(Math.random() * 600) / 100,Math.floor(Math.random() * 200) / 100,Math.floor(Math.random() * 500) / 100)
            }, undefined, function (error) {
                console.error(error);
            })
        }
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.cube.rotation.x += 0.001
        this.cube.rotation.y += 0.0005
        this.triangle.rotation.x -= 0.001
        this.triangle.rotation.y -= 0.0005
        this.renderer.render(this.scene, this.camera);
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
        return (
            <div
                ref={mount => {
                    this.mount = mount;
                }} />
        )
    }
}


/*
const hdrEquirect = new RGBELoader().load(
    "src/empty_warehouse_01_2k.hdr",  
    () => { 
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
    }
);
*/

const material = new THREE.MeshPhysicalMaterial({
    roughness: 0,   
    transmission: 1,  
    thickness: 0.5
});



export default ThreeScene;