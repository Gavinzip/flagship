import * as T from "three";
import { goldParticleField, goldParticleSpec } from "./goldParticleField";
import { geoPoint } from "./geography";
import { worldSpec } from "../config/worldSpec";

const particleVertex = `
  attribute float aLand;
  attribute float aSeed;
  uniform float uGold;
  uniform float uPixelRatio;
  uniform vec3 uOrigin;
  varying float vLand;
  varying float vFacing;
  varying float vSeed;
  varying float vReveal;
  void main() {
    vLand = aLand;
    vSeed = abs(aSeed);
    float travel = (1. - dot(normalize(position), uOrigin)) * .25 + vSeed * .12;
    vReveal = smoothstep(travel, travel + .34, uGold);
    float release = sin(vReveal * 3.14159265) * .012;
    vec3 p = position * (1. + release * vSeed);
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.);
    vec3 viewNormal = normalize(normalMatrix * normalize(p));
    vFacing = dot(viewNormal, normalize(-viewPosition.xyz));
    gl_PointSize = uPixelRatio * mix(${goldParticleSpec.oceanPointSize.toFixed(2)}, ${goldParticleSpec.landPointSize.toFixed(2)}, aLand) * clamp(3.1 / -viewPosition.z, .7, 2.5);
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const particleFragment = `
  uniform vec3 uGoldColor;
  varying float vLand;
  varying float vFacing;
  varying float vSeed;
  varying float vReveal;
  void main() {
    if (vFacing <= .015 || vReveal < .001) discard;
    vec2 p = abs(gl_PointCoord - .5);
    float shape = 1. - smoothstep(.34, .5, max(p.x, p.y));
    float facing = smoothstep(.02, .32, vFacing);
    float alpha = mix(.075, .94, vLand) * shape * facing * vReveal;
    vec3 gold = mix(uGoldColor * .65, uGoldColor, vLand);
    gold = mix(gold, vec3(1., .91, .55), step(.965, vSeed) * .48);
    gl_FragColor = vec4(gold, alpha);
    #include <colorspace_fragment>
  }
`;
const rimVertex = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vec4 p = modelViewMatrix * vec4(position, 1.);
    vPosition = p.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * p;
  }
`;
const rimFragment = `
  uniform float uGold;
  uniform vec3 uGoldColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(-vPosition)));
    float edge = pow(1. - facing, 8.);
    gl_FragColor = vec4(uGoldColor, edge * .82 * uGold);
    #include <colorspace_fragment>
  }
`;

/** Mutates one existing Earth. No second renderer, scene replacement, or animation loop. */
export function createGoldMutation(root: T.Group, surfaceGold: T.IUniform<number>, initiallyGold: boolean) {
  const initial = initiallyGold ? 1 : 0;
  let blend = initial;
  const gold = new T.Color("#f0b90b"), paleGold = new T.Color("#ffe477");
  const blue = new T.Color("#80b7ff"), blueHaze = new T.Color("#8fc8ff");
  const field = goldParticleField();
  const geometry = new T.BufferGeometry();
  geometry.setAttribute("position", new T.Float32BufferAttribute(field.positions, 3));
  geometry.setAttribute("aLand", new T.Float32BufferAttribute(field.land, 1));
  geometry.setAttribute("aSeed", new T.Float32BufferAttribute(field.seeds, 1));
  const destination = worldSpec.cities.thailand;
  const origin = geoPoint(destination.longitude, destination.latitude, 1);
  const uniforms = {
    uGold: { value: initial }, uPixelRatio: { value: 1 },
    uGoldColor: { value: gold }, uOrigin: { value: origin },
  };
  const points = new T.Points(geometry, new T.ShaderMaterial({
    uniforms, vertexShader: particleVertex, fragmentShader: particleFragment,
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  points.name = "thailand-gold-particles";
  points.renderOrder = 4;
  const rim = new T.Mesh(new T.SphereGeometry(1.009, 96, 64), new T.ShaderMaterial({
    uniforms: { uGold: uniforms.uGold, uGoldColor: { value: paleGold } },
    vertexShader: rimVertex, fragmentShader: rimFragment,
    side: T.BackSide, transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false,
  }));
  rim.name = "thailand-gold-limb";
  root.add(points, rim);
  const atmosphere = root.getObjectByName("atmosphere") as T.Mesh<T.BufferGeometry, T.ShaderMaterial>;
  const haze = root.getObjectByName("earth-atmospheric-haze") as T.Mesh<T.BufferGeometry, T.ShaderMaterial>;
  const earth = root.getObjectByName("earth-surface") as T.Mesh<T.BufferGeometry, T.MeshPhysicalMaterial>;
  const baseBump = earth.material.bumpScale;
  const baseClearcoat = earth.material.clearcoat;
  const fading: { material: T.Material; opacity: number }[] = [];
  for (const name of ["coastlines", "network"]) {
    root.getObjectByName(name)?.traverse(object => {
      if (!("material" in object)) return;
      const materials = (object as T.Mesh).material;
      for (const material of Array.isArray(materials) ? materials : [materials]) {
        fading.push({ material, opacity: material.opacity });
        material.transparent = true;
      }
      if (object instanceof T.Sprite) {
        const original = object.onBeforeRender;
        object.onBeforeRender = function (...args) {
          original.apply(this, args);
          this.material.opacity *= 1 - blend;
        };
      }
    });
  }
  return {
    // The camera owns the blend, including reverse travel. Do not run a second
    // easing clock: a paused admission frame must also pause its mutation.
    update(progress: number, pixelRatio: number) {
      blend = T.MathUtils.clamp(progress, 0, 1);
      uniforms.uGold.value = blend;
      uniforms.uPixelRatio.value = pixelRatio;
      surfaceGold.value = blend;
      earth.material.bumpScale = baseBump * (1 - blend * .8);
      earth.material.clearcoat = baseClearcoat * (1 - blend * .92);
      atmosphere.material.uniforms.glowColor.value.copy(blue).lerp(paleGold, blend);
      haze.material.uniforms.tint.value.copy(blueHaze).lerp(gold, blend);
      for (const entry of fading) entry.material.opacity = entry.opacity * (1 - blend);
      return blend;
    },
    count: field.land.length,
  };
}
