import { Map, MapPin, Train } from "iconoir-react";
import { media } from "../config/media";
import { event } from "../data/event";
import { ActionLink } from "./ActionLink";
import { CalendarButton } from "./CalendarButton";
import { EnergyFrame } from "./EnergyFrame";
import { SectionHeading } from "./SectionHeading";

export function VenueSection() {
  return (
    <section className="section section--venue" id="venue">
      <div className="site-shell">
        <SectionHeading
          title="場地地圖"
          english="VENUE & FLOOR MAP"
        />

        <EnergyFrame className="venue-frame" data-reveal>
          <div className="venue-media">
            <iframe
              src={event.mapEmbedUrl}
              title="三創生活園區 Google 地圖"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span>忠孝新生站 → 三創生活園區</span>
          </div>

          <div className="venue-details">
            <MapPin aria-hidden="true" className="venue-details__pin" />
            <h3>{event.venue}</h3>
            <p className="venue-details__room">{event.room}</p>
            <a
              className="venue-address"
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {event.address}
            </a>

            <div className="venue-transit">
              <Train aria-hidden="true" />
              <div>
                <strong>搭捷運最方便</strong>
                <span>{event.transit}</span>
              </div>
            </div>

            <ol className="venue-route" aria-label="抵達會場步驟">
              <li>
                <span>01</span>
                <p>抵達捷運忠孝新生站，從 1 號出口出站。</p>
              </li>
              <li>
                <span>02</span>
                <p>步行約 5 分鐘抵達三創生活園區。</p>
              </li>
              <li>
                <span>03</span>
                <p>進入商場後前往 5F Clapper Studio。</p>
              </li>
            </ol>

            <div className="venue-actions">
              <ActionLink href={event.mapUrl} target="_blank" rel="noreferrer">
                <Map aria-hidden="true" width={22} height={22} />
                從目前位置開始導航
              </ActionLink>
              <CalendarButton />
            </div>
          </div>
        </EnergyFrame>

        <section
          className="floor-plan"
          id="floor-map"
          aria-labelledby="floor-plan-title"
          data-reveal
        >
          <header className="floor-plan__header">
            <div>
              <p>CLAPPER STUDIO · 5F</p>
              <h3 id="floor-plan-title">會場配置圖</h3>
              <span>入口位於左下方，舞台位於右側；手機可左右滑動查看。</span>
            </div>
            <ActionLink
              href={media.floorPlan}
              target="_blank"
              rel="noreferrer"
              tone="secondary"
            >
              展開完整地圖
            </ActionLink>
          </header>

          <div
            className="floor-plan__viewport"
            role="region"
            aria-label="可左右滑動的會場配置圖"
            tabIndex={0}
          >
            <img
              src={media.floorPlan}
              width="3600"
              height="2200"
              alt="Clapper Studio 5F 會場配置圖；入口在左下方，攤位位於中央，展示區在上方，舞台在右側，出口在下方偏右。"
              loading="lazy"
            />
          </div>

          <div className="floor-plan__legend" aria-label="配置圖圖例">
            <span>紅色：一般攤位 T01–T24</span>
            <span>黃色：大型攤位 T30–T33</span>
            <span>藍色：展示區</span>
            <span>右側：舞台</span>
          </div>

        </section>
      </div>
    </section>
  );
}
