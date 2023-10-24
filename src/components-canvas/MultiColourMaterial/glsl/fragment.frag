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

uniform vec2 uMaskUVs;

uniform sampler2D uMask;

// uniform sampler2D uTextures[12]; // Use a sampler2D array to hold your textures
// uniform int uTextureIndex; // Index of the texture to be used

uniform sampler2D uTextureAtlas;

in vec2 vUv;
in vec2 vUvmask;

layout(location = 0) out vec4 fragColor;

void main() {

  vec4 mask = texture(uMask, vUvmask);

  vec4 _texture = texture(uTexture, vUv);
  vec4 _texture2 = texture(uNextTexture, vUv);

  vec4 finalTexture = mix(_texture, _texture2, uBlend);
  // fragColor = vec4(finalTexture.xyz, 1.);
  fragColor = vec4(finalTexture.xyz, mask.r);
  // fragColor = vec4(uBlend, 0.2, 0.6, 1.);

}

  // vec4 disp = texture(uTexture, uv_grid_blend);
  // vec4 disp2 = texture(uNextTexture, uv_grid_blend);

  // vec2 distortedPosition = vec2(uv_grid_blend2.x + uBlend * (disp.r * 1.0), uv_grid_blend2.y);
  // vec2 distortedPosition2 = vec2(uv_grid_blend2.x - (1.0 - uBlend) * (disp2.r * 1.0), uv_grid_blend2.y);

  // vec4 _texture = texture(uTexture, distortedPosition);
  // vec4 _texture2 = texture(uNextTexture, distortedPosition2);
  // vec4 _texture_1 = texture(uTexture_1, distortedPosition);
  // vec4 _texture2_1 = texture(uNextTexture_1, distortedPosition2);
