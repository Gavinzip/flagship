import {
  Color,
  Mesh,
  NormalBlending,
  ShaderMaterial,
  SphereGeometry,
  FrontSide,
  type Group,
} from "three";

/** Reuse Protocol's real atmosphere shell; tune its thin limb for a pale background. */
export function finishAtmosphere(root: Group) {
  const atmosphere = root.getObjectByName("atmosphere");
  if (
    !(atmosphere instanceof Mesh) ||
    !(atmosphere.material instanceof ShaderMaterial)
  ) {
    throw new Error("The Protocol atmosphere shell is missing.");
  }
  atmosphere.scale.setScalar(1.03);
  atmosphere.material.blending = NormalBlending;
  atmosphere.material.uniforms.glowColor.value = new Color("#80b7ff");
  atmosphere.material.uniforms.intensity.value = 0.3;
  atmosphere.material.uniforms.falloff.value = 3.0;
  atmosphere.material.fragmentShader =
    atmosphere.material.fragmentShader.replace(".16, facing", ".45, facing");
  const haze = new Mesh(
    new SphereGeometry(1.012, 96, 64),
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: FrontSide,
      blending: NormalBlending,
      uniforms: { tint: { value: new Color("#8fc8ff") } },
      vertexShader:
        "varying vec3 n;varying vec3 p;void main(){vec4 v=modelViewMatrix*vec4(position,1.);p=v.xyz;n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*v;}",
      fragmentShader:
        "varying vec3 n;varying vec3 p;uniform vec3 tint;void main(){float rim=pow(1.-max(0.,dot(normalize(n),normalize(-p))),2.3);gl_FragColor=vec4(tint,rim*.20);}",
    }),
  );
  haze.name = "earth-atmospheric-haze";
  root.add(haze);
}
