import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.frag";
import { extend, useThree } from "@react-three/fiber";
import { shuffle } from "lodash-es";

import shaderMaterial from "@lib/dreiShaderMaterial";
import { updateShader } from "@lib/shaderUtils";

type Props = {
  textures: any[];
  value: number;
  mask: THREE.Texture;
};

const CombinedColourShader = shaderMaterial(
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

    uUV_0: { value: THREE.Vector2 },
    uUV_1: { value: THREE.Vector2 },

    uOffset: { value: 0.0 },
    uColor: new THREE.Color(),
  },
  vertex,
  fragment,
  () => console.log("init shader")
);

extend({ CombinedColourShader });

const CombinedColourMaterial = (props: Props) => {
  const { invalidate } = useThree();

  const { textures, value, mask } = props;

  const shaderRef = React.useRef<any>();

  const [shuffled] = React.useState<any[]>(shuffle(textures));

  React.useEffect(() => {
    updateShader(shaderRef.current, {
      textures: textures,
      shuffle: shuffled,
      value,
    });
    invalidate();
  }, [invalidate, shuffled, textures, value]);

  return (
    // @ts-ignore
    <combinedColourShader
      glslVersion={THREE.GLSL3}
      // uTextures={textures.slice(0, 12)}
      uMask={mask}
      uUV_0={new THREE.Vector2(1.0, 1.0)}
      uUV_1={new THREE.Vector2(1.0, 1.0)}
      transparent={true}
      ref={shaderRef}
      toneMapped={false}
    />
  );
};

export default CombinedColourMaterial;
