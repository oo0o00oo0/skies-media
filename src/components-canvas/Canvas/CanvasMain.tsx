import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Vector3 } from "three";
import CombinedColourPlane from "../CombinedColourPlane/CombinedColourPlane";
import styled from "styled-components";
import SaveFile from "../SaveFile/SaveFile";

type Props = {
  urls: string[];
  value: number;
  save: boolean;
};

function CanvasMain({ urls, value, save }: Props) {
  return (
    <Wr>
      <CanvasWrapper>
        <Canvas
          //
          frameloop="demand"
          //
          gl={{ preserveDrawingBuffer: true }}
          flat
        >
          <OrthographicCamera zoom={1} position={new Vector3(0, 0, 1)} />
          <Suspense fallback={null}>
            <CombinedColourPlane save={save} value={value} urls={urls} />
            <SaveFile save={save} value={value} />
            {/* <Perf /> */}
          </Suspense>
        </Canvas>
      </CanvasWrapper>
    </Wr>
  );
}

export default CanvasMain;

const CanvasWrapper = styled.div`
  height: 100%;
  min-height: 70vh;
  height: 70vh;
  border: #8b8b8b solid 2px;
`;

const Wr = styled.div`
  flex-shrink: 1;
  padding: 20px;
`;
