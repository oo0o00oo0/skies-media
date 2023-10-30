// #version 300 es

precision mediump float;

uniform float uBlend;

attribute vec2 uvMask;
attribute vec2 uvNext;
attribute vec2 uv_big;

// in vec3 position;
// in vec2 uv;

out vec2 vUvmask;
out vec2 vUv;
out vec2 vUv2;

out vec2 vUvBig;
out vec3 vPos;

void main() {

  vUvmask = uvMask;

  vUvBig = uv_big;

  vPos = position;
  vUv = uv;
  vUv2 = uvNext;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
