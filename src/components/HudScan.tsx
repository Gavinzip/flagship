type HudScanProps = {
  className?: string;
};

export function HudScan({ className = "" }: HudScanProps) {
  return (
    <span className={`hud-scan ${className}`.trim()} aria-hidden="true">
      <span className="hud-scan__beam hud-scan__beam--red" />
      <span className="hud-scan__beam hud-scan__beam--blue" />
    </span>
  );
}
