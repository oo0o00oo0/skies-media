// #version 300 es

precision mediump float;

uniform float uBlend;

attribute vec2 uvMask;
attribute vec2 uvNext;

// in vec3 position;
// in vec2 uv;

out vec2 vUvmask;
out vec2 vUv;
out vec2 vUv2;
out vec3 vPos;

void main() {

  vUvmask = uvMask;

  vUv2 = uvNext;
  vPos = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
