import { motion } from "framer-motion";
import { Clock, FileCheck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { t, type Lang, PROFILE_META, PROFILE_ORDER } from "@/lib/assessment";

export function Intro({ lang, onBegin, participantName, setParticipantName }: { lang: Lang; onBegin: () => void; participantName: string; setParticipantName: (name: string) => void }) {
  const tt = t[lang];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-accent)]" />
        {tt.appSubtitle}
      </div>

      <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
        {tt.introHeading}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {tt.introBody}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <InfoTile icon={<Clock className="h-4 w-4" />} label={tt.estTime} />
        <InfoTile icon={<FileCheck className="h-4 w-4" />} label={lang === "en" ? "20 reflective questions" : "٢٠ سؤالاً تأمُّلياً"} />
        <InfoTile icon={<ShieldCheck className="h-4 w-4" />} label={lang === "en" ? "Confidential & for development" : "سرِّي ولأغراض التطوير"} />
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-7">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          {tt.instructionsTitle}
        </h2>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
          {tt.instructions.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--brand-accent)]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-5">
        <label className="block text-sm font-semibold text-foreground">
          {lang === "en" ? "Your Name (Optional)" : "اسمك (اختياري)"}
        </label>
        <input
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder={lang === "en" ? "Enter your name" : "أدخل اسمك"}
          className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-accent)]"
        />
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
        {t[lang].disclaimer}
      </div>

      <div className="mt-8 flex items-center justify-end">
        <button
          onClick={onBegin}
          className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:opacity-95 hover:shadow-md"
        >
          {tt.begin}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function InfoTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground">
      <span className="text-[color:var(--brand-accent)]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
