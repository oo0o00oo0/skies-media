import { meshData, MASK_UVS, UVARRAY } from "@data/meshData";
import { useThree } from "@react-three/fiber";
import React from "react";
import MultiColourMaterial from "../MultiColourMaterial/MultiColourMaterial";
import { useTexture } from "@react-three/drei";
import { purps } from "@data/purps";
import { blues } from "@data/blues";
import { quadFiles } from "@data/quad";

// import { shuffle } from "lodash-es";

interface MeshElementProps {
  data: {
    ids: number[];
    position: number[];
  };
  url: string;
  mask: THREE.Texture;
  maskUVs: number[];
}
const MultiColorPlane = ({ urls, value }) => {
  const { viewport, invalidate } = useThree();

  // const mut = [...urls];

  const textures = useTexture(urls);
  const t = useTexture(urls);
  const p = useTexture(purps.map((p) => `/sets/${p}`));
  const b = useTexture(blues.map((p) => `/sets/${p}`));
  const quad = useTexture(quadFiles.map((p) => `/sets/${p}`));

  const c = useTexture(
    new Array(urls.length).fill(`images/skies/sky.arena_45.jpg`)
  );
  const g = useTexture(
    new Array(urls.length).fill(`images/skies/sky.arena_88.jpg`)
  );

  const refs = meshData.map(() => React.createRef<any>());

  React.useEffect(() => {
    refs.forEach((ref, i) => {
      ref.current.updateBuffer(
        value,
        // shuffled[i % shuffled.length],
        [c[i], p[i], quad[i], b[i], g[i], b[i]],
        UVARRAY[i],
        i
      );
    });
    invalidate();
  }, [invalidate, value, refs, textures, c, t, g, p, b]);

  const mask = useTexture("/images/mask.jpg");

  return (
    <group
      // scale={[viewport.height, viewport.height, viewport.height]}

      rotation-z={Math.PI * -0.5}
      scale={[viewport.width, viewport.width, viewport.width]}
    >
      {meshData.map((data, i) => (
        <MeshElement
          mask={mask}
          maskUVs={MASK_UVS[i]}
          ref={refs[i]}
          url={urls[i]}
          key={i}
          data={data}
        />
      ))}
    </group>
  );
};

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
            attach="attributes-uv_big"
            array={Float32Array.from(maskUVs)}
            count={maskUVs.length}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-uv"
            array={Float32Array.from(maskUVs)}
            count={maskUVs.length}
            itemSize={2}
          />
          <bufferAttribute
            attach="attributes-uvNext"
            array={Float32Array.from(maskUVs)}
            count={maskUVs.length}
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
