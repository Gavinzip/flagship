import * as THREE from "three";
import { globeConfig } from "./config";
import { geoPoint, landRings, drawLand } from "./geography";
import { hubs, routes } from "./data/network";
import { createHubGlows } from "./hubGlows";

export function createCoastlines() {
  const coordinates: number[] = [];
  for (const ring of landRings)
    for (let i = 1; i < ring.length; i++) {
      const a = ring[i - 1],
        b = ring[i];
      if (Math.abs(a[0] - b[0]) > 180) continue;
      coordinates.push(
        ...geoPoint(a[0], a[1], 1.002).toArray(),
        ...geoPoint(b[0], b[1], 1.002).toArray(),
      );
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(coordinates, 3));
  const mesh = new THREE.LineSegments(
    g,
    new THREE.LineBasicMaterial({
      color: globeConfig.colors.coast,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    }),
  );
  mesh.name = "coastlines";
  return mesh;
}
function createCityLights() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create city mask.");
  ctx.fillStyle = "white";
  drawLand(ctx, 1024, 512);
  const mask = ctx.getImageData(0, 0, 1024, 512).data;
  let seed = 413;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const positions: number[] = [];
  for (let i = 0; i < 6500; i++) {
    const [lon0, lat0] = hubs[i % hubs.length];
    const lon = lon0 + (random() - 0.5) * 28,
      lat = lat0 + (random() - 0.5) * 20;
    const x = Math.floor(((lon + 180) / 360) * 1024),
      y = Math.floor(((90 - lat) / 180) * 512);
    if (
      x < 0 ||
      x >= 1024 ||
      y < 0 ||
      y >= 512 ||
      mask[(y * 1024 + x) * 4 + 3] < 128
    )
      continue;
    positions.push(...geoPoint(lon, lat, 1.003).toArray());
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: globeConfig.colors.cities,
      size: 0.003,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
}
export function createNetwork() {
  const group = new THREE.Group();
  group.name = "network";
  group.add(createCityLights());
  const points: number[] = [];
  routes.forEach(([from, to], index) => {
    const a = geoPoint(...hubs[from]),
      b = geoPoint(...hubs[to]);
    const angle = a.angleTo(b);
    const at = (t: number) =>
      a
        .clone()
        .multiplyScalar(Math.sin((1 - t) * angle))
        .addScaledVector(b, Math.sin(t * angle))
        .divideScalar(Math.sin(angle))
        .normalize()
        .multiplyScalar(
          1.006 + Math.sin(t * Math.PI) * (0.015 + (index % 4) * 0.022),
        );
    for (let i = 0; i < 60; i++)
      points.push(...at(i / 60).toArray(), ...at((i + 1) / 60).toArray());
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  group.add(
    new THREE.LineSegments(
      g,
      new THREE.LineBasicMaterial({
        color: globeConfig.colors.routes,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      }),
    ),
  );
  const geo = new THREE.SphereGeometry(0.006, 8, 6),
    mat = new THREE.MeshBasicMaterial({ color: globeConfig.colors.hubCore, toneMapped: false });
  const cores = new THREE.InstancedMesh(geo, mat, hubs.length);
  const matrix = new THREE.Matrix4();
  hubs.forEach(([lon, lat], i) => {
    matrix.makeTranslation(geoPoint(lon, lat, 1.008));
    cores.setMatrixAt(i, matrix);
  });
  group.add(cores);
  group.add(createHubGlows());
  return group;
}
