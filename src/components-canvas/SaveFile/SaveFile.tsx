import React from "react";
import { useThree } from "@react-three/fiber";
import { Vector2 } from "three";

// const saveFile = (gl: any, scene: any, camera: any, count: any) => {
//   gl.render(scene, camera);
//   const image = gl.domElement.toDataURL("image/png");
//   const a = document.createElement("a");
//   a.href = image;
//   a.download = "frame_" + count + ".png"; // where frameNumber is the current frame number
//   a.click();
// };

// const saveFile = async (gl, scene, camera, count) => {
//   gl.render(scene, camera);
//   const image = gl.domElement.toDataURL("image/png");

//   const response = await fetch("http://localhost:3000/save-image", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ image, count }),
//   });

//   if (response.ok) {
//     console.log("Image sent to server successfully");
//   } else {
//     console.log("Failed to send image to server");
//   }
// };

const saveFile = async (gl, scene, camera, count, width, height) => {
  // Save the original size
  const originalSize = gl.getSize(new Vector2());

  // Set the desired output size
  gl.setSize(width, height, false);

  // Render the scene with the new size
  gl.render(scene, camera);

  // Convert the rendered image to data URL
  const image = gl.domElement.toDataURL("image/png");

  // Reset the size back to original
  gl.setSize(originalSize.width, originalSize.height, false);

  // Send the image to the server
  const response = await fetch("http://localhost:3000/save-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, count }),
  });

  if (response.ok) {
    console.log("Image sent to server successfully");
  } else {
    console.log("Failed to send image to server");
  }
};

const SaveFile = ({ value, save }) => {
  const { gl, scene, camera } = useThree();

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount((c) => c + 1);
  }, [value]);

  React.useEffect(() => {
    if (save) saveFile(gl, scene, camera, count, 3438, 1080); // specify desired width and height
  }, [save, gl, scene, camera, count]);

  // React.useEffect(() => {
  //   if (save) saveFile(gl, scene, camera, count);
  // }, [save, gl, scene, camera, count]);
  return null;
};

export default SaveFile;
