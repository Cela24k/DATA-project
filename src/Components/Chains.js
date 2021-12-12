import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";

class Chains extends GLTFLoader
{
    
    constructor(scene)
    {
        super()
        this.load("chain/scene.gltf",(gltf)=>{
            this.chain = gltf.scene.children.find((mesh) => mesh.name==='Mesh');
            const geometry = this.chain.geometry.clone();

        });
        
        

    }
        
}