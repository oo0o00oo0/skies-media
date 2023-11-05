import React from "react";
import * as THREE from "three";
// import { useFBO } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

//@ts-ignore
import vertexShader from "./glsl/vertex.vert";
//@ts-ignore
import fragmentShader from "./glsl/fragment.frag";
import { invalidate, useLoader, useThree } from "@react-three/fiber";
import { fileNames } from "@data/fileNames";

const ShaderSkies = () => {
  const mesh = React.useRef<any>();
  const urls = fileNames.map((file) => `/images/skies/${file}.jpg`);

  let { width: dim } = useThree().viewport;

  dim *= 0.9;

  // const image_0 = useLoader(THREE.TextureLoader, urls[0]);
  // const image_1 = useLoader(THREE.TextureLoader, urls[1]);

  const uniforms = React.useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uValue: {
        value: 0.0,
      },
    }),
    []
  );

  const handleMove = React.useCallback((e) => {
    mesh.current.material.uniforms.uValue.value = e.clientX / window.innerWidth;
    invalidate();
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [handleMove]);

  /////////////////////////////////////////////////////////////////////////////////////////////
  // React.useEffect(() => {
  //   fetch("http://localhost:3000/process-image", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ imagePath: "sky.arena_42.jpg" }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error sending image data:", error);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   fetch("http://localhost:3000/process-image-raw", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ imagePath: "sky.arena_42.jpg" }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const { buffer, width, height } = data;

  //       console.log(buffer);

  //       // // Convert the buffer to a Uint8Array
  //       // const array = new Uint8Array(buffer);

  //       // // Create a Three.js data texture from the buffer
  //       // const texture = new THREE.DataTexture(
  //       //   array,
  //       //   width,
  //       //   height,
  //       //   THREE.RGBAFormat
  //       // );
  //       // texture.needsUpdate = true;

  //       // Update the material's texture
  //       // mesh.current.material.uniforms.uTexture.value = texture;
  //     })

  //     .catch((error) => {
  //       console.error("Error sending image data:", error);
  //     });
  // }, []);

  React.useEffect(() => {
    fetch("http://localhost:3000/process-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagePath: "sky.arena_42.jpg" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Convert the base64 encoded string to an image
        const image = new Image();
        image.src = `data:image/jpeg;base64,${data.image}`;
        image.onload = () => {
          // Create a canvas to draw the image
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);

          // Get the image data from the canvas
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          ).data;
          console.log(imageData);

          // Create a Three.js data texture
          const texture = new THREE.DataTexture(
            new Uint8Array(imageData),
            canvas.width,
            canvas.height,
            THREE.RGBAFormat
          );
          texture.needsUpdate = true;

          mesh.current.material.uniforms.uTexture.value = texture;
        };
      })
      .catch((error) => {
        console.error("Error sending image data:", error);
      });
  }, []);

  return (
    <mesh scale={[dim, dim, dim]} ref={mesh}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default ShaderSkies;

// const mainRenderTarget = useFBO();
// useFrame((state) => {
//   const { gl, scene, camera } = state;
//   mesh.current.visible = false;
//   gl.setRenderTarget(mainRenderTarget);
//   gl.render(scene, camera);

//   mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;

//   gl.setRenderTarget(null);
//   mesh.current.visible = true;
// });
