import React from "react";
import { useThree } from "@react-three/fiber";

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

export default SaveFile;
