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

#define xScale 1. / 16.
#define yScale 1.

uniform vec2 uGridSize_0;
uniform vec2 uGridSize_1;

#define MAX_GRID_LENGTH 64

void main() {

  float cellWidth_0 = 1. / uGridSize_0.x; // 2 columns -> 1/2 the width
  float cellHeight_0 = 1. / uGridSize_0.y; // 2 rows -> 1/2 the height

  float cellWidth_1 = 1. / uGridSize_1.x; // 2 columns -> 1/2 the width
  float cellHeight_1 = 1. / uGridSize_1.y; // 2 rows -> 1/2 the height

  int cellX_0 = int(vUv.x / cellWidth_0);
  int cellY_0 = int(vUv.y / cellHeight_0);

  int cellX_1 = int(vUv.x / cellWidth_1);
  int cellY_1 = int(vUv.y / cellHeight_1);

  int length_0 = int(uGridSize_0.x * uGridSize_0.y);
  int length_1 = int(uGridSize_1.x * uGridSize_1.y);

  float grayscaleValuesX_0[MAX_GRID_LENGTH];
  float grayscaleValuesX_1[MAX_GRID_LENGTH];

  for(int i = 0; i < length_0; i++) {
    grayscaleValuesX_0[i] = float(i) / (float(uGridSize_0.x) * float(uGridSize_0.y));
  }

  for(int i = 0; i < length_1; i++) {
    grayscaleValuesX_1[i] = float(i) / (float(uGridSize_1.x) * float(uGridSize_1.y));
  }

  int cellIndex_0 = cellY_0 * int(uGridSize_0.x) + cellX_0;
  int cellIndex_1 = cellY_1 * int(uGridSize_1.x) + cellX_1;

  float grayscaleX_0 = grayscaleValuesX_0[cellIndex_0];
  float grayscaleX_1 = grayscaleValuesX_1[cellIndex_1];

  vec2 uvMult_0 = fract(vec2(vUv.x * float(uGridSize_0.x), vUv.y * float(uGridSize_0.y)));
  vec2 uvMult_1 = fract(vec2(vUv.x * float(uGridSize_1.x), vUv.y * float(uGridSize_1.y)));

  vec2 atlas_pos_0_0 = vec2(uvMult_0.x * xScale + uOffset_0.x + grayscaleX_0, uvMult_0.y * yScale + uOffset_0.y);
  vec2 atlas_pos_0_1 = vec2(uvMult_1.x * xScale + uOffset_0.x + grayscaleX_1, uvMult_0.y * yScale + uOffset_0.y);

  vec2 atlas_pos_1_0 = vec2(uvMult_0.x * xScale + uOffset_1.x + grayscaleX_0, uvMult_0.y * yScale + uOffset_1.y);
  vec2 atlas_pos_1_1 = vec2(uvMult_1.x * xScale + uOffset_1.x + grayscaleX_1, uvMult_1.y * yScale + uOffset_1.y);
/////////////

  vec4 disp = texture(uTexture, vUv);
  vec4 disp2 = texture(uNextTexture, vUv);

  vec2 distortedPosition = vec2(atlas_pos_1_0.x + uBlend * (disp.r * 1.0), atlas_pos_1_0.y);
  vec2 distortedPosition2 = vec2(atlas_pos_1_0.x - (1.0 - uBlend) * (disp2.r * 1.0), atlas_pos_1_0.y);

/////////////
  vec4 texture_0_pos_0 = texture(uTexture, atlas_pos_0_0);
  vec4 texture_1_pos_0 = texture(uNextTexture, atlas_pos_0_1);

  vec4 texture_0 = mix(texture_0_pos_0, texture_1_pos_0, uBlend);

  vec4 texture_0_pos_1 = texture(uTexture, atlas_pos_1_0);
  vec4 texture_1_pos_1 = texture(uNextTexture, atlas_pos_1_1);

  vec4 texture_1 = mix(texture_0_pos_1, texture_1_pos_1, uBlend);

  vec4 finalTexture = LinearTosRGB(mix(texture_0, texture_1, uBlend));

  fragColor = vec4(finalTexture.xyz, 1.);

}
