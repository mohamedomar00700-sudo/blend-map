import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { LIKERT, QUESTIONS, t, type Answers, type Lang } from "@/lib/assessment";

export function QuestionForm({
  lang,
  answers,
  setAnswers,
  onSubmit,
  onBack,
}: {
  lang: Lang;
  answers: Answers;
  setAnswers: (a: Answers) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const tt = t[lang];
  const [idx, setIdx] = useState(0);
  const [err, setErr] = useState(false);
  const q = QUESTIONS[idx];
  const progress = ((idx + 1) / QUESTIONS.length) * 100;
  const value = answers[q.id];

  const choose = (v: number) => {
    setAnswers({ ...answers, [q.id]: v });
    setErr(false);
  };

  const next = () => {
    if (!answers[q.id]) {
      setErr(true);
      return;
    }
    if (idx < QUESTIONS.length - 1) setIdx(idx + 1);
    else onSubmit();
  };

  const prev = () => {
    if (idx === 0) onBack();
    else setIdx(idx - 1);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-baseline justify-between text-xs font-medium text-muted-foreground">
        <span className="uppercase tracking-[0.18em]">
          {tt.question} {idx + 1} {tt.of} {QUESTIONS.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-[color:var(--brand-accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-10"
        >
          <h2 className="text-balance text-xl font-medium leading-snug text-foreground sm:text-2xl">
            {lang === "en" ? q.en : q.ar}
          </h2>

          <div className="mt-7 space-y-2">
            {LIKERT.map((opt) => {
              const active = value === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => choose(opt.value)}
                  className={[
                    "group flex w-full items-center justify-between rounded-lg border px-4 py-3.5 text-start text-sm transition-all",
                    active
                      ? "border-[color:var(--brand-accent)] bg-[color:var(--brand-accent)]/8 text-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-[color:var(--brand-accent)]/60 hover:bg-muted/60",
                  ].join(" ")}
                >
                  <span className="font-medium">{lang === "en" ? opt.en : opt.ar}</span>
                  <span
                    className={[
                      "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                      active
                        ? "border-[color:var(--brand-accent)] bg-[color:var(--brand-accent)] text-white"
                        : "border-border bg-background",
                    ].join(" ")}
                  >
                    {active && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          {err && (
            <p className="mt-3 text-xs text-destructive">{tt.answerRequired}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          onClick={prev}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {tt.back}
        </button>
        <button
          onClick={next}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-95"
        >
          {idx === QUESTIONS.length - 1 ? tt.submit : tt.next}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
