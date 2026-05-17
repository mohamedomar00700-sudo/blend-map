import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Languages } from "lucide-react";
import logoUrl from "@/assets/logo.png";
import { Intro } from "@/components/assessment/Intro";
import { QuestionForm } from "@/components/assessment/QuestionForm";
import { Report } from "@/components/assessment/Report";
import { t, type Answers, type Lang } from "@/lib/assessment";

export const Route = createFileRoute("/")({
  component: Index,
});

type Stage = "intro" | "assessment" | "report";

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const tt = useMemo(() => t[lang], [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="United Pharmacy" className="h-9 w-9 rounded-md object-contain" />
            <div className="leading-tight">
              <div className="text-[13px] font-semibold text-foreground">{tt.appTitle}</div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {tt.company}
              </div>
            </div>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {tt.lang}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {stage === "intro" && (
          <Intro lang={lang} onBegin={() => setStage("assessment")} />
        )}
        {stage === "assessment" && (
          <QuestionForm
            lang={lang}
            answers={answers}
            setAnswers={setAnswers}
            onSubmit={() => setStage("report")}
            onBack={() => setStage("intro")}
          />
        )}
        {stage === "report" && (
          <Report
            lang={lang}
            answers={answers}
            onRestart={() => {
              setAnswers({});
              setStage("intro");
            }}
          />
        )}
      </main>

      <footer className="border-t border-border py-6 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} United Pharmacy · Learning & Development
      </footer>
    </div>
  );
}
