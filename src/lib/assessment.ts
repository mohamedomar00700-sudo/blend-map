export type ProfileKey = "pioneer" | "driver" | "guardian" | "integrator";
export type Lang = "en" | "ar";

export interface Question {
  id: number;
  profile: ProfileKey;
  en: string;
  ar: string;
}

export const QUESTIONS: Question[] = [
  { id: 1,  profile: "pioneer",    en: "I enjoy experimenting with new ideas even if the outcome is uncertain.",      ar: "أستمتع بتجربة أفكار جديدة حتى لو كانت النتائج غير مؤكدة." },
  { id: 2,  profile: "driver",     en: "I prefer making decisions quickly rather than overanalyzing.",                ar: "أُفضِّل اتخاذ القرارات بسرعة بدلاً من الإفراط في التحليل." },
  { id: 3,  profile: "guardian",   en: "I feel more comfortable when expectations and processes are clearly defined.", ar: "أشعر بالارتياح أكثر عندما تكون التوقعات والإجراءات واضحة ومحددة." },
  { id: 4,  profile: "integrator", en: "I naturally pay attention to team harmony and relationships.",                ar: "أهتم بطبيعتي بانسجام الفريق والعلاقات بين أعضائه." },
  { id: 5,  profile: "pioneer",    en: "I get energized by brainstorming and innovation.",                            ar: "تمنحني جلسات العصف الذهني والابتكار طاقة وحماساً." },
  { id: 6,  profile: "driver",     en: "I become impatient when discussions take too long without action.",           ar: "ينفد صبري عندما تطول النقاشات دون اتخاذ إجراء فعلي." },
  { id: 7,  profile: "guardian",   en: "I prefer detailed planning before starting execution.",                       ar: "أُفضِّل التخطيط التفصيلي قبل البدء في التنفيذ." },
  { id: 8,  profile: "integrator", en: "I usually consider how decisions may emotionally affect others.",             ar: "عادةً ما آخذ في الاعتبار الأثر العاطفي للقرارات على الآخرين." },
  { id: 9,  profile: "pioneer",    en: "I enjoy change and variety in the workplace.",                                ar: "أستمتع بالتغيير والتنوع في بيئة العمل." },
  { id: 10, profile: "driver",     en: "I focus strongly on achieving measurable results.",                           ar: "أُركِّز بقوة على تحقيق نتائج قابلة للقياس." },
  { id: 11, profile: "guardian",   en: "I value consistency and reliability in work processes.",                      ar: "أُقدِّر الاتساق والموثوقية في إجراءات العمل." },
  { id: 12, profile: "integrator", en: "I often help maintain collaboration between team members.",                   ar: "كثيراً ما أساهم في الحفاظ على التعاون بين أعضاء الفريق." },
  { id: 13, profile: "pioneer",    en: "I enjoy exploring possibilities more than following routines.",               ar: "أستمتع باستكشاف الاحتمالات أكثر من اتباع الروتين." },
  { id: 14, profile: "driver",     en: "I am comfortable taking charge during difficult situations.",                 ar: "أرتاح لتولّي زمام المبادرة في المواقف الصعبة." },
  { id: 15, profile: "guardian",   en: "I prefer accuracy and quality over speed.",                                   ar: "أُفضِّل الدقة والجودة على السرعة." },
  { id: 16, profile: "integrator", en: "I actively try to ensure everyone feels included in discussions.",            ar: "أحرص بفاعلية على أن يشعر الجميع بالمشاركة في النقاشات." },
  { id: 17, profile: "pioneer",    en: "I become bored when work becomes too repetitive.",                            ar: "أشعر بالملل عندما يصبح العمل متكرراً بشكل مفرط." },
  { id: 18, profile: "driver",     en: "I prefer direct and concise communication.",                                  ar: "أُفضِّل التواصل المباشر والمختصر." },
  { id: 19, profile: "guardian",   en: "I notice details and risks that others may overlook.",                        ar: "ألاحظ التفاصيل والمخاطر التي قد يُغفلها الآخرون." },
  { id: 20, profile: "integrator", en: "I naturally support and encourage people around me.",                         ar: "أدعم وأُشجِّع من حولي بشكل تلقائي." },
];

/**
 * Question mapping: 5 questions per profile for balanced assessment.
 * Each profile has dedicated questions targeting distinct behavioral traits.
 */
export const QUESTION_MAP: Record<ProfileKey, number[]> = {
  pioneer: [1, 5, 9, 13, 17],
  driver: [2, 6, 10, 14, 18],
  guardian: [3, 7, 11, 15, 19],
  integrator: [4, 8, 12, 16, 20],
};

/**
 * Question rationale: explains the behavioral intent behind each question.
 * Used for validation, documentation, and interpretation.
 */
export const QUESTION_RATIONALE: Record<number, string> = {
  1: "Pioneer — Tests comfort with experimentation and ambiguity in outcomes",
  2: "Driver — Measures decisiveness and preference for speed over analysis",
  3: "Guardian — Assesses need for clarity, process documentation, and structure",
  4: "Integrator — Evaluates attentiveness to team harmony and relationships",
  5: "Pioneer — Gauges energy from innovation and collaborative ideation",
  6: "Driver — Captures impatience signals in lengthy discussion scenarios",
  7: "Guardian — Reflects preference for detailed planning and risk mitigation",
  8: "Integrator — Measures empathy and consideration of emotional impact",
  9: "Pioneer — Tests adaptability and enthusiasm for workplace change",
  10: "Driver — Checks focus on measurable, concrete outcomes and KPIs",
  11: "Guardian — Validates appreciation for consistency, reliability, standards",
  12: "Integrator — Evaluates active role in maintaining team collaboration",
  13: "Pioneer — Tests exploratory mindset versus comfort with routine",
  14: "Driver — Measures confidence and assertiveness in pressure situations",
  15: "Guardian — Reflects prioritization of quality and precision over speed",
  16: "Integrator — Assesses proactive inclusion and consideration in discussions",
  17: "Pioneer — Captures boredom signals from repetitive work patterns",
  18: "Driver — Tests preference for direct, efficient communication",
  19: "Guardian — Measures attention to detail, risk perception, oversight capability",
  20: "Integrator — Gauges natural supportive and encouraging behaviors",
};

export const LIKERT = [
  { value: 5, en: "Strongly Agree",    ar: "أوافق بشدة" },
  { value: 4, en: "Agree",             ar: "أوافق" },
  { value: 3, en: "Neutral",           ar: "محايد" },
  { value: 2, en: "Disagree",          ar: "لا أوافق" },
  { value: 1, en: "Strongly Disagree", ar: "لا أوافق بشدة" },
];

export const PROFILE_ORDER: ProfileKey[] = ["pioneer", "driver", "guardian", "integrator"];

export const PROFILE_META: Record<ProfileKey, {
  en: { name: string; tagline: string };
  ar: { name: string; tagline: string };
  color: string; // css var
}> = {
  pioneer:    { en: { name: "Pioneer",    tagline: "Imaginative · Exploratory · Future-oriented" },
                ar: { name: "الرائد",     tagline: "خيالي · استكشافي · مُتطلِّع للمستقبل" }, color: "var(--pioneer)" },
  driver:     { en: { name: "Driver",     tagline: "Decisive · Results-oriented · Direct" },
                ar: { name: "القائد",     tagline: "حاسم · موجَّه نحو النتائج · مباشر" }, color: "var(--driver)" },
  guardian:   { en: { name: "Guardian",   tagline: "Structured · Detail-oriented · Reliable" },
                ar: { name: "الحارس",     tagline: "منظَّم · دقيق · موثوق" }, color: "var(--guardian)" },
  integrator: { en: { name: "Integrator", tagline: "Empathetic · Collaborative · Harmony-focused" },
                ar: { name: "المتكامل",   tagline: "متعاطف · تعاوني · يُركِّز على الانسجام" }, color: "var(--integrator)" },
};

export type Answers = Record<number, number>; // questionId -> 1..5

export interface ScoreRow {
  profile: ProfileKey;
  raw: number;        // sum of likert
  percent: number;    // calibrated 0-100
}

/**
 * Calibrated scoring:
 *  - 5 questions per profile × 1..5 likert = raw 5..25
 *  - Convert raw to a 0..1 "tendency": (raw-5)/20
 *  - Soft-normalize across profiles so distributions feel realistic (avoid 95%+ unless polarized)
 *  - Final percent = round(weight * 100), where weights are calibrated tendencies
 *    pulled toward a center to keep most users in the 40–80% range.
 */
export function scoreAnswers(answers: Answers): ScoreRow[] {
  const raw: Record<ProfileKey, number> = { pioneer: 0, driver: 0, guardian: 0, integrator: 0 };
  for (const q of QUESTIONS) {
    raw[q.profile] += answers[q.id] ?? 3;
  }
  // tendency 0..1
  const tendency: Record<ProfileKey, number> = {
    pioneer: (raw.pioneer - 5) / 20,
    driver: (raw.driver - 5) / 20,
    guardian: (raw.guardian - 5) / 20,
    integrator: (raw.integrator - 5) / 20,
  };
  // calibrate: compress extremes (sqrt-ish) then map to 35..90
  const calibrate = (t: number) => {
    const c = Math.pow(Math.max(0, Math.min(1, t)), 0.85);
    return Math.round(35 + c * 55); // 35..90
  };
  const rows: ScoreRow[] = PROFILE_ORDER.map((p) => ({
    profile: p,
    raw: raw[p],
    percent: calibrate(tendency[p]),
  }));
  return rows.sort((a, b) => b.percent - a.percent);
}

export const t = {
  en: {
    appTitle: "Behavioral Awareness Assessment",
    appSubtitle: "Internal Learning & Development Tool",
    company: "United Pharmacy · L&D",
    introHeading: "Understand how you naturally show up at work",
    introBody:
      "This short assessment helps you reflect on your natural workplace behavior across four practical profiles. It is designed for leadership development, communication workshops, and team collaboration programs.",
    estTime: "Estimated time: 5–7 minutes",
    instructionsTitle: "Before you begin",
    instructions: [
      "Answer based on how you typically behave at work, not how you wish to behave.",
      "There are no right or wrong answers.",
      "Most people show a blend of tendencies — that is expected and healthy.",
      "Your results are for personal reflection and development conversations.",
    ],
    disclaimer:
      "This is an internally designed behavioral awareness tool inspired by Business Chemistry principles and intended for learning and development purposes only. It is not an official Deloitte Business Chemistry assessment.",
    begin: "Begin Assessment",
    question: "Question",
    of: "of",
    back: "Back",
    next: "Next",
    submit: "View My Report",
    progress: "Progress",
    answerRequired: "Please select an answer to continue",
    yourReport: "Your Behavioral Report",
    generatedOn: "Generated on",
    primary: "Primary Profile",
    secondary: "Secondary Profile",
    alignment: "Behavioral Alignment",
    alignmentOverview: "Behavioral Alignment Overview",
    alignmentNote:
      "Scores represent behavioral alignment, not a fixed personality classification. Most individuals show meaningful primary and secondary tendencies.",
    profileTable: "Profile Summary",
    profile: "Profile",
    score: "Alignment",
    profileSummary: "Profile Summary",
    workplaceOrientation: "Workplace Orientation",
    strengths: "Workplace Strengths",
    communication: "Communication Preferences",
    development: "Development Areas",
    collaborate: "How to Collaborate With This Profile",
    pressure: "Behavior Under Pressure",
    secondaryHeading: "How Your Secondary Profile Complements You",
    download: "Download PDF",
    restart: "Retake Assessment",
    lang: "العربية",
  },
  ar: {
    appTitle: "تقييم الوعي السلوكي في بيئة العمل",
    appSubtitle: "أداة داخلية للتعلُّم والتطوير",
    company: "صيدلية المتحدة · التعلُّم والتطوير",
    introHeading: "افهم كيف تتصرّف بطبيعتك في بيئة العمل",
    introBody:
      "هذا التقييم القصير يساعدك على التأمُّل في سلوكك المهني الطبيعي ضمن أربعة أنماط عملية. صُمِّم لخدمة برامج تطوير القيادات وورش التواصل وبرامج تعاون الفِرق.",
    estTime: "الوقت المتوقَّع: ٥–٧ دقائق",
    instructionsTitle: "قبل أن تبدأ",
    instructions: [
      "أجب بناءً على سلوكك الفعلي في العمل، لا كما تتمنى أن تكون.",
      "لا توجد إجابات صحيحة أو خاطئة.",
      "غالبية الأفراد يُظهرون مزيجاً من الميول، وهذا أمر طبيعي وصحي.",
      "نتائجك مخصَّصة للتأمُّل الشخصي وحوارات التطوير المهني.",
    ],
    disclaimer:
      "هذه أداة داخلية مُصمَّمة للوعي السلوكي مستوحاة من مبادئ Business Chemistry لأغراض التعلُّم والتطوير فقط، وليست تقييماً رسمياً من Deloitte Business Chemistry.",
    begin: "ابدأ التقييم",
    question: "سؤال",
    of: "من",
    back: "السابق",
    next: "التالي",
    submit: "عرض التقرير",
    progress: "التقدُّم",
    answerRequired: "يرجى اختيار إجابة للمتابعة",
    yourReport: "تقريرك السلوكي",
    generatedOn: "تاريخ الإنشاء",
    primary: "النمط الأساسي",
    secondary: "النمط الثانوي",
    alignment: "المحاذاة السلوكية",
    alignmentOverview: "نظرة عامة على المحاذاة السلوكية",
    alignmentNote:
      "تُمثِّل النِّسب محاذاةً سلوكية وليست تصنيفاً ثابتاً للشخصية. يُظهر معظم الأفراد ميولاً أساسية وثانوية واضحة.",
    profileTable: "ملخَّص الأنماط",
    profile: "النمط",
    score: "نسبة المحاذاة",
    profileSummary: "ملخَّص النمط",
    workplaceOrientation: "التوجُّه في بيئة العمل",
    strengths: "نقاط القوة في العمل",
    communication: "تفضيلات التواصل",
    development: "مجالات التطوير",
    collaborate: "كيفية التعاون مع هذا النمط",
    pressure: "السلوك تحت الضغط",
    secondaryHeading: "كيف يُكمِّل نمطك الثانوي نمطك الأساسي",
    download: "تنزيل PDF",
    restart: "إعادة التقييم",
    lang: "English",
  },
} as const;

export interface ProfileNarrative {
  summary: string;
  orientation: string;
  strengths: string[];
  communication: string[];
  development: string[];
  collaborate: string[];
  pressure: string[];
  complement: string; // when shown as secondary
}

export const NARRATIVES: Record<Lang, Record<ProfileKey, ProfileNarrative>> = {
  en: {
    pioneer: {
      summary:
        "Pioneers are imaginative, adaptable, and energized by possibility. They thrive in ambiguity and bring momentum to new ideas, often shaping direction before details are settled.",
      orientation:
        "Future-focused and exploratory. Drawn to opportunity, change, and what could be — rather than what already exists.",
      strengths: [
        "Generates fresh ideas and unconventional solutions",
        "Adapts quickly to shifting priorities and ambiguity",
        "Inspires enthusiasm and momentum across teams",
        "Sees opportunities others may miss",
      ],
      communication: [
        "Prefers open, conversational, and visual discussions",
        "Energized by whiteboarding and brainstorming formats",
        "Decides through exploration and possibility-thinking",
        "Welcomes feedback framed as ideas to build on",
      ],
      development: [
        "May overlook execution detail and operational risk",
        "Can shift focus before initiatives are fully delivered",
        "Should pair with structured colleagues for follow-through",
        "May need to slow down to bring others along",
      ],
      collaborate: [
        "Bring options and possibilities, not just one answer",
        "Allow space for exploration before locking decisions",
        "Use visual or narrative framing in meetings",
        "Delegate outcomes and creative latitude rather than rigid tasks",
        "Give feedback as a forward-looking conversation",
      ],
      pressure: [
        "May become scattered or jump between priorities",
        "Communication can turn abstract or big-picture only",
        "Risk of underestimating execution complexity",
        "Tendency to seek novelty instead of resolving the current issue",
      ],
      complement:
        "A Pioneer secondary brings creative range and adaptability to your primary style — helpful for renewing momentum and exploring new approaches when routines feel stuck.",
    },
    driver: {
      summary:
        "Drivers are decisive, results-oriented, and direct. They move fast, value outcomes over process, and bring clarity and pace to teams navigating complex work.",
      orientation:
        "Outcome-focused and action-driven. Motivated by clear targets, accountability, and visible progress.",
      strengths: [
        "Drives clarity, pace, and accountability",
        "Comfortable making tough decisions with incomplete data",
        "Sets a strong performance bar for the team",
        "Cuts through ambiguity to define the next move",
      ],
      communication: [
        "Prefers concise, direct, and agenda-driven meetings",
        "Decides quickly, often during the meeting itself",
        "Values data and logic over lengthy narrative",
        "Welcomes feedback that is candid and outcome-focused",
      ],
      development: [
        "May appear too direct or impatient with others' pace",
        "Can move past input before everyone has weighed in",
        "Risk of prioritising speed over team alignment",
        "Could benefit from pausing to acknowledge effort, not only results",
      ],
      collaborate: [
        "Lead with the conclusion, then the rationale",
        "Bring prepared options and a clear recommendation",
        "Keep meetings short, structured, and outcome-led",
        "Delegate ownership with clear KPIs and timelines",
        "Give feedback directly and tie it to results",
      ],
      pressure: [
        "Communication can become blunt or transactional",
        "May bypass collaboration to push decisions through",
        "Risk of overlooking team morale during intense periods",
        "Tendency to escalate pace rather than reassess approach",
      ],
      complement:
        "A Driver secondary adds decisiveness and execution edge to your primary style — useful when momentum stalls or trade-offs need to be made quickly.",
    },
    guardian: {
      summary:
        "Guardians are structured, detail-oriented, and reliable. They bring rigor, risk awareness, and operational discipline that turn ideas into dependable delivery.",
      orientation:
        "Process-focused and quality-driven. Anchored in standards, accuracy, and predictable execution.",
      strengths: [
        "Brings discipline, accuracy, and risk awareness",
        "Designs durable processes and reliable delivery",
        "Anticipates issues before they escalate",
        "Provides a steady, trusted presence on the team",
      ],
      communication: [
        "Prefers structured agendas, written context, and clear inputs",
        "Decides after reviewing data and validating assumptions",
        "Values precise, well-prepared communication",
        "Welcomes feedback that is specific, evidence-based, and respectful",
      ],
      development: [
        "May resist change before exploring its full potential",
        "Can slow decision-making by seeking more certainty than available",
        "Risk of focusing on what could go wrong over what could go right",
        "Could open earlier to iterative or experimental approaches",
      ],
      collaborate: [
        "Share context, data, and rationale in advance of meetings",
        "Respect process and notice periods for change",
        "Frame innovation with risk mitigation alongside upside",
        "Delegate with clear scope, standards, and checkpoints",
        "Give feedback factually, with specific examples",
      ],
      pressure: [
        "May narrow into detail and lose the wider picture",
        "Risk of becoming risk-averse and slowing decisions",
        "Communication can turn cautious or formal",
        "Tendency to revisit plans rather than commit to one",
      ],
      complement:
        "A Guardian secondary adds discipline and quality control to your primary style — strengthening delivery, risk awareness, and operational consistency.",
    },
    integrator: {
      summary:
        "Integrators are relationship-oriented, empathetic, and collaborative. They build trust, surface diverse perspectives, and keep teams aligned around shared purpose.",
      orientation:
        "People-focused and harmony-driven. Motivated by inclusion, psychological safety, and collective outcomes.",
      strengths: [
        "Builds trust and psychological safety across the team",
        "Surfaces quieter perspectives and broadens alignment",
        "Navigates interpersonal dynamics with sensitivity",
        "Holds the team together during change and uncertainty",
      ],
      communication: [
        "Prefers inclusive, conversational, and reflective discussions",
        "Decides by aligning stakeholders and reading the room",
        "Values context, intent, and impact on people",
        "Welcomes feedback that is constructive and relational",
      ],
      development: [
        "May avoid difficult conversations to preserve harmony",
        "Can defer personal views to consensus",
        "Risk of slowing decisions through over-alignment",
        "Could practice more direct, candid feedback",
      ],
      collaborate: [
        "Allow time for context, intent, and team input",
        "Acknowledge people impact alongside business outcomes",
        "Use inclusive meeting formats that invite contribution",
        "Delegate with clear purpose and supportive check-ins",
        "Give feedback privately, constructively, and with care",
      ],
      pressure: [
        "May absorb team stress and over-mediate conflict",
        "Risk of avoiding necessary confrontation",
        "Communication can become indirect to protect relationships",
        "Tendency to prioritise harmony over needed clarity",
      ],
      complement:
        "An Integrator secondary adds empathy and collaboration to your primary style — helpful for managing change, building trust, and keeping the team aligned.",
    },
  },
  ar: {
    pioneer: {
      summary:
        "الرواد أصحاب خيال وقدرة على التكيُّف، تُحفِّزهم الإمكانات الجديدة. يزدهرون في بيئات الغموض ويمنحون الأفكار الجديدة زخماً، وغالباً ما يُحدِّدون الاتجاه قبل اكتمال التفاصيل.",
      orientation:
        "توجُّه مستقبلي واستكشافي، ينجذب نحو الفرص والتغيير وما يُمكن أن يكون، أكثر من التركيز على القائم بالفعل.",
      strengths: [
        "توليد أفكار جديدة وحلول غير تقليدية",
        "التكيُّف السريع مع الأولويات المتغيّرة والغموض",
        "إلهام الفِرق وبثُّ الحماس والزخم",
        "رصد الفرص التي قد يُغفلها الآخرون",
      ],
      communication: [
        "يُفضِّل النقاشات المفتوحة والمرئية والحوارية",
        "تُحفِّزه جلسات العصف الذهني والرسم على اللوح",
        "يتَّخذ القرار من خلال الاستكشاف والتفكير في الاحتمالات",
        "يتقبَّل الملاحظات حين تُطرَح كأفكار يُمكن البناء عليها",
      ],
      development: [
        "قد يُغفِل تفاصيل التنفيذ والمخاطر التشغيلية",
        "قد يُحوِّل اهتمامه قبل اكتمال تسليم المبادرات",
        "يحتاج إلى زملاء مُنظَّمين لاستكمال المتابعة",
        "قد يحتاج إلى إبطاء وتيرته ليُواكِبه الآخرون",
      ],
      collaborate: [
        "اطرح خيارات وإمكانات، لا إجابة واحدة فقط",
        "امنحه مساحة للاستكشاف قبل تثبيت القرار",
        "استخدم العرض البصري أو السردي في الاجتماعات",
        "فوِّض النتائج مع منحه حرية إبداعية بدلاً من مهام صارمة",
        "قدِّم الملاحظات في صورة حوار تطلُّعي",
      ],
      pressure: [
        "قد يتشتَّت ويتنقَّل بين الأولويات",
        "قد يُصبِح تواصله مُجرَّداً أو في حدود الصورة الكُبرى",
        "قد يستهين بتعقيدات التنفيذ",
        "ميل للبحث عن الجديد بدلاً من حلِّ المشكلة الحالية",
      ],
      complement:
        "وجود نمط الرائد كنمط ثانوي يُضيف مرونة وقدرة على الابتكار إلى نمطك الأساسي، ويُفيد في تجديد الزخم واستكشاف مقاربات جديدة عند ركود الروتين.",
    },
    driver: {
      summary:
        "القادة حاسمون وموجَّهون نحو النتائج ومباشرون. يتحرَّكون بسرعة، ويُقدِّمون النتائج على الإجراءات، ويمنحون الفِرق وضوحاً وسرعة في إنجاز الأعمال المعقَّدة.",
      orientation:
        "توجُّه يستهدف النتائج ويعتمد على الفعل، تُحفِّزه الأهداف الواضحة والمساءلة والتقدُّم الملموس.",
      strengths: [
        "يمنح الفريق وضوحاً وسرعة ومساءلة",
        "يرتاح لاتخاذ قرارات صعبة ببيانات غير مكتملة",
        "يضع معياراً عالياً للأداء",
        "يُحدِّد الخطوة التالية ويقطع الغموض",
      ],
      communication: [
        "يُفضِّل اجتماعات قصيرة مُباشرة بأجندة واضحة",
        "يتَّخذ القرار بسرعة، غالباً داخل الاجتماع نفسه",
        "يُقدِّر البيانات والمنطق على السرد المطوَّل",
        "يتقبَّل الملاحظات الصريحة المرتبطة بالنتائج",
      ],
      development: [
        "قد يبدو مباشراً بشكل مُفرَط أو غير صبور مع وتيرة الآخرين",
        "قد يتجاوز مدخلات الفريق قبل أن يُشارك الجميع",
        "قد يُغلِّب السرعة على توافق الفريق",
        "يُستحسَن التوقُّف لتقدير الجهد وليس النتائج فقط",
      ],
      collaborate: [
        "ابدأ بالخلاصة ثم اشرح المُبرِّرات",
        "اعرض خيارات جاهزة مع توصية واضحة",
        "اجعل الاجتماعات قصيرة ومُنظَّمة ومُوجَّهة نحو النتائج",
        "فوِّض الملكية مع مؤشرات أداء وجداول زمنية واضحة",
        "قدِّم الملاحظات بصراحة واربطها بالنتائج",
      ],
      pressure: [
        "قد يُصبِح تواصله حادَّاً أو عمليَّاً للغاية",
        "قد يتجاوز التشاور لدفع القرارات",
        "قد يُغفِل معنويات الفريق في الفترات المُكثَّفة",
        "ميل لرفع الوتيرة بدلاً من إعادة تقييم المقاربة",
      ],
      complement:
        "وجود نمط القائد كنمط ثانوي يُضيف حسماً وقدرة على التنفيذ إلى نمطك الأساسي، ويُفيد عند ركود الزخم أو الحاجة إلى اتخاذ قرارات سريعة.",
    },
    guardian: {
      summary:
        "الحُرَّاس مُنظَّمون ودقيقون وموثوقون. يجلبون الانضباط والوعي بالمخاطر، ويُحوِّلون الأفكار إلى تنفيذ مُعتَمَد عليه.",
      orientation:
        "توجُّه يُركِّز على الإجراءات والجودة، يرتكز على المعايير والدقَّة والتنفيذ المُنتظم.",
      strengths: [
        "يجلب الانضباط والدقَّة والوعي بالمخاطر",
        "يُصمِّم إجراءات مُستدامة وتسليماً موثوقاً",
        "يتوقَّع المشكلات قبل تصاعدها",
        "يُمثِّل حضوراً ثابتاً وموثوقاً في الفريق",
      ],
      communication: [
        "يُفضِّل الأجندات المنظَّمة والمعلومات المُسبَقة",
        "يتَّخذ القرار بعد مراجعة البيانات والتحقُّق من الافتراضات",
        "يُقدِّر التواصل الدقيق المُعَدَّ جيداً",
        "يتقبَّل الملاحظات المُحدَّدة المُستنِدة إلى وقائع",
      ],
      development: [
        "قد يقاوم التغيير قبل استكشاف إمكاناته الكاملة",
        "قد يُبطِئ القرار سعياً وراء يقين غير مُتاح",
        "قد يُركِّز على ما قد يفشل أكثر مما قد ينجح",
        "يُستحسَن الانفتاح المبكر على المقاربات التجريبية",
      ],
      collaborate: [
        "شارك السياق والبيانات والمُبرِّرات قبل الاجتماعات",
        "احترم الإجراءات وفترات الإشعار عند التغيير",
        "اطرح الابتكار مع خطة للحدِّ من المخاطر",
        "فوِّض بنطاق ومعايير ونقاط مراجعة واضحة",
        "قدِّم الملاحظات بأمثلة محدَّدة ووقائع",
      ],
      pressure: [
        "قد يغرق في التفاصيل ويفقد الصورة الأوسع",
        "قد يُصبِح مُتحفِّظاً تجاه المخاطر فيُبطِئ القرار",
        "قد يميل تواصله إلى الحذر والرسميَّة",
        "ميل لإعادة مراجعة الخطط بدلاً من الالتزام بإحداها",
      ],
      complement:
        "وجود نمط الحارس كنمط ثانوي يُضيف انضباطاً وضبط جودة إلى نمطك الأساسي، ويُعزِّز التسليم والوعي بالمخاطر والاتساق التشغيلي.",
    },
    integrator: {
      summary:
        "المتكاملون يُركِّزون على العلاقات ويتميَّزون بالتعاطف والتعاون. يبنون الثقة، ويُبرِزون وجهات النظر المتنوِّعة، ويُحافظون على توافق الفِرق حول هدف مشترك.",
      orientation:
        "توجُّه يُركِّز على الإنسان والانسجام، يُحفِّزه الشمول والأمان النفسي والنتائج الجماعية.",
      strengths: [
        "يبني الثقة والأمان النفسي داخل الفريق",
        "يُبرِز الأصوات الأقل وضوحاً ويُوسِّع التوافق",
        "يتعامل مع الديناميكيات الإنسانية بحساسية",
        "يحفظ تماسك الفريق أثناء التغيير والغموض",
      ],
      communication: [
        "يُفضِّل النقاشات الشاملة والتأمُّلية",
        "يتَّخذ القرار بمواءمة أصحاب المصلحة وقراءة الأجواء",
        "يُقدِّر السياق والنية والأثر على الناس",
        "يتقبَّل الملاحظات البنَّاءة والإنسانية في طرحها",
      ],
      development: [
        "قد يتجنَّب المحادثات الصعبة حفاظاً على الانسجام",
        "قد يُؤجِّل رأيه الشخصي مُجاراةً للتوافق",
        "قد يُبطِئ القرار بسبب الإفراط في السعي للتوافق",
        "يُمكنه تطوير قدرته على تقديم ملاحظات أكثر صراحة",
      ],
      collaborate: [
        "اترك مساحة للسياق والنية ومدخلات الفريق",
        "اعترف بالأثر الإنساني إلى جانب نتائج الأعمال",
        "استخدم صيغ اجتماعات شاملة تُتيح المشاركة",
        "فوِّض بهدف واضح ومتابعة داعمة",
        "قدِّم الملاحظات بشكل خاص وبنَّاء وبعناية",
      ],
      pressure: [
        "قد يتحمَّل ضغط الفريق ويُفرِط في الوساطة",
        "قد يتجنَّب المواجهة الضرورية",
        "قد يُصبِح تواصله غير مُباشر حفاظاً على العلاقات",
        "ميل لتقديم الانسجام على الوضوح المطلوب",
      ],
      complement:
        "وجود نمط المتكامل كنمط ثانوي يُضيف تعاطفاً وتعاوناً إلى نمطك الأساسي، ويُفيد في إدارة التغيير وبناء الثقة والحفاظ على توافق الفريق.",
    },
  },
};
