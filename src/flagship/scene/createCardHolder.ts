import {
  Group,
  Shape,
  Path,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  CylinderGeometry,
  type Material,
} from "three";
import { cardHolderSpec as spec } from "./cardHolderSpec";

function roundedPath<T extends Shape | Path>(
  path: T,
  w: number,
  h: number,
  r: number,
): T {
  const x = -w / 2,
    y = -h / 2;
  path.moveTo(x + r, y);
  path.lineTo(x + w - r, y);
  path.quadraticCurveTo(x + w, y, x + w, y + r);
  path.lineTo(x + w, y + h - r);
  path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  path.lineTo(x + r, y + h);
  path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r);
  path.quadraticCurveTo(x, y, x + r, y);
  return path;
}

/** Geometry has a real opening; there is no card, crystal, or opaque centre. */
function ring(
  w: number,
  h: number,
  innerW: number,
  innerH: number,
  depth: number,
  bevel: number,
) {
  const shape = roundedPath(new Shape(), w, h, spec.radius);
  // Match the inner radius to the rail width. A fixed inner radius makes thin
  // rounded rings self-intersect and incorrectly triangulate across the opening.
  const innerRadius = Math.max(
    0.01,
    spec.radius - Math.min(w - innerW, h - innerH) / 2,
  );
  const hole = roundedPath(new Path(), innerW, innerH, innerRadius);
  shape.holes.push(hole);
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelThickness: bevel,
    bevelSize: bevel,
    curveSegments: 8,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

export function createCardHolder() {
  const root = new Group();
  root.name = "Thin open acrylic card holder";
  const materials = {
    chrome: new MeshStandardMaterial(spec.materials.chrome),
    acrylic: new MeshPhysicalMaterial(spec.materials.acrylic),
    blue: new MeshStandardMaterial(spec.materials.blue),
  };
  function add(
    name: string,
    geometry: ExtrudeGeometry | CylinderGeometry,
    material: Material,
    z: number,
  ) {
    const part = new Mesh(geometry, material);
    part.name = name;
    part.position.z = z;
    root.add(part);
    return part;
  }
  add(
    "clear acrylic rim",
    ring(
      spec.width,
      spec.height,
      spec.windowWidth,
      spec.windowHeight,
      spec.depth,
      0.012,
    ),
    materials.acrylic,
    0,
  );
  add(
    "thin outer polished edge",
    ring(
      spec.width,
      spec.height,
      spec.width - 0.065,
      spec.height - 0.065,
      0.016,
      0.006,
    ),
    materials.chrome,
    0.034,
  );
  add(
    "inner polished edge",
    ring(
      spec.windowWidth + 0.016,
      spec.windowHeight + 0.016,
      spec.windowWidth,
      spec.windowHeight,
      0.012,
      0.004,
    ),
    materials.chrome,
    0.025,
  );

  for (const sign of [-1, 1]) {
    const latch = new Shape();
    latch.moveTo(-0.97, 0.025);
    latch.lineTo(-0.4, 0.025);
    latch.lineTo(-0.3, -0.065);
    latch.lineTo(0.3, -0.065);
    latch.lineTo(0.4, 0.025);
    latch.lineTo(0.97, 0.025);
    latch.lineTo(0.91, 0.105);
    latch.lineTo(0.37, 0.105);
    latch.lineTo(0.26, 0.01);
    latch.lineTo(-0.26, 0.01);
    latch.lineTo(-0.37, 0.105);
    latch.lineTo(-0.91, 0.105);
    latch.closePath();
    const geometry = new ExtrudeGeometry(latch, {
      depth: 0.012,
      bevelEnabled: true,
      bevelThickness: 0.007,
      bevelSize: 0.008,
      bevelSegments: 2,
      steps: 1,
    });
    const part = add("blue latch inlay", geometry, materials.blue, 0.05);
    part.position.y = sign * 2.035;
    part.scale.set(0.85, 0.5, 1);
    if (sign < 0) part.rotation.z = Math.PI;
  }
  for (const x of [-1.32, 1.32]) {
    for (const y of [-2.01, 2.01]) {
      const magnet = add(
        "small silver fastener",
        new CylinderGeometry(0.022, 0.022, 0.008, 16),
        materials.chrome,
        0.044,
      );
      magnet.rotation.x = Math.PI / 2;
      magnet.position.set(x, y, 0.044);
    }
  }
  root.userData.sculptRuntime = {
    pivot: root,
    parts: root.children.map((p) => p.name),
    opening: true,
  };
  root.rotation.set(...spec.rotation);
  return {
    root,
    setAccent(color: string) {
      materials.blue.color.set(color);
    },
    dispose() {
      root.traverse((object) => {
        if (object instanceof Mesh) object.geometry.dispose();
      });
      Object.values(materials).forEach((material) => material.dispose());
    },
  };
}
