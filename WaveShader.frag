#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord; // Texture coordinate sent from vertex shader
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 st = vTexCoord;
  float rad = distance(st, vec2(0.5));
  
  float modx = cos(st.x * rad * 6.9 * u_mouse.x) * 5.0;
  float mody = sin(st.y * rad * 4.0 * u_mouse.y) * 4.0;
  float x = cos(st.x * 13.7 * u_mouse.x + modx + u_time) + 1.0;
  float y = sin(st.y * 3.0 * u_mouse.y + mody + u_time) + 1.0;
  
  float field = x * y;
  
  vec3 blue = vec3(0.2, 0.0, 1.0);
  vec3 red = vec3(1.0, 0.1, 0.6);
  vec3 colour = mix(blue, red, field);
  
  gl_FragColor = vec4(vec3(colour), 1.0);
}