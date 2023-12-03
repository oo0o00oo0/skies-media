// import React from 'react'

import { fileNames } from "@data/fileNames";
import { meshDataCells } from "@data/meshData-multi-cell";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
// import React from "react";
import MultiCellMaterial from "./MultiCellMaterial/MultiCellMaterial";
import { cell_data } from "./multi-cell-data";

const MultiCell = () => {
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
          key={i}
          data={data}
          disp={skies[0]}
          image={skies[0]}
          // image={skies[cell_data[i]]}
          nextImage={skies[cell_data[i]]}
        />
      ))}
    </group>
  );
};

const Cell = ({ data, image, nextImage, disp }) => {
  return (
    <mesh>
      <bufferGeometry>
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
          attach="attributes-uvfill"
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
      <MultiCellMaterial image={image} nextImage={nextImage} disp={disp} />
    </mesh>
  );
};
export default MultiCell;
