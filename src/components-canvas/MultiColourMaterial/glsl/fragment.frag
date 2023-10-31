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
in vec2 vUv2;
in vec2 vUvBig;
in vec2 vUvmask;

layout(location = 0) out vec4 fragColor;

void main() {

  vec2 uVBlend = mix(vUv, vUv2, uBlend);

  vec4 mask = texture(uMask, vUvmask);

  vec4 disp = texture(uTexture, uVBlend);
  vec4 disp2 = texture(uNextTexture, uVBlend);

  // vec2 mixedUV_0 = mix(uVBlend, distortedPosition, uVBlend.r);
  // vec2 mixedUV_1 = mix(uVBlend, distortedPosition2, uVBlend.r);

  vec2 distortedPosition = vec2(uVBlend.y + uBlend * (disp.r * 1.0), uVBlend.x);
  vec2 distortedPosition2 = vec2(uVBlend.y - (1.0 - uBlend) * (disp2.r * 1.0), uVBlend.x);

  vec4 _texture = texture(uTexture, distortedPosition);
  vec4 _texture2 = texture(uNextTexture, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, uBlend);
  fragColor = vec4(finalTexture.xyz, mask.r);

}
