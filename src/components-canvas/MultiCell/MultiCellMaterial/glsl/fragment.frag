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

uniform float uTime;

uniform sampler2D uMask;

// uniform sampler2D uTextures[12]; // Use a sampler2D array to hold your textures
// uniform int uTextureIndex; // Index of the texture to be used

uniform sampler2D uTextureAtlas;

in vec2 vUv;
in vec2 vUv2;
in vec2 vUvFill;

in vec2 uvBlend;

layout(location = 0) out vec4 fragColor;

float random(in float x) {
  return fract(sin(x) * 1e4);
}

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {

  vec2 uvBlend = mix(vUv, vUv2, uBlend);
  vec4 mask = texture(uMask, vec2(vUvFill.x, vUvFill.y));

  vec4 disp = texture(uTexture, vUvFill);
  vec4 disp2 = texture(uNextTexture, vUvFill);

  vec2 distortedPosition = vec2(uvBlend.x + uBlend * (disp.r * 1.0), uvBlend.y);
  vec2 distortedPosition2 = vec2(uvBlend.x - (1.0 - uBlend) * (disp2.r * 1.0), uvBlend.y);

  vec4 colour_0 = LinearTosRGB(texture(uTexture, distortedPosition));
  vec4 colour_1 = LinearTosRGB(texture(uNextTexture, distortedPosition2));

  vec4 colour = mix(colour_0, colour_1, uBlend);

  fragColor = vec4(colour.xyz, mask.r);
}
