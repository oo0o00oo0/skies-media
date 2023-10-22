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

  vec2 uv_grid_blend2 = mix(t0, t1, uBlend) * 0.5;

  vec4 disp = texture2D(uTexture, uv_grid_blend);
  vec4 disp2 = texture2D(uNextTexture, uv_grid_blend);

  vec2 distortedPosition = vec2(uv_grid_blend2.x + uBlend * (disp.r * 1.), uv_grid_blend2.y);
  vec2 distortedPosition2 = vec2(uv_grid_blend2.x - (1.0 - uBlend) * (disp2.r * 1.), uv_grid_blend2.y);
  vec2 dist = mix(distortedPosition, distortedPosition2, uBlend);

  vec4 _texture = texture2D(uTexture, distortedPosition);
  vec4 _texture2 = texture2D(uNextTexture, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, uBlend);

  gl_FragColor = vec4(finalTexture.xyz, mask);

}
