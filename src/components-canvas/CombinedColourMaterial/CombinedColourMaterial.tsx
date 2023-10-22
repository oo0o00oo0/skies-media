import React from "react";
import * as THREE from "three";
//@ts-ignore
import vertex from "./glsl/vertex.glsl";
//@ts-ignore
import fragment from "./glsl/fragment.glsl";
import { extend, useThree } from "@react-three/fiber";

import shaderMaterial from "@lib/dreiShaderMaterial";
import { updateShader } from "@lib/shaderUtils";

type Props = {
  textures: any[];
  value: number;
};

const CombinedColourShader = shaderMaterial(
  {
    uDisplaceTexture: { value: THREE.Texture },
    uTextureAtlas: { value: THREE.Texture },
    uTexture: { value: THREE.Texture },
    uNextTexture: { value: THREE.Texture },
    uDispFactor: { value: 0.0 },
    uBlend: 0.0,
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

  const { textures, value } = props;

  const shaderRef = React.useRef<any>();

  React.useEffect(() => {
    updateShader(shaderRef.current, {
      textures: textures,
      value,
    });
    invalidate();
  }, [invalidate, textures, value]);

  return (
    // @ts-ignore
    <combinedColourShader
      transparent={true}
      ref={shaderRef}
      toneMapped={false}
    />
  );
};

export default CombinedColourMaterial;
