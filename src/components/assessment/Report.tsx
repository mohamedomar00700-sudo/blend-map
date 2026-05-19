import { useMemo, useRef, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import logoUrl from "@/assets/logo.png";
import {
  NARRATIVES,
  PROFILE_META,
  PROFILE_ORDER,
  scoreAnswers,
  t,
  type Answers,
  type Lang,
  type ProfileKey,
} from "@/lib/assessment";

export function Report({
  lang,
  answers,
  participantName,
  onRestart,
}: {
  lang: Lang;
  answers: Answers;
  participantName: string;
  onRestart: () => void;
}) {
  const tt = t[lang];
  const rows = useMemo(() => scoreAnswers(answers), [answers]);
  const primary = rows[0].profile;
  const secondary = rows[1].profile;
  const primaryN = NARRATIVES[lang][primary];
  const secondaryN = NARRATIVES[lang][secondary];
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const chartData = PROFILE_ORDER.map((p) => ({
    profile: PROFILE_META[p][lang].name,
    value: rows.find((r) => r.profile === p)!.percent,
  }));

  const today = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const node = reportRef.current;
      
      // Ensure webfonts (Cairo for Arabic) are loaded before capture
      if (document.fonts && typeof (document as any).fonts.ready !== "undefined") {
        await (document as any).fonts.ready;
      }
      
      // Temporarily set white background for accurate PDF capture
      const prevBg = node.style.backgroundColor;
      node.style.backgroundColor = "#ffffff";

      const canvas = await html2canvas(node, {
        scale: Math.max(window.devicePixelRatio || 1, 2),
        backgroundColor: "#ffffff",
        useCORS: true,
        windowWidth: Math.max(document.documentElement.scrollWidth, node.scrollWidth),
        windowHeight: Math.max(document.documentElement.scrollHeight, node.scrollHeight),
        scrollY: -window.scrollY,
      });

      // Restore background
      node.style.backgroundColor = prevBg || "";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      let heightLeft = imgHeight - pageHeight;
      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const fileName = participantName 
        ? `behavioral-report-${participantName.replace(/\s+/g, '-')}-${Date.now()}.pdf`
        : `behavioral-report-${Date.now()}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF export failed", err);
      alert(
        lang === "ar"
          ? "فشل تنزيل الملف. حاول مرة أخرى أو تواصل مع المطور."
          : "PDF export failed. Please try again or contact support."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {tt.yourReport}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {tt.generatedOn} {today}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <RefreshCcw className="h-4 w-4" /> {tt.restart}
          </button>
          <button
            onClick={downloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-95 disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloading ? "…" : tt.download}
          </button>
        </div>
      </div>

      <motion.div
        ref={reportRef}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-10"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-border pb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {tt.yourReport}
            </h1>
            {participantName && (
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "en" ? "For: " : "لـ: "}<span className="font-semibold text-foreground">{participantName}</span>
              </p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">{tt.company}</p>
          </div>
          <img src={logoUrl} alt="United Pharmacy" className="h-14 w-14 rounded-md object-contain" />
        </div>

        {/* Primary / Secondary summary */}
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileBadge
            label={tt.primary}
            profile={primary}
            percent={rows[0].percent}
            lang={lang}
            tone="primary"
          />
          <ProfileBadge
            label={tt.secondary}
            profile={secondary}
            percent={rows[1].percent}
            lang={lang}
            tone="secondary"
          />
        </div>

        {/* Alignment overview */}
        <Section title={tt.alignmentOverview}>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{tt.alignmentNote}</p>
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="h-[280px] rounded-lg border border-border bg-background p-3">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="78%">
                  <PolarGrid stroke="oklch(0.88 0.01 240)" />
                  <PolarAngleAxis dataKey="profile" tick={{ fill: "oklch(0.35 0.04 250)", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="value"
                    stroke="oklch(0.27 0.08 255)"
                    fill="oklch(0.27 0.08 255)"
                    fillOpacity={0.22}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <ProfileTable rows={rows} lang={lang} />
          </div>
        </Section>

        {/* Primary profile */}
        <Section title={tt.profileSummary}>
          <ProfileHeading profile={primary} lang={lang} />
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{primaryN.summary}</p>
          <div className="mt-5 rounded-lg bg-muted/50 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {tt.workplaceOrientation}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{primaryN.orientation}</p>
          </div>
        </Section>

        <div className="grid gap-6 md:grid-cols-2">
          <BulletSection title={tt.strengths} items={primaryN.strengths} />
          <BulletSection title={tt.communication} items={primaryN.communication} />
          <BulletSection title={tt.development} items={primaryN.development} />
          <BulletSection title={tt.pressure} items={primaryN.pressure} />
        </div>

        <Section title={tt.collaborate}>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {primaryN.collaborate.map((c, i) => (
              <li key={i} className="flex gap-2.5 rounded-md border border-border bg-background px-3.5 py-2.5 text-sm leading-relaxed text-foreground/90">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: PROFILE_META[primary].color }}
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Secondary */}
        <Section title={tt.secondaryHeading}>
          <ProfileHeading profile={secondary} lang={lang} muted />
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{secondaryN.complement}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {secondaryN.strengths.slice(0, 4).map((s, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground/85"
              >
                {s}
              </div>
            ))}
          </div>
        </Section>

        <div className="border-t border-border pt-5 text-[11px] leading-relaxed text-muted-foreground">
          {t[lang].disclaimer}
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--brand-accent)]" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfileBadge({
  label,
  profile,
  percent,
  lang,
  tone,
}: {
  label: string;
  profile: ProfileKey;
  percent: number;
  lang: Lang;
  tone: "primary" | "secondary";
}) {
  const m = PROFILE_META[profile][lang];
  return (
    <div
      className="rounded-xl border bg-background p-5"
      style={{
        borderColor: tone === "primary" ? PROFILE_META[profile].color : "var(--color-border)",
        borderWidth: tone === "primary" ? 2 : 1,
      }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <div className="text-xl font-semibold text-foreground sm:text-2xl">{m.name}</div>
          <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{m.tagline}</div>
        </div>
        <div
          className="text-2xl font-semibold tabular-nums sm:text-3xl"
          style={{ color: PROFILE_META[profile].color }}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}

function ProfileHeading({ profile, lang, muted = false }: { profile: ProfileKey; lang: Lang; muted?: boolean }) {
  const m = PROFILE_META[profile][lang];
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: PROFILE_META[profile].color }}
      />
      <div className="text-lg font-semibold text-foreground">{m.name}</div>
      <div className={muted ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
        {m.tagline}
      </div>
    </div>
  );
}

function ProfileTable({
  rows,
  lang,
}: {
  rows: { profile: ProfileKey; percent: number }[];
  lang: Lang;
}) {
  const tt = t[lang];
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-start font-medium">{tt.profile}</th>
            <th className="px-4 py-3 text-end font-medium">{tt.score}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const m = PROFILE_META[r.profile][lang];
            return (
              <tr
                key={r.profile}
                className={i % 2 === 1 ? "bg-background" : "bg-card"}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: PROFILE_META[r.profile].color }}
                    />
                    <span className="font-medium text-foreground">{m.name}</span>
                    {i === 0 && (
                      <span className="rounded-full bg-[color:var(--brand-accent)]/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-accent)]">
                        {tt.primary}
                      </span>
                    )}
                    {i === 1 && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {tt.secondary}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex items-center justify-end gap-3">
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${r.percent}%`,
                          background: PROFILE_META[r.profile].color,
                        }}
                      />
                    </div>
                    <span className="w-10 text-end font-semibold tabular-nums text-foreground">
                      {r.percent}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
