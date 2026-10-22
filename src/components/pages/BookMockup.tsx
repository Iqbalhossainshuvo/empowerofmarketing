/** CSS 3D book cover mockup (no image), typeset with the real title and author. */
export function BookMockup({ title, author, size = "md" }: { title: string; author: string; size?: "md" | "lg" }) {
  const w = size === "lg" ? "w-[min(300px,70vw)]" : "w-[min(240px,62vw)]";
  const [first, ...rest] = title.split(" ");
  return (
    <div className={`relative ${w} [perspective:1200px]`} dir="ltr">
      <div aria-hidden className="absolute inset-x-[10%] -bottom-6 h-10 rounded-[50%] bg-blue/40 blur-2xl" />
      <div className="relative aspect-[7/10] w-full [transform:rotateY(-18deg)_rotateX(4deg)] [transform-style:preserve-3d] transition-transform duration-700 ease-out-expo hover:[transform:rotateY(-6deg)_rotateX(2deg)]">
        {/* pages edge */}
        <div className="absolute inset-y-[1.5%] end-[-14px] w-[16px] rounded-e-sm bg-gradient-to-r from-neutral-200 to-neutral-400 [transform:rotateY(90deg)_translateZ(-8px)] origin-left" />
        <div
          role="img"
          aria-label={`${title} — ${author}`}
          className="absolute inset-0 overflow-hidden rounded-e-md rounded-s-sm border border-white/10 shadow-[20px_30px_60px_-10px_rgb(0_0_0/0.8)]"
          style={{
            background:
              "radial-gradient(120% 80% at 80% 0%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(90% 70% at 0% 100%, rgba(139,92,246,0.5), transparent 60%), linear-gradient(160deg, #0f1629, #05070d)",
          }}
        >
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute inset-y-0 start-0 w-3 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="relative flex h-full flex-col p-[9%] [container-type:inline-size]">
            <p className="font-semibold tracking-[0.2em] text-mint" style={{ fontSize: "4.2cqi" }}>
              THE PRACTICAL A–Z MARKETING FIELD GUIDE
            </p>
            <p className="mt-auto font-display leading-[0.95] font-bold text-white" style={{ fontSize: "17cqi" }}>
              {first}
              <br />
              <span className="bg-gradient-to-r from-mint via-sky to-violet bg-clip-text text-transparent">{rest.join(" ")}</span>
            </p>
            <div className="mt-4 h-px w-1/3 bg-white/40" />
            <p className="mt-3 text-white/80" style={{ fontSize: "5.4cqi" }}>{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
