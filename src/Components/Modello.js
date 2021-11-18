import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Component } from 'react'
import { Environment, OrbitControls } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Iphone({ ...props }) {
    const iphone = useRef()
    //const iphone = useLoader(GLTFLoader, 'assets/scene.gltf')
    // Take care of cursor state on hover


    const [clicked, click] = useState(false)
    // Make it float in the air when it's opened
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        state.camera.lookAt(0, 0, 0)
        iphone.current.rotation.x = THREE.MathUtils.lerp(iphone.current.rotation.x, Math.cos(t / 2) / 8 + 0.25, 0.1)
        iphone.current.rotation.y = THREE.MathUtils.lerp(iphone.current.rotation.y, Math.sin(t / 4) / 4, 0.1)
        iphone.current.rotation.z = THREE.MathUtils.lerp(iphone.current.rotation.z, Math.sin(t / 4) / 4, 0.1)
        iphone.current.position.y = THREE.MathUtils.lerp(iphone.current.position.y, (-2 + Math.sin(t)) / 3, 0.1)
    })

    return (
        <mesh

            {...props}
            ref={iphone}
            onClick={(event) => click(!clicked)}>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhongMaterial attach='material' color={clicked ? 'red' : '#f3f3f3'} wireframe='true'/>

        </mesh>

    );
};

export default class Modello extends Component {
    render() {
        return (
            <div className="App">
                <Canvas>
                    <Iphone position={[0, 0, 0]}/>
                    <ambientLight position={[10,0,5]} />
                    <OrbitControls />
                </Canvas>
            </div>
        )
    }
};