// #version 300 es

precision mediump float;

uniform float uBlend;
uniform float uDispFactor;
uniform sampler2D uDisplaceTexture;
uniform float uMix;

uniform sampler2D uTexture;
uniform sampler2D uNextTexture;

uniform vec2 uUV_0;
uniform vec2 uUV_1;

uniform vec2 uOffset_0;
uniform vec2 uOffset_1;

uniform sampler2D uMask;

in vec2 vUv;

layout(location = 0) out vec4 fragColor;

#define xScale 0.25
#define yScale 0.5

void main() {

  vec2 atlas_pos_0 = vec2(vUv.x * uUV_0.x + uOffset_0.x, vUv.y * uUV_0.y + uOffset_0.y);
  vec2 atlas_pos_1 = vec2(vUv.x * uUV_1.x + uOffset_1.x, vUv.y * uUV_1.y + uOffset_1.y);

  atlas_pos_0 = fract(atlas_pos_0);
  atlas_pos_1 = fract(atlas_pos_1);

  vec4 texture_0_pos_0 = texture(uTexture, atlas_pos_0);
  vec4 texture_1_pos_0 = texture(uNextTexture, atlas_pos_1);

  vec4 texture_0 = mix(texture_0_pos_0, texture_1_pos_0, uBlend);

  vec4 texture_0_pos_1 = texture(uTexture, atlas_pos_0);
  vec4 texture_1_pos_1 = texture(uNextTexture, atlas_pos_1);

  vec4 texture_1 = mix(texture_0_pos_1, texture_1_pos_1, uBlend);

  // vec4 finalTexture = LinearTosRGB(mix(texture_0, texture_1, uBlend));
  vec4 finalTexture = mix(texture_0, texture_1, uBlend); // This will switch between the textures based on uBlend

  fragColor = vec4(finalTexture.xyz, 1.);
}
