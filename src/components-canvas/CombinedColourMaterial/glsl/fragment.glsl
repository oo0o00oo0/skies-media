// https://lygia.xyz/

uniform float uBlend;
uniform float uDispFactor;
uniform sampler2D uDisplaceTexture;
uniform float uOffset;
uniform sampler2D uTexture;
uniform sampler2D uNextTexture;

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

  // vec4 white = vec4(vec3(1.0), 1.);
  // vec4 black = vec4(vec3(0.0), 1.);

  vec4 disp = texture2D(uTexture, vUv);
  vec4 disp2 = texture2D(uNextTexture, vUv);

  // vec2 distortedPosition = vec2(vUv.x + uBlend * (disp.r * 1.), vUv.y);
  // vec2 distortedPosition2 = vec2(vUv.x - (1.0 - uBlend) * (disp2.r * 1.), vUv.y);

  vec4 _texture = texture2D(uTexture, vUv);
  vec4 _texture2 = texture2D(uNextTexture, vUv);
  // vec4 _texture = texture2D(uTexture, distortedPosition);
  // vec4 _texture2 = texture2D(uNextTexture, distortedPosition2);

  // vec4 finalTexture = mix(white, black, uBlend);
  vec4 finalTexture = mix(_texture, _texture2, uBlend);
  gl_FragColor = vec4(finalTexture.xyz, 1.);

}