import * as THREE from "three";
import { hubs } from "./data/network";
import { geoPoint } from "./geography";
import { createGlowTexture } from "./atmosphere";
import { globeConfig } from "./config";

/** Optical bloom sits over the surface; horizon visibility is evaluated per hub. */
export function createHubGlows() {
  const group = new THREE.Group();
  group.name = "hub-bloom";
  const texture = createGlowTexture();
  const center = new THREE.Vector3();
  const position = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const direction = new THREE.Vector3();
  hubs.forEach(([longitude, latitude], index) => {
    const material = new THREE.SpriteMaterial({
      map: texture,
      // Alpha-over keeps gold distinct on bright terrain; additive washes it white.
      blending: THREE.NormalBlending,
      // Preserve champagne hue instead of tone-mapping the glow toward white.
      toneMapped: false,
      transparent: true,
      depthWrite: false,
      // A billboard intersects the sphere near its edges. Do not depth-clip bloom.
      depthTest: false,
      opacity: 0,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(geoPoint(longitude, latitude, 1.008));
    sprite.scale.setScalar(index % 4 === 0 ? globeConfig.hubBloom.largeSize : globeConfig.hubBloom.size);
    sprite.renderOrder = 10;
    sprite.onBeforeRender = (_renderer, _scene, camera) => {
      group.getWorldPosition(center);
      sprite.getWorldPosition(position);
      camera.getWorldPosition(cameraPosition);
      normal.subVectors(position, center).normalize();
      direction.subVectors(cameraPosition, position).normalize();
      // Fade before the horizon; hubs on the far hemisphere never shine through.
      material.opacity = globeConfig.hubBloom.opacity * THREE.MathUtils.smoothstep(normal.dot(direction), 0, 0.22);
    };
    group.add(sprite);
  });
  return group;
}
