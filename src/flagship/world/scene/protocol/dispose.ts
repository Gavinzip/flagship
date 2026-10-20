import * as THREE from "three";
export function disposeObject(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>(),
    textures = new Set<THREE.Texture>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    if (mesh.material)
      (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(
        (m) => materials.add(m),
      );
  });
  materials.forEach((material) => {
    Object.values(material).forEach((v) => {
      if (v instanceof THREE.Texture) textures.add(v);
    });
    if (material instanceof THREE.ShaderMaterial)
      Object.values(material.uniforms).forEach((u) => {
        if (u.value instanceof THREE.Texture) textures.add(u.value);
      });
  });
  textures.forEach((t) => t.dispose());
  materials.forEach((m) => m.dispose());
  geometries.forEach((g) => g.dispose());
}
