import React from "react";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Vector3 } from "three";
import styled from "styled-components";
import SaveFile from "../SaveFile/SaveFile";
import AtlasSkies from "../AtlasSkies/AtlasSkies";
// import ShaderSkies from "../ShaderSkies/ShaderSkies";
// import MultiColorPlane from "../MultiColorPlane/MultiColorPlane";
// import CombinedColourPlane from "../CombinedColourPlane/CombinedColourPlane";

type Props = {
  value: number;
  save: boolean;
};

function CanvasMain({ value, save }: Props) {
  const wrRef = React.useRef<HTMLDivElement>(null);

  return (
    <Wr ref={wrRef}>
      <Canvas
        dpr={window.devicePixelRatio}
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        flat
      >
        <OrbitControls />
        <OrthographicCamera zoom={1} position={new Vector3(0, 0, 1)} />
        <Suspense fallback={null}>
          {/* <ShaderSkies /> */}
          <AtlasSkies value={value} />
          {/* <CombinedColourPlane save={save} value={value} urls={urls} /> */}
          {/* <MultiColorPlane value={value} /> */}
          <SaveFile save={save} value={value} />
        </Suspense>
      </Canvas>
    </Wr>
  );
}

export default CanvasMain;

const Wr = styled.div`
  canvas {
    border: orange solid 1px;
  }
  /* width: 3448px; */
  /* height: 1080px; */
  flex-grow: 1;
  width: 100vw;
  height: 100%;
`;
