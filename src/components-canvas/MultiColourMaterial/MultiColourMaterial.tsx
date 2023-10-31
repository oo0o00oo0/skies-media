import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.frag";
import { extend } from "@react-three/fiber";

import shaderMaterial from "@lib/dreiShaderMaterial";

const MultiColourShader = shaderMaterial(
  {
    uTexture: { value: THREE.Texture },
    uNextTexture: { value: THREE.Texture },
    uMask: { value: THREE.Texture },

    uBlend: 0.0,
  },
  vertex,
  fragment,
  () => console.log("init shader")
);

extend({ MultiColourShader });

interface Props {
  mask: THREE.Texture;
}

const MultiColourMaterial = React.forwardRef(({ mask }: Props, ref) => {
  const shaderRef = React.useRef<any>();

  const updateShader = (value, textures) => {
    const index = {
      value: Math.floor(value),
    };

    shaderRef.current.uniforms.uTexture.value = textures[index.value % 6];

    shaderRef.current.uniforms.uNextTexture.value =
      textures[(index.value + 1) % 6];
    shaderRef.current.uniforms.uBlend.value = value - index.value;
  };

  React.useImperativeHandle(ref, () => ({
    updateShader,
  }));

  return (
    // @ts-ignore
    <multiColourShader
      glslVersion={THREE.GLSL3}
      uMask={mask}
      transparent={true}
      ref={shaderRef}
      toneMapped={false}
    />
  );
});

export default MultiColourMaterial;
