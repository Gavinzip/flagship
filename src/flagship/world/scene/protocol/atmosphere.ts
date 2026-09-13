import * as THREE from "three";
import { globeConfig } from "./config";
export function createAtmosphere() {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(globeConfig.colors.atmosphere) },
      intensity: { value: globeConfig.atmosphere.intensity },
      falloff: { value: globeConfig.atmosphere.falloff },
    },
    vertexShader: `varying vec3 vN;varying vec3 vP;void main(){vec4 p=modelViewMatrix*vec4(position,1.);vP=p.xyz;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*p;}`,
    fragmentShader: `
      varying vec3 vN;
      varying vec3 vP;
      uniform vec3 glowColor;
      uniform float intensity;
      uniform float falloff;
      void main() {
        float facing = abs(dot(normalize(vN), normalize(-vP)));
        // Fade both edges of the thin shell instead of drawing a solid limb.
        float rim = pow(1. - facing, falloff) * smoothstep(0., .16, facing);
        gl_FragColor = vec4(glowColor, rim * intensity);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(globeConfig.atmosphere.radius, 96, 64),
    material,
  );
  halo.name = "atmosphere";
  return halo;
}
export function createGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("Unable to create light texture.");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,224,153,1)");
  g.addColorStop(0.04, "rgba(249,207,132,.95)");
  g.addColorStop(0.13, "rgba(229,181,100,.5)");
  g.addColorStop(0.4, "rgba(197,139,62,.09)");
  g.addColorStop(1, "rgba(197,139,62,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
