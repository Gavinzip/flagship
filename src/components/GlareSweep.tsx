type GlareSweepProps = {
  className?: string;
};

export function GlareSweep({ className = "" }: GlareSweepProps) {
  return (
    <span
      className={`glare-sweep ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
