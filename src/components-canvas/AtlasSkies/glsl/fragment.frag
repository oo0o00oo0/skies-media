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

#define ATLAS_X_T 1. / 16.
#define ATLAS_Y_T 1. / 3.

uniform vec2 uGridSize_0;
uniform vec2 uGridSize_1;

#define MAX_GRID_LENGTH 64

void main() {

  // Assuming that the displacement value is in the range [0, 1]
// and we want to clamp the distortion within the cell bounds,
// we can calculate the maximum distortion allowed based on the cell size.

// Clamp the distortion so it doesn't go beyond the cell's boundaries

// Apply the clamped distortion to the atlas coordinates

  // vec4 texture_0 = texture(uTexture, distortedPosition_0);

  /////////////////////////////////////////////////////////////////////////////////

  float cellWidth_0 = 1. / uGridSize_0.x;
  float cellHeight_0 = 1. / uGridSize_0.y;
  int cellX_0 = int(vUv.x / cellWidth_0);
  int cellY_0 = int(vUv.y / cellHeight_0);
  int length_0 = int(uGridSize_0.x * uGridSize_0.y);
  float grayscaleValuesX_0[MAX_GRID_LENGTH];
  for(int i = 0; i < length_0; i++) {
    grayscaleValuesX_0[i] = float(i) / (float(uGridSize_0.x) * float(uGridSize_0.y));
  }
  int cellIndex_0 = cellY_0 * int(uGridSize_0.x) + cellX_0;
  float grayscaleX_0 = grayscaleValuesX_0[cellIndex_0];

  vec2 uvMult_0 = fract(vec2(vUv.x * float(uGridSize_0.x), vUv.y * float(uGridSize_0.y)));

  vec2 atlas_0 = vec2(uvMult_0.x * ATLAS_X_T + uOffset_0.x + grayscaleX_0, uvMult_0.y * ATLAS_Y_T + uOffset_0.y);

  vec4 disp_0 = texture(uTexture, atlas_0);
  // // vec4 disp_0 = texture(uTexture, vUv);
  // vec2 distortedPosition_0 = vec2(clamp(atlas_0.x + uBlend * (disp_0.r * 1.0), grayscaleX_0 + uOffset_0.x, grayscaleX_0 + uOffset_0.x + ATLAS_X_T), atlas_0.y);
  vec2 distortedPosition_0 = vec2(atlas_0.x + uBlend * (disp_0.r * 1.0), atlas_0.y);

  vec4 texture_0 = texture(uTexture, distortedPosition_0);

  /////////////////////////////////////////////////////////////////////////////////

  float cellWidth_1 = 1. / uGridSize_1.x;
  float cellHeight_1 = 1. / uGridSize_1.y;

  int cellX_1 = int(vUv.x / cellWidth_1);
  int cellY_1 = int(vUv.y / cellHeight_1);
  int length_1 = int(uGridSize_1.x * uGridSize_1.y);
  float grayscaleValuesX_1[MAX_GRID_LENGTH];

  for(int i = 0; i < length_1; i++) {
    grayscaleValuesX_1[i] = float(i) / (float(uGridSize_1.x) * float(uGridSize_1.y));
  }

  int cellIndex_1 = cellY_1 * int(uGridSize_1.x) + cellX_1;
  float grayscaleX_1 = grayscaleValuesX_1[cellIndex_1];
  vec2 uvMult_1 = fract(vec2(vUv.x * float(uGridSize_1.x), vUv.y * float(uGridSize_1.y)));

  vec2 atlas_1 = vec2(uvMult_1.x * ATLAS_X_T + uOffset_1.x + grayscaleX_1, uvMult_1.y * ATLAS_Y_T + uOffset_1.y);

  vec4 disp_1 = texture(uTexture, atlas_1);
  // // vec4 disp_1 = texture(uTexture, vUv);
  vec2 distortedPosition_1 = vec2(atlas_1.x - (1.0 - uBlend) * (disp_1.r * 1.0), atlas_1.y);

  vec4 texture_1 = texture(uNextTexture, distortedPosition_1);

  /////////////////////////////////////////////////////////////////////////////////
  vec4 finalTexture = mix(texture_0, texture_1, uBlend);
  fragColor = vec4(LinearTosRGB(finalTexture).xyz, 1.);
  /////////////////////////////////////////////////////////////////////////////////

  // vec2 vis = mix(distortedPosition_0, distortedPosition_1, uBlend);
  vec2 visD = mix(distortedPosition_0, distortedPosition_1, uBlend);
  if(vUv.x + vUv.y > 1.) {
    fragColor = LinearTosRGB(vec4(finalTexture.rgba));
  } else {
    fragColor = vec4(vec2(visD.xy), 1., 1.);
  }
}
