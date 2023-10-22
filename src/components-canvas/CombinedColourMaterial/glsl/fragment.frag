// #version 300 es

precision mediump float;

uniform float uBlend;
uniform float uDispFactor;
uniform sampler2D uDisplaceTexture;
uniform float uMix;

uniform sampler2D uTexture;
uniform sampler2D uNextTexture;

uniform sampler2D uTexture_1;
uniform sampler2D uNextTexture_1;

uniform vec2 uUV_0;
uniform vec2 uUV_1;

uniform sampler2D uMask;

// uniform sampler2D uTextures[12]; // Use a sampler2D array to hold your textures
// uniform int uTextureIndex; // Index of the texture to be used

uniform sampler2D uTextureAtlas;

in vec2 vUv;

layout(location = 0) out vec4 fragColor;

float random(in float x) {
  return fract(sin(x) * 1e4);
}

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 mask = texture(uMask, vec2(vUv.y, vUv.x));

  vec2 t0 = vec2(vUv.x, vUv.y) * uUV_0;
  vec2 t1 = vec2(vUv.x, vUv.y) * uUV_1;
  t0 = fract(t0);
  t1 = fract(t1);

  vec2 uv_grid_blend = mix(t0, t1, uBlend);
  vec2 uv_grid_blend2 = mix(t0, t1, uBlend) * 0.5;

  vec4 disp = texture(uTexture, uv_grid_blend);
  vec4 disp2 = texture(uNextTexture, uv_grid_blend);

  vec2 distortedPosition = vec2(uv_grid_blend2.x + uBlend * (disp.r * 1.0), uv_grid_blend2.y);
  vec2 distortedPosition2 = vec2(uv_grid_blend2.x - (1.0 - uBlend) * (disp2.r * 1.0), uv_grid_blend2.y);

  vec4 _texture = texture(uTexture, distortedPosition);
  vec4 _texture2 = texture(uNextTexture, distortedPosition2);

  vec4 _texture_1 = texture(uTexture_1, distortedPosition);
  vec4 _texture2_1 = texture(uNextTexture_1, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, uBlend);

  // if(vUv.y > 0.5) {
  //   finalTexture = mix(_texture_1, _texture2_1, uBlend);
  // }

  fragColor = vec4(finalTexture.xyz, mask.r);
}
