import { Vector2 } from "three";

const test = [
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 2],
  [2, 4],
  [4, 4],
  [4, 4],
  [3, 4],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
];

export const updateShader = (
  shader: THREE.ShaderMaterial,
  { textures, value }
) => {
  const index = {
    value: Math.floor(value),
  };

  shader.uniforms.uBlend.value = value - index.value;

  shader.uniforms.uTexture.value = textures[index.value % textures.length];

  shader.uniforms.uNextTexture.value =
    textures[(index.value + 1) % textures.length];

  shader.uniforms.uUV_0.value = new Vector2(...test[index.value % test.length]);
  shader.uniforms.uUV_1.value = new Vector2(
    ...test[(index.value + 1) % test.length]
  );
};
