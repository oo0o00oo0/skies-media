import React from "react";
import { fileNames } from "@data/fileNames";
import { meshDataCells } from "@data/meshData-multi-cell";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
// import React from "react";
import MultiCellMaterial from "./MultiCellMaterial/MultiCellMaterial";
import { cell_data, cell_data_1 } from "./multi-cell-data";
import { shuffle } from "lodash-es";

const MultiCell = ({ value }) => {
  const { viewport } = useThree();

  const URLS = fileNames.map((fileName) => `/images/skies/${fileName}.jpg`);
  const mask = useTexture("/images/mask.jpg");

  const skies = useTexture(URLS);

  const [t] = React.useState<any[]>(shuffle(skies));
  return (
    <group scale={[viewport.height, viewport.height, viewport.height]}>
      {meshDataCells.map((data, i) => (
        <Cell
          mask={mask}
          value={value}
          key={i}
          data={data}
          disp={t[0]}
          image={t[0]}
          UVARRAY={[data.uv_0, data.uv_1, data.uv_fill]}
          nextImage={t[cell_data[i]]}
          nextImage2={t[cell_data_1[i]]}
        />
      ))}
    </group>
  );
};

const Cell = ({
  data,
  image,
  nextImage,
  nextImage2,
  disp,
  value,
  UVARRAY,
  mask,
}) => {
  const ref = React.useRef<any>();
  const geoRef = React.useRef<any>();

  const { invalidate } = useThree();

  React.useEffect(() => {
    const steps = UVARRAY.length;

    const index = Math.floor(value * steps);

    const INDEX_0 = index % steps;
    const INDEX_1 = (index + 1) % steps;

    const uvAttribute = geoRef.current.attributes.uv;
    uvAttribute.set(Float32Array.from(UVARRAY[INDEX_0]));
    uvAttribute.needsUpdate = true;

    const uvNextAttribute = geoRef.current.attributes.uvNext;
    uvNextAttribute.set(Float32Array.from(UVARRAY[INDEX_1]));
    uvNextAttribute.needsUpdate = true;

    const blendFactor = value * steps - index;

    ref.current.updateShader(
      {
        INDEX_0,
        INDEX_1,
      },

      blendFactor
    );

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
          array={Float32Array.from(data.uv_fill)}
          count={data.uv_fill.length}
          itemSize={2}
        />
        <bufferAttribute
          attach="attributes-uvNext"
          array={Float32Array.from(data.uv_fill)}
          count={data.position.length}
          itemSize={2}
        />
        <bufferAttribute
          attach="attributes-uvFill"
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
      </bufferGeometry>
      <MultiCellMaterial
        mask={mask}
        textures={[nextImage2, nextImage, image]}
        ref={ref}
        disp={disp}
      />
    </mesh>
  );
};
export default MultiCell;
