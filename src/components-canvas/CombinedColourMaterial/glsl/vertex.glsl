// #version 300 es

precision mediump float;

uniform float uBlend;

// in vec3 position;
// in vec2 uv;

out vec2 vUv;
out vec3 vPos;

void main() {

  vPos = position;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
