// https://lygia.xyz/

uniform float uBlend;
uniform float uDispFactor;
uniform sampler2D uDisplaceTexture;
uniform float uMix;
uniform sampler2D uTexture;
uniform sampler2D uNextTexture;

uniform vec2 uUV_0;
uniform vec2 uUV_1;

uniform sampler2D uMask;

uniform sampler2D uTextureAtlas;

varying vec2 vUv;

float random(in float x) {
  return fract(sin(x) * 1e4);
}

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
  vec2 p = floor(st + v);
  return step(t, random(100. + p * .000001) + random(p.x) * 0.5);
}

void main() {
  vec4 mask = texture2D(uMask, vec2(vUv.y, vUv.x));

  vec2 t0 = vec2(vUv.x, vUv.y) * uUV_0;
  vec2 t1 = vec2(vUv.x, vUv.y) * uUV_1;
  t0 = fract(t0);
  t1 = fract(t1);

  vec2 uv_grid_blend = mix(t0, t1, uBlend);

  vec4 disp = texture2D(uTexture, uv_grid_blend);
  vec4 disp2 = texture2D(uNextTexture, uv_grid_blend);

  vec2 distortedPosition = vec2(uv_grid_blend.x + uBlend * (disp.r * 1.), uv_grid_blend.y);
  vec2 distortedPosition2 = vec2(uv_grid_blend.x - (1.0 - uBlend) * (disp2.r * 1.), uv_grid_blend.y);
  vec2 dist = mix(distortedPosition, distortedPosition2, uBlend);

  vec4 _texture = texture2D(uTexture, distortedPosition);
  vec4 _texture2 = texture2D(uNextTexture, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, uBlend);

  // vec4 grid_texture_1 = texture2D(uTexture, st);
  // vec4 grid_texture_2 = texture2D(uNextTexture, st);

  // vec4 gridTexture_blend = mix(grid_texture_1, grid_texture_2, uBlend);

  // vec4 grid_finalTexture = mix(_texture, gridTexture_blend, uBlend);

  // vec4 outPut = mix(finalTexture, grid_finalTexture, uBlend);

  gl_FragColor = vec4(finalTexture.xyz, mask);

}

// vec2 st2 = vec2(vUv.x, vUv.y) * grid2;
  // st2 = fract(st2); // Wrap around 1.0

  // vec4 testTex1 = texture2D(uTexture, st1);
  // vec4 testTex2 = texture2D(uTexture, st2);

  // vec4 testText = mix(testTex1, testTex2, uBlend);

  // vec4 white = vec4(vec3(1.0), 1.);
  // vec4 black = vec4(vec3(0.0), 1.);

  // vec4 disp = texture2D(uTexture, st);
  // vec4 disp2 = texture2D(uNextTexture, st);

  // vec2 distortedPosition = vec2(vUv.x + uBlend * (disp.r * 1.), vUv.y);
  // vec2 distortedPosition2 = vec2(vUv.x - (1.0 - uBlend) * (disp2.r * 1.), vUv.y);

 // vec4 _texture = texture2D(uTexture, distortedPosition);
  // vec4 _texture2 = texture2D(uNextTexture, distortedPosition2);

  // vec4 finalTexture = mix(white, black, uBlend);