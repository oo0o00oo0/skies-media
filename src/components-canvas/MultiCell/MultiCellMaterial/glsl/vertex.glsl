// #version 300 es

precision mediump float;

uniform float uBlend;

attribute vec2 uvNext;
attribute vec2 uvFill;

// in vec3 position;
// in vec2 uv;

out vec2 vUv;
out vec2 vUv2;
out vec2 vUvFill;

out vec3 vPos;

out vec2 uvBlend;

void main() {

  // uvBlend = mix(uv, uvfill, uBlend);

  vPos = position;
  vUv = uv;
  vUv2 = uvNext;
  vUvFill = uvFill;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
