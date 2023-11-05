import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.frag";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { shuffle } from "lodash-es";

import shaderMaterial from "@lib/dreiShaderMaterial";

type Props = {
  textures: any[];
  value: number;
  mask: THREE.Texture;
};

const AtlasShader = shaderMaterial(
  {
    uDisplaceTexture: { value: THREE.Texture },
    uTexture: { value: THREE.Texture },
    uNextTexture: { value: THREE.Texture },
    uMask: { value: THREE.Texture },
    uBlend: 0.0,

    uOpacity_0: { value: 0.0 },
    uOpacity_1: { value: 0.0 },

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

  const t = useLoader(THREE.TextureLoader, "/atlas/atlas_01.jpg");
  const t2 = useLoader(THREE.TextureLoader, "/atlas/atlas_02.jpg");

  t.colorSpace = THREE.LinearSRGBColorSpace;
  t2.colorSpace = THREE.LinearSRGBColorSpace;

  const textures = [t, t2];

  const { value } = props;

  const shaderRef = React.useRef<any>();

  React.useEffect(() => {
    updateShader(shaderRef.current, {
      textures: textures,
      value,
    });
    invalidate();
  }, [invalidate, value]);

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

const uvOffset = [
  [0.0, 0.5],
  [0.0, 0.5],
  [0.25, 0.5],
  [0.25, 0.5],
  [0.5, 0.5],
  [0.5, 0.5],
  [0.75, 0.5],
  [0.75, 0.5],
];

const offset = [0, 1];

export const updateShader = (
  shader: THREE.ShaderMaterial,
  { textures, value }
) => {
  const index = {
    value: Math.floor(value),
  };

  shader.uniforms.uBlend.value = value - index.value;

  shader.uniforms.uTexture.value = textures[index.value % textures.length];
  shader.uniforms.uNextTexture.value =
    textures[(index.value + 1) % textures.length];

  shader.uniforms.uOpacity_0.value = offset[index.value % offset.length];
  shader.uniforms.uOpacity_1.value = (index.value + 1) % offset.length;

  shader.uniforms.uOffset_0.value = new THREE.Vector2(
    ...uvOffset[index.value % uvOffset.length]
  );
  shader.uniforms.uOffset_1.value = new THREE.Vector2(
    ...uvOffset[(index.value + 1) % uvOffset.length]
  );
};
