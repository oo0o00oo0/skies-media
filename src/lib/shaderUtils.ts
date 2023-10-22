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
};
