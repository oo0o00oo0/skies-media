import React from "react";
import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Vector3 } from "three";
import CombinedColourPlane from "../CombinedColourPlane/CombinedColourPlane";
import styled from "styled-components";

type Props = {
  urls: string[];
  value: number;
  save: boolean;
};

function CanvasMain({ urls, value, save }: Props) {
  return (
    <Wr>
      <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }} flat>
        <OrthographicCamera zoom={1} position={new Vector3(0, 0, 1)} />
        <Suspense fallback={null}>
          <CombinedColourPlane save={save} value={value} urls={urls} />
          <SaveFile save={save} value={value} />
        </Suspense>
      </Canvas>
    </Wr>
  );
}

export default CanvasMain;

const saveFile = (gl: any, scene: any, camera: any, count: any) => {
  gl.render(scene, camera);
  const image = gl.domElement.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = image;
  a.download = "frame_" + count + ".png"; // where frameNumber is the current frame number
  a.click();
};

const SaveFile = ({ value, save }) => {
  const { gl, scene, camera } = useThree();

  React.useEffect(() => {
    if (save) saveFile(gl, scene, camera, value);
  }, [save, value, gl, scene, camera]);
  return null;
};

const Wr = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  border: #ededed solid 2px;
  box-sizing: border-box;

  width: 600px;
  height: 85vh;
`;
