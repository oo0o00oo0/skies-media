import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.frag";
import { extend } from "@react-three/fiber";

import shaderMaterial from "@lib/dreiShaderMaterial";
// import { updateShader } from "@lib/shaderUtils";

type Props = {
  disp: THREE.Texture;
  mask: THREE.Texture;
  textures: THREE.Texture[];
};

const MultiCellShader = shaderMaterial(
  {
    //

    uTextures: { value: [] },
    uDisplaceTexture: { value: THREE.Texture },
    uTextureAtlas: { value: THREE.Texture },
    uTexture: { value: THREE.Texture },
    uNextTexture: { value: THREE.Texture },
    uTexture_1: { value: THREE.Texture },
    uNextTexture_1: { value: THREE.Texture },
    uMask: { value: THREE.Texture },
    uDispFactor: { value: 0.0 },
    uBlend: 0.0,
    uTime: { value: 0.0 },

    uUV_0: { value: THREE.Vector2 },
    uUV_1: { value: THREE.Vector2 },

    uOffset: { value: 0.0 },
    uColor: new THREE.Color(),
  },
  vertex,
  fragment,
  () => console.log("init shader")
);

extend({ MultiCellShader });

const MultiCellMaterial = React.forwardRef(
  ({ disp, textures, mask }: Props, ref) => {
    const shaderRef = React.useRef<any>();

    const updateShader = ({ INDEX_0, INDEX_1 }, blendFactor) => {
      shaderRef.current.uniforms.uTexture.value = textures[INDEX_0];
      shaderRef.current.uniforms.uNextTexture.value = textures[INDEX_1];
      shaderRef.current.uniforms.uBlend.value = blendFactor;
    };

    React.useImperativeHandle(ref, () => ({
      updateShader,
    }));
    return (
      // @ts-ignore
      <multiCellShader
        side={THREE.DoubleSide}
        glslVersion={THREE.GLSL3}
        uTime={0.0}
        uDisplaceTexture={disp}
        uTexture={textures[0]}
        uNextTexture={textures[1]}
        // uTextures={textures.slice(0, 12)}
        uMask={mask}
        uUV_0={new THREE.Vector2(1.0, 1.0)}
        uUV_1={new THREE.Vector2(1.0, 1.0)}
        transparent={true}
        ref={shaderRef}
        toneMapped={false}
      />
    );
  }
);

export default MultiCellMaterial;
