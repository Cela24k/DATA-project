import * as THREE from "three"
import React, { Component } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Reflector } from "three/examples/jsm/objects/Reflector"
import { Mesh } from "three";
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

        this.camera = new THREE.PerspectiveCamera(50, window.innerHeight / window.innerWidth, 0.1, 1000);
        this.camera.position.x = 6;
        this.camera.position.y = 0.5;
        this.camera.rotation.x += 0;
        this.camera.rotation.y -= 0;


        this.light = new THREE.AmbientLight("white", 1);

        window.addEventListener("load", this.handleWindowResize1());
        var geometry = new THREE.BoxGeometry(10, 10, 10);
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
        //this.controls.minPolarAngle = Math.PI/2-0.2;
        this.controls.maxPolarAngle = Math.PI / 2;

        this.deprecatedModels();
        this.loadCards()
        this.flip90()
        this.addPlane()

        this.envLight()
        this.scene.add(this.camera);
        //this.camera.add(this.cube)
        //this.camera.add(this.triangle)

        this.scene.add(this.light);
        this.animation();

        this.renderer.render(this.scene, this.camera);

        window.addEventListener("resize", this.handleWindowResize1);
    }

    //FINE PREAMBOLO

    //MeshPhysicalMaterial clearcoat effetto shiny
    //logo che cade dall'alto; logo che gira 
    //aggiungere logo che gira in mezzo al cerchio di carte
    //aggiugere radio in mezzo alle carte
    //provare ad aggiungere il fade dello sfondo
    //fare animazione in entrata delle carte
    //aggiungere riflesso al piano
    //Fare in modo che venga fuori il nome del file selezionato in alto a dx
    //Fare in modo che la carta piu vicina si avvicini ulteriormente quando premuta e possa venire ruotata
    loadCards() {
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
        const scene = this.scene
        const obj = this.objects
        //todo fare con ogni file della cartella
        const count = 20;

        for (let i = 0; i < count; i++) {
            loader.load(
                "nfts/test_image" + i.toString() + ".png",
                function (texture) {
                    const material = new THREE.MeshBasicMaterial({
                        color: "white",
                        map: texture,
                        side: THREE.DoubleSide
                    });
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

    addPlane() {
        var planeGeometry = new THREE.PlaneBufferGeometry(15, 15)
        var glass = new THREE.PlaneBufferGeometry(15, 15,100,100)
        this.glass = new Mesh(glass, planeMat)
        planeMat.transparent=true;

        this.plane = new Reflector(planeGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: "0x777777",
            recursion: 4,
            antialias:true,

        })

        this.glass.position.y -= 0.499
        this.glass.rotateX(-Math.PI / 2)
        this.plane.rotateX(-Math.PI / 2)
        this.plane.position.y -= 0.5
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
        //this.dlight = new THREE.DirectionalLight(0x95a4b3, 15);
        this.dlight = new THREE.AmbientLight("white", 1);
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

    flip90() {
        const objects = this.objects
        const camera = this.camera;
        var selected = 0;
        let distance = 0;

        objects.forEach(function (obj) {
            const localdistance = obj.position.distanceTo(camera.position)
            if (localdistance > distance) {
                distance = localdistance;
                selected = objects.indexOf(obj)
            }
        })

        try {
            if (objects.at(selected - 10))
                objects.at(selected - 10).rotation.z += Math.PI;
        }
        catch (error) {
            console.error(error)
        }
        console.log(selected)
        //selected.rotation.x = Math.PI;

        //this.findClosest()
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.cube.rotation.x += 0.001
        this.cube.rotation.y += 0.0005
        this.triangle.rotation.x -= 0.001
        this.triangle.rotation.y -= 0.0005
        this.renderer.render(this.scene, this.camera);
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -0.4

        this.lookAtCamera();
        this.flip90();

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
    color:"grey",
    roughness: 1,
    transmission: 0.8,
    thickness:0.5
});

const planeMat = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color:"black",
    opacity:0.67,
})

export default ThreeScene;