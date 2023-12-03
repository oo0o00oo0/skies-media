// #version 300 es

precision mediump float;

uniform float uBlend;

attribute vec2 uvfill;

// in vec3 position;
// in vec2 uv;

out vec2 vUv;
out vec2 vUvfill;
out vec3 vPos;

out vec2 uvBlend;

void main() {

  uvBlend = mix(uv, uvfill, uBlend);

  vUvfill = uvfill;
  vPos = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
