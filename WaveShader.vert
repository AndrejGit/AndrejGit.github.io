#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition; // recieves vertex information from p5.js
attribute vec2 aTexCoord; // Texture coordinates
varying vec2 vTexCoord; // Varying passes texture coordinate to fragment shader


void main() {
  vTexCoord = aTexCoord; // Assign attribute to varying so it can be used in fragment shader
  
  vec4 positionVec4 = vec4(aPosition, 1.0); // w = 1.0 means treat as position
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; // transform geometry to fill screen
  
  gl_Position = positionVec4; // output
}