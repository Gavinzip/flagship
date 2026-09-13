import * as T from "three";
import { geoPoint } from "./geography";
import { createGlobeModel } from "./protocol/createGlobe";
import { worldSpec } from "../config/worldSpec";
import { finishAtmosphere } from "./atmosphereFinish";
import { finishEarthSurface } from "./earthSurface";
export function createEarth() {
  const root = createGlobeModel();
  finishEarthSurface(root);
  finishAtmosphere(root);
  const earth = root.getObjectByName("earth-surface") as T.Mesh;
  const cities = Object.entries(worldSpec.cities).map(([id, city]) => {
    const anchor = new T.Group();
    anchor.position.copy(geoPoint(city.longitude, city.latitude, 1.012));
    anchor.lookAt(anchor.position.clone().multiplyScalar(2));
    const core = new T.Mesh(
      new T.SphereGeometry(0.012, 16, 12),
      new T.MeshBasicMaterial({ color: city.color }),
    );
    const halo = new T.Mesh(
      new T.RingGeometry(0.025, 0.028, 48),
      new T.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.8,
        side: T.DoubleSide,
      }),
    );
    const glow = new T.Mesh(
      new T.PlaneGeometry(0.17, 0.17),
      new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { tint: { value: new T.Color(city.color) } },
        vertexShader: `varying vec2 uv1;void main(){uv1=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `varying vec2 uv1;uniform vec3 tint;void main(){float d=length(uv1-.5)*2.;float a=pow(max(0.,1.-d),3.);gl_FragColor=vec4(tint,a*.7);}`,
      }),
    );
    anchor.add(glow, core, halo);
    root.add(anchor);
    return { id, anchor, core, halo };
  });
  return { root, earth, cities };
}
