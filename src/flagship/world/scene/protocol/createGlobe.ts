import * as THREE from "three";
import { globeConfig } from "./config";
import { createEarthMaterial } from "./materials";
import { createCoastlines, createNetwork } from "./network";
import { createAtmosphere } from "./atmosphere";
import { hubs } from "./data/network";
import { geoPoint } from "./geography";

export function createGlobeModel() {
  const root = new THREE.Group();
  root.name = "renaiss-network-earth";
  root.rotation.set(
    globeConfig.initialTilt,
    -Math.PI / 2 - (globeConfig.initialLongitude * Math.PI) / 180,
    0,
  );
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 128, 96),
    createEarthMaterial(),
  );
  earth.name = "earth-surface";
  const coastlines = createCoastlines(),
    network = createNetwork(),
    atmosphere = createAtmosphere();
  root.add(earth, coastlines, network, atmosphere);
  const sockets = Object.fromEntries(
    hubs.map(([longitude, latitude], index) => [
      `hub-${index}`,
      { position: geoPoint(longitude, latitude, 1.008), longitude, latitude },
    ]),
  );
  root.userData.sculptRuntime = {
    nodes: { earth: root, coastlines, network, atmosphere },
    meshes: { earth, coastlines, atmosphere },
    sockets,
    colliders: { earth: { type: "sphere", radius: 1 } },
    destructionGroups: { earth: [] },
  };
  return root;
}
