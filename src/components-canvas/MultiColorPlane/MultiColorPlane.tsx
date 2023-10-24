import { meshData, MASK_UVS, UV_1, UVARRAY } from "@data/meshData";
import { useThree } from "@react-three/fiber";
import React from "react";
import MultiColourMaterial from "../MultiColourMaterial/MultiColourMaterial";
import { useTexture } from "@react-three/drei";
import { shuffle } from "lodash-es";

const MultiColorPlane = ({ urls, value }) => {
  const { viewport, invalidate } = useThree();

  const textures = useTexture(urls);

  const [shuffled] = React.useState([
    shuffle(textures),
    shuffle(textures),
    shuffle(textures),
    shuffle(textures),
  ]);

  const refs = meshData.map(() => React.createRef<any>());

  React.useEffect(() => {
    refs.forEach((ref, i) => {
      ref.current.updateBuffer(value, shuffled[i], UVARRAY[i]);
    });
    invalidate();
  }, [invalidate, value, refs, textures, shuffled]);

  const mask = useTexture("/images/mask.jpg");

  return (
    <group scale={viewport.height}>
      {meshData.map((data, i) => (
        <MeshElement
          mask={mask}
          maskUVs={MASK_UVS[i]}
          ref={refs[i]}
          url={urls[i]}
          key={i}
          data={data}
          uv={UV_1[i]}
        />
      ))}
    </group>
  );
};

interface MeshElementProps {
  data: {
    ids: number[];
    position: number[];
  };
  url: string;
  uv: number[];
  mask: THREE.Texture;
  maskUVs: number[];
}

const MeshElement = React.forwardRef(
  ({ data, mask, maskUVs }: MeshElementProps, ref) => {
    const geoRef = React.useRef<any>(null);
    const shaderRef = React.useRef<any>(null);

    const updateBuffer = (value, textures, UVARRAY) => {
      const index = {
        value: Math.floor(value),
      };

      const uvAttribute = geoRef.current.attributes.uv;
      uvAttribute.set(Float32Array.from(UVARRAY[index.value % UVARRAY.length]));
      uvAttribute.needsUpdate = true;

      const uvNextAttribute = geoRef.current.attributes.uvNext;
      uvNextAttribute.set(
        Float32Array.from(UVARRAY[(index.value + 1) % UVARRAY.length])
      );
      uvNextAttribute.needsUpdate = true;
      shaderRef.current.updateShader(value, textures);
    };

    React.useImperativeHandle(ref, () => ({
      updateBuffer,
    }));

    return (
      <mesh>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute
            attach="attributes-position"
            array={Float32Array.from(data.position)}
            count={data.position.length / 3}
            itemSize={3}
          />

          <bufferAttribute
            attach="index"
            array={Uint16Array.from(data.ids)}
            count={data.ids.length}
            itemSize={1}
          />

          <bufferAttribute
            attach="attributes-uv"
            array={Float32Array.from(UV_1[0])}
            count={UV_1[0].length}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-uvNext"
            array={Float32Array.from(UV_1[0])}
            count={UV_1[0].length}
            itemSize={2}
          />

          <bufferAttribute
            attach="attributes-uvMask"
            array={Float32Array.from(maskUVs)}
            count={maskUVs.length}
            itemSize={2}
          />
        </bufferGeometry>
        <MultiColourMaterial mask={mask} ref={shaderRef} />
      </mesh>
    );
  }
);

export default MultiColorPlane;
