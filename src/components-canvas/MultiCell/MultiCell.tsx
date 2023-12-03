import React from "react";
import { fileNames } from "@data/fileNames";
import { meshDataCells } from "@data/meshData-multi-cell";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
// import React from "react";
import MultiCellMaterial from "./MultiCellMaterial/MultiCellMaterial";
import { cell_data } from "./multi-cell-data";

const MultiCell = ({ value }) => {
  const { viewport } = useThree();

  const URLS = fileNames.map((fileName) => `/images/skies/${fileName}.jpg`);

  const skies = useTexture(URLS);
  return (
    <group
      // rotation-y={Math.PI}
      scale={[viewport.height, viewport.height, viewport.height]}
    >
      {meshDataCells.map((data, i) => (
        <Cell
          value={value}
          key={i}
          data={data}
          disp={skies[0]}
          image={skies[58]}
          UVARRAY={[data.uv, data.uv_fill, data.uv_1]}
          // image={skies[cell_data[i]]}
          nextImage={skies[cell_data[i]]}
        />
      ))}
    </group>
  );
};

const Cell = ({ data, image, nextImage, disp, value, UVARRAY }) => {
  const ref = React.useRef<any>();

  const { invalidate } = useThree();

  const geoRef = React.useRef<any>();
  const steps = 4;
  React.useEffect(() => {
    const index = Math.floor(value * steps);

    // console.log(index);

    const uvAttribute = geoRef.current.attributes.uv;
    uvAttribute.set(Float32Array.from(UVARRAY[index % UVARRAY.length]));

    uvAttribute.needsUpdate = true;

    const uvNextAttribute = geoRef.current.attributes.uvNext;
    uvNextAttribute.set(
      Float32Array.from(UVARRAY[(index + 1) % UVARRAY.length])
    );

    uvNextAttribute.needsUpdate = true;

    ref.current.updateShader(value);

    invalidate();
  }, [UVARRAY, invalidate, value]);

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
          attach="attributes-uv"
          array={Float32Array.from(data.uv)}
          count={data.uv.length}
          itemSize={2}
        />
        <bufferAttribute
          attach="attributes-uvNext"
          array={Float32Array.from(data.uv_fill)}
          count={data.position.length}
          itemSize={2}
        />

        <bufferAttribute
          attach="index"
          array={Uint16Array.from(data.ids)}
          count={data.ids.length}
          itemSize={1}
        />

        {/* <bufferAttribute
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
      /> */}
      </bufferGeometry>
      <MultiCellMaterial
        ref={ref}
        image={image}
        nextImage={nextImage}
        disp={disp}
      />
    </mesh>
  );
};
export default MultiCell;
