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
#define gridSize 2

void main() {

  // Determine the width and height of each grid cell
  float cellWidth = 0.5; // 2 columns -> 1/2 the width
  float cellHeight = 0.5; // 2 rows -> 1/2 the height

  // Determine which cell the current fragment falls into
  int cellX = int(vUv.x / cellWidth);
  int cellY = int(vUv.y / cellHeight);

    // Define the grayscale values for each of the 4 cells
    // Starting from the bottom-left and moving to the right and upwards
  float grayscaleValuesX[gridSize * gridSize];
  grayscaleValuesX[0] = 0.0; // Bottom-left
  grayscaleValuesX[1] = 0.25; // Bottom-right
  grayscaleValuesX[2] = 0.5; // Top-left
  grayscaleValuesX[3] = 0.75; // Top-right

    // Calculate the index of the current cell
  float grayscaleValuesY[gridSize * gridSize];
  grayscaleValuesY[0] = 0.5; // Bottom-left
  grayscaleValuesY[1] = 0.5; // Bottom-right
  grayscaleValuesY[2] = 0.5; // Top-left
  grayscaleValuesY[3] = 0.5; // Top-right

  int cellIndex = cellY * gridSize + cellX; // for a 2x2 grid
    // Calculate the index of the current cell

    // Use the cellIndex to get the grayscale value for the current cell
  float grayscaleX = grayscaleValuesX[cellIndex];
  float grayscaleY = grayscaleValuesY[cellIndex];

  vec2 uvMult = fract(vec2(vUv.x * float(gridSize), vUv.y * float(gridSize)));

  // vec2 atlas_position = vec2((uvMult.x * xScale) + grayscaleX, (uvMult.y * yScale) + grayscaleY);
  // vec4 textTest = texture(uTexture, atlas_position);

  vec2 atlas_pos_0 = vec2(uvMult.x * xScale + uOffset_0.x + grayscaleX, uvMult.y * yScale + uOffset_0.y + grayscaleY);
  vec2 atlas_pos_1 = vec2(uvMult.x * xScale + uOffset_1.x + grayscaleX, uvMult.y * yScale + uOffset_1.y + grayscaleY);

  // vec2 stepping = step(atlas_position, vec2(0.02));

  ///

  vec4 texture_0_pos_0 = texture(uTexture, atlas_pos_0);
  vec4 texture_1_pos_0 = texture(uNextTexture, atlas_pos_1);
  vec4 texture_0 = mix(texture_0_pos_0, texture_1_pos_0, uBlend);
  vec4 texture_0_pos_1 = texture(uTexture, atlas_pos_0);
  vec4 texture_1_pos_1 = texture(uNextTexture, atlas_pos_1);
  vec4 texture_1 = mix(texture_0_pos_1, texture_1_pos_1, uBlend);
  // vec4 finalTexture = LinearTosRGB(mix(texture_0, texture_1, uBlend));
  vec4 finalTexture = mix(texture_0, texture_1, uBlend); // This will switch between the textures based on uBlend

  fragColor = vec4(finalTexture.xyz, 1.);
  // fragColor = vec4(vec3(stepping.x), 1.);

  // fragColor = vec4(vec3(textTest.rgb), 1.);
  // fragColor = vec4(vec3(atlas_position.x, atlas_position.y, 0.), 1.);

}
