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

  // vec2 uvMult = vec2(vUv.x * 2.0, vUv.y * 4.0);
  vec2 uvMult = fract(vec2(vUv.x * 2.0, vUv.y * 4.0));

  vec2 atlas_pos_0 = vec2(uvMult.x * xScale + uOffset_0.x, uvMult.y * yScale + uOffset_0.y);
  vec2 atlas_pos_1 = vec2(uvMult.x * xScale + uOffset_1.x, uvMult.y * yScale + uOffset_1.y);

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
