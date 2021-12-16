import * as THREE from "three"
import React, { Component } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DoubleSide } from "three";
//import { RGBELoader } from "three/examples/js/loaders/RGBELoader.js"

class ThreeScene extends Component {

    componentDidMount() {
        this.objects = [];

        this.loader = new GLTFLoader();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerWidth, 0.1, 1000);
        this.camera.position.x = 6.5;
        this.camera.position.y = 0.1;
        this.camera.rotation.x += 0;
        this.camera.rotation.y -= 0;

        this.light = new THREE.AmbientLight("white", 1);

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

        //this.controls.enableZoom = false;
        this.controls.rotateSpeed = 0.25;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;


        this.loadCards()
        this.envLight()
        this.scene.add(this.camera);
        this.camera.add(this.cube)
        this.camera.add(this.triangle)
        //this.scene.add(this.cube);
        //this.scene.add(this.triangle);
        this.scene.add(this.light);
        this.animation();

        this.renderer.render(this.scene, this.camera);

        window.addEventListener("resize", this.handleWindowResize1);
    }

    //FINE PREAMBOLO

    //Fare in modo che la carta piu vicina si avvicini ulteriormente quando premuta e possa venire ruotata
    //fare in modo che le carte guardino la camera
    loadCards() {
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
        const scene = this.scene
        const obj = this.objects

        //todo fare con ogni file della cartella
        const count = 20;

        for (let i = 0; i < count; i++) {    
            loader.load(
                "nfts/test_image"+i.toString()+".png",
                function (texture) {
                    const material = new THREE.MeshBasicMaterial({
                        color: "white",
                        map: texture,
                        side: THREE.DoubleSide
                    });
                    console.log(texture)
                    const mesh = new THREE.Mesh(geometry, material);

                    const t = i / count * 2 * Math.PI;

                    mesh.position.x = Math.cos(t) * 4;
                    mesh.position.z = Math.sin(t) * 4;
                    scene.add(mesh);
                    obj.push(mesh);
                },
                undefined,
                function (err) {
                    console.error('An error happened.');
                }
            )

            
        }
    }
    deprecatedModels() {
        this.loader.load('SuperG2.glb', (gltf) => {

            gltf.scene.scale.set(0.1, 0.1, 0.1)
            this.scene.add(gltf.scene)

        }, undefined, function (error) {

            console.error(error);

        });
        this.loadModels()
    }
    envLight() {
        //this.dlight = new THREE.DirectionalLight(0x95a4b3, 15);
        this.dlight = new THREE.AmbientLight("white", 1);
        this.dlight.position.set(0, 0, 1);
        this.dlight.castShadow = true;
        this.scene.add(this.dlight)
    }

    lookAtCamera()
    {
        const objects = this.objects
        const camera = this.camera;

        objects.forEach(function(obj){
            obj.lookAt(camera.position)
        })
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.cube.rotation.x += 0.001
        this.cube.rotation.y += 0.0005
        this.triangle.rotation.x -= 0.001
        this.triangle.rotation.y -= 0.0005
        this.renderer.render(this.scene, this.camera);
        this.lookAtCamera()
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

const material = new THREE.MeshPhysicalMaterial({
    roughness: 0,
    transmission: 1,
    thickness: 0.5
});



export default ThreeScene;