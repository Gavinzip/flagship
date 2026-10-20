import {
  Color,
  LineBasicMaterial,
  Mesh,
  MeshPhysicalMaterial,
  PointsMaterial,
  SpriteMaterial,
  type Group,
} from "three";

/** Color-grade the original Protocol material. Geometry and all authored relief maps stay intact. */
export function finishEarthSurface(root: Group) {
  const goldBlend = { value: 0 };
  const earth = root.getObjectByName("earth-surface");
  if (
    !(earth instanceof Mesh) ||
    !(earth.material instanceof MeshPhysicalMaterial)
  )
    throw new Error("The Protocol Earth surface is missing.");
  earth.material.onBeforeCompile = (shader) => {
    shader.uniforms.uEditionGold = goldBlend;
    shader.fragmentShader = "uniform float uEditionGold;\n" + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <map_fragment>",
      `#include <map_fragment>
      float flagshipTone = dot(diffuseColor.rgb, vec3(.2126,.7152,.0722));
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(flagshipTone), .78) * vec3(.83,1.,1.18);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.018,.014,.007), uEditionGold);
    `,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      `#include <opaque_fragment>
      float goldRelief = dot(gl_FragColor.rgb, vec3(.2126,.7152,.0722));
      vec3 goldCore = vec3(.003,.003,.002) + goldRelief * vec3(.035,.022,.003);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, goldCore, uEditionGold);`,
    );
  };
  earth.material.customProgramCacheKey = () =>
    "flagship-protocol-edition-gold-v3";
  // Keep the Protocol network, but bring its old gold lights into the logo's silver/blue palette.
  root.traverse((object) => {
    if (!("material" in object)) return;
    const material = (object as Mesh).material;
    for (const m of Array.isArray(material) ? material : [material]) {
      if (m instanceof LineBasicMaterial) {
        m.color.set("#a3bee7");
        m.opacity *= 0.7;
      }
      if (m instanceof PointsMaterial) {
        m.color.set("#b9cff2");
        m.opacity *= 0.65;
      }
      if (m instanceof SpriteMaterial) {
        m.color.copy(new Color("#c5dbff"));
        m.opacity *= 0.5;
      }
    }
  });
  return goldBlend;
}
