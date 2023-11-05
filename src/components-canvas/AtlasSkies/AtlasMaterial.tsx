import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.frag";
import { extend, useThree } from "@react-three/fiber";

import shaderMaterial from "@lib/dreiShaderMaterial";
import { useTexture } from "@react-three/drei";

type Props = {
  value: number;
};

const AtlasShader = shaderMaterial(
  {
    uDisplaceTexture: { value: THREE.Texture },
    uTexture: { value: THREE.Texture },
    uNextTexture: { value: THREE.Texture },
    uMask: { value: THREE.Texture },
    uBlend: 0.0,

    uGridSize_0: { value: THREE.Vector2 },
    uGridSize_1: { value: THREE.Vector2 },

    uUV_0: { value: THREE.Vector2 },
    uUV_1: { value: THREE.Vector2 },
    uOffset_0: { value: THREE.Vector2 },
    uOffset_1: { value: THREE.Vector2 },
  },
  vertex,
  fragment,
  () => console.log("init shader")
);

extend({ AtlasShader });

const AtlasMaterial = (props: Props) => {
  const { invalidate } = useThree();

  // const t = useLoader(THREE.TextureLoader, [
  //   "/atlas/atlas_01.jpg",
  //   "/atlas/atlas_02.jpg",
  // ]);

  const t = useTexture(["/atlas/atlas_01.jpg", "/atlas/atlas_02.jpg"]);
  // const t2 = useLoader(THREE.TextureLoader, "/atlas/atlas_02.jpg");

  // t.colorSpace = THREE.LinearSRGBColorSpace;
  // t2.colorSpace = THREE.LinearSRGBColorSpace;

  const { value } = props;

  const shaderRef = React.useRef<any>();
  const [textures] = React.useState([...t]);

  React.useLayoutEffect(() => {
    updateShader(shaderRef.current, {
      textures: textures,
      value,
    });
    invalidate();
  }, [invalidate, textures, value]);

  return (
    // @ts-ignore
    <atlasShader
      ref={shaderRef}
      glslVersion={THREE.GLSL3}
      uTexture={t}
      uNextTexture={t}
      // uMask={mask}
      transparent={true}
      toneMapped={true}
    />
  );
};

export default AtlasMaterial;

const gridSizes = [
  // [1, 1],
  // [4, 4],
  // [1, 2],
  // [4, 2],
  [1, 1],
  [2, 2],
  [4, 4],
  [2, 4],
];

const uvOffset = [
  // [0.0, 0.0],
  // [2 / 16, 2 / 3],
  // [1 / 16, 1 / 3],
  [0, 0],
  [1 / 16, 1 / 2],
  // [0, 1 / 3],
];

const updateShader = (shader: THREE.ShaderMaterial, { textures, value }) => {
  const index = Math.floor(value);

  shader.uniforms.uBlend.value = value - index;

  shader.uniforms.uTexture.value = textures[index % textures.length];
  shader.uniforms.uNextTexture.value = textures[(index + 1) % textures.length];

  shader.uniforms.uGridSize_0.value = new THREE.Vector2(
    ...gridSizes[index % gridSizes.length]
  );
  shader.uniforms.uGridSize_1.value = new THREE.Vector2(
    ...gridSizes[(index + 1) % gridSizes.length]
  );

  ////

  shader.uniforms.uOffset_0.value = new THREE.Vector2(
    ...uvOffset[index % uvOffset.length]
  );
  shader.uniforms.uOffset_1.value = new THREE.Vector2(
    ...uvOffset[(index + 1) % uvOffset.length]
  );
};
