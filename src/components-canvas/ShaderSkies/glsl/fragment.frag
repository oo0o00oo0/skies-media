uniform vec2 winResolution;
uniform sampler2D uTexture;
uniform float uValue;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 disp = texture2D(uTexture, uv);

  float bw = (disp.r + disp.g + disp.b) / 3.0;

  uv = vec2(vUv.x + (bw), vUv.y);

  vec4 color = texture2D(uTexture, uv);

  vec4 uvCol = vec4(1.0, vUv.x, 1. - vUv.y, 1.0);

  gl_FragColor = vec4(color.rgb, 1.);
}