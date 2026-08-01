import { MapPin, Shop } from "iconoir-react";
import { EnergyFrame } from "./EnergyFrame";
import { SectionHeading } from "./SectionHeading";

export function VendorsSection() {
  return (
    <section className="section section--vendors" id="vendors">
      <div className="site-shell">
        <SectionHeading
          title="參展攤商"
          english="EXHIBITORS"
          description="現場預計有 30+ TCG 攤商，名單與攤位位置確認後會更新。"
        />

        <EnergyFrame className="vendor-announcement" data-reveal>
          <div className="vendor-announcement__count" aria-hidden="true">
            30<span>+</span>
          </div>
          <div className="vendor-announcement__content">
            <Shop aria-hidden="true" />
            <div>
              <h3>攤商名單陸續公布</h3>
              <p>攤商與攤位編號確認後，會直接更新在這一頁。</p>
            </div>
          </div>
          <div className="vendor-announcement__map">
            <MapPin aria-hidden="true" />
            <span>攤位配置同步更新</span>
          </div>
        </EnergyFrame>
      </div>
    </section>
  );
}
