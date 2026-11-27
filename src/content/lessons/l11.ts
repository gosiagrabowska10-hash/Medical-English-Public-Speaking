import type { LessonSpec } from "../lesson-types";

/**
 * L11 — Openings and Closings That Work (Module 4, Presentation Architecture).
 * Written 27 November 2026 to the approved Content Standard, for review.
 * Builds on L01 (opening without apology), L02 (the first thirty seconds) and L10 (the core message).
 */
export const L11: LessonSpec = {
  code: "L11",
  week: 4,
  minutes: 60,
  aiTeacher: "presentation-coach",
  status: "ready",
  body: {
    intro:
      "The first and last minutes of a presentation do more work than any other part. In the opening, the audience decides whether your talk is relevant to them and whether they can follow you. In the close, they decide what to take away. Many medical talks waste both: they open with thanks, an outline slide and a long background, and they end with “That’s all — any questions?”. In L01 you practised opening without apology, and in L02 you rehearsed your first thirty seconds to manage nerves. This lesson is about content: what an opening and a closing must achieve, which devices work for medical audiences, and how to write both so that they carry the core message you defined in L10. You will finish with a scripted opening and closing for a real talk, and a habit you can use for every presentation, from a five-minute oral to a keynote.",
    objectives: [
      "Write an opening that establishes relevance, a gap or question, your core message and the route of the talk within about one minute",
      "Choose an opening device suited to the audience and setting, and avoid devices that waste the first minute",
      "Write a closing that restates the message, gives a specific take-home and call to action, and ends on a planned final sentence",
      "Signpost the structure of a talk so that listeners always know where they are",
    ],
    sections: [
      {
        heading: "Why beginnings and endings carry so much weight",
        paragraphs: [
          "Many speakers work on the assumption that the start and the end of a talk matter most. The research usually cited for this concerns recall of items in word lists, not attention or memory during presentations (see the evidence note below), so it supports the assumption only by analogy. As a professional recommendation, the conclusion is nevertheless sound: plan a strong opening and a strong closing, put your message in both, and do not spend those moments on administration.",
          "A talk that closes clearly, on its main point, also leaves a different impression from one that runs out of time and stops in the middle of a slide. This is professional experience rather than a research finding. You cannot control everything an audience remembers, but you can make sure that the last thing they hear is the thing you most want them to keep.",
          "Optional note: in a well-known colonoscopy study (reference 2), patients’ later ratings of discomfort depended strongly on the worst moment and the final minutes. It concerns evaluations of medical procedures, not audience memory of presentations, and is not used as evidence in this lesson.",
        ],
        callout: {
          kind: "evidence",
          text: "In classic memory research, items at the beginning and end of a list were recalled better than those in the middle (primacy and recency effects). The research used word lists, not presentations; it is cited because it illustrates why the start and the end of a talk deserve special care.",
          refs: [1],
        },
      },
      {
        heading: "The four jobs of an opening",
        paragraphs: [
          "An effective opening does four jobs, usually in this order. It establishes relevance: why this topic matters to these people, today. It opens a gap: the question, problem or uncertainty that your work addresses. It states the message, or at least promises it clearly. And it gives a route: two or three signposts that show how the talk will proceed.",
          "In practice this can take less than a minute. “Every one of us has seen an older patient become confused after surgery. On a busy ward, we often notice it a day or two late. Today I want to show you that a two-minute screen on the first post-operative day finds delirium a day earlier. I’ll show you why we tried it, how it works on the ward, and what happened.” Relevance, gap, message, route — and the audience knows exactly why to listen.",
          "Thanks to the chair and organisers belong in a single short sentence, or in your first answer to a question. Your name and affiliation are usually announced by the chair and printed on the programme. An outline slide that lists “Introduction, Methods, Results, Discussion” adds nothing; a spoken route that names your actual points adds a great deal.",
        ],
      },
      {
        heading: "Opening devices for medical audiences",
        paragraphs: [
          "Four devices work reliably with medical audiences. A short clinical vignette makes the problem concrete: “A seventy-eight-year-old man is admitted with a hip fracture on a Friday night…” It must be fictional or composite and contain no identifiable details: calling a case composite does not make a rare diagnosis, an exact date or place, or a recognisable combination of details acceptable. A striking, verified number gives scale — “one in five patients over seventy” is an illustrative figure only, to be replaced in a real talk by a number you have checked and can cite. A genuine question engages the audience’s curiosity, provided you answer it. A contrast between what people assume and what is true can be powerful, if it does not caricature colleagues.",
          "Some devices rarely work, especially across cultures and languages. Jokes depend on shared references and timing, and they are the first thing to fail in a second language. Famous quotations are often misattributed and feel generic. Rhetorical questions that you do not answer frustrate an expert audience. Dictionary definitions waste time on what everyone knows. And opening with the limitations of your study undermines your message before you have stated it.",
        ],
        callout: {
          kind: "evidence",
          text: "Research on curiosity suggests that it arises when people become aware of a gap in their knowledge that they want to close. A well-chosen question or unexpected finding in the opening creates such a gap — provided the talk then closes it.",
          refs: [3],
        },
      },
      {
        heading: "Signposting: keeping the audience with you",
        paragraphs: [
          "Readers can see headings, page numbers and how much text remains. Listeners cannot. Signposts are the spoken equivalent: short phrases that tell the audience where they are, what has just finished and what comes next. “So that was the problem. Now let me show you what we changed.” They feel repetitive to the speaker; to the audience they are a map.",
          "Use the route from your opening as your structure, and refer back to it. If you promised three points, say “The second point is…” and “Finally, the third point…”. At each transition, link the point you have just made to your message. In a second language, signposts have a further advantage: they are fixed phrases that you can prepare in advance, so they give you a moment of fluency and a breath at exactly the points where you change direction.",
        ],
        callout: {
          kind: "recommendation",
          text: "Plan a signpost for every transition between your supporting points and write it on your speaker notes. This is Academy guidance drawn from professional practice in presentation teaching.",
        },
      },
      {
        heading: "Closings that are remembered",
        paragraphs: [
          "A strong closing has three parts. First, a signal that you are concluding: “To conclude…” or “Let me finish with…”. Audiences re-engage at this signal, so make sure what follows is worth it. Second, the message, restated in the same words you used in the opening, with the evidence from your supporting points briefly recalled. Third, a take-home and, where appropriate, a call to action: what the audience should think, check or do differently.",
          "A call to action works best when it is specific and realistic. “We should all improve delirium care” changes nothing. “If your ward does not screen on day one, try the two-minute test for one month and audit what you find” gives listeners something they can actually do. Specific plans that say when, where and how are more likely to be acted on than general intentions.",
          "How direct to be depends on the audience, the culture and your position. A trainee addressing senior colleagues, or a guest at another institution, may prefer a diplomatic form: “Would it be worth trying the screen on one ward for a month?” or “I’d like to suggest that we review fluid charts at the morning round.” A softer request should still be specific.",
          "Plan your final sentence word for word and end on it. Then thank the audience, and stop. Avoid ending with “That’s all”, with an apology for running over, or with a slide titled “Questions?” that replaces your message. If there is time for questions, many experienced speakers add a brief return to the message after the last answer: “Thank you for the questions. The point I’d like you to take away is still…”",
        ],
        callout: {
          kind: "evidence",
          text: "Research on implementation intentions has found that people are more likely to act on a goal when they specify when, where and how they will act. The studies concern individual goals rather than audiences, but they support making a call to action concrete.",
          refs: [4],
        },
      },
      {
        heading: "Scripting and rehearsing the edges",
        paragraphs: [
          "Most experienced presenters do not script whole talks, but many script the first and last minute word for word. These are the moments when nerves are highest and when the exact words matter most. Write both, read them aloud, and cut every sentence that does not do one of the jobs described above.",
          "Then rehearse them until you can deliver them while looking at the audience rather than at your notes, combining the content from this lesson with the delivery skills from L02, L07 and L08: a pause before the message, a clear falling tone at the end of it, and eye contact on the final sentence. Your opening and closing will become the most reliable parts of every talk you give.",
        ],
      },
    ],
    examples: [
      {
        title: "The same opening, rewritten",
        setting: "Cardiology congress, eight-minute oral presentation",
        text: "First draft (fictional): “Good morning. First of all I would like to thank the organisers for inviting me. My name is Dr K. and I work in the department of cardiology. Today I will talk about heart failure. Here is the outline: introduction, methods, results and conclusions. Heart failure is defined as…” — fifty seconds, and no reason to listen. Rewritten: “Thank you, Chair. Almost half of our patients with heart failure are readmitted within a year, and many of those admissions begin with a weight gain that nobody saw. We asked whether a daily weight message to a nurse could change that. In our pilot, it was associated with fewer readmissions — and I’ll show you the result, the cost, and what we would do differently.” Forty seconds, with relevance, gap, message and route. (Illustrative figures.)",
      },
      {
        title: "A vignette that respects confidentiality",
        setting: "Paediatric grand round, quality-improvement project",
        text: "A fictional paediatrician opens with: “Imagine a four-year-old with a fever, arriving at 3 a.m. on a night when the department is full. Her parents have waited two hours. She has sepsis, and the first antibiotic dose comes three hours after arrival.” She then adds: “This is a composite case, changed so that no child could be recognised, but the delays are typical of what we saw.” The vignette makes the problem real for every clinician in the room without identifiable details, and the statement keeps the talk honest. (Illustrative times.)",
      },
      {
        title: "A closing that changed practice",
        setting: "Surgical audit meeting, ten-minute presentation",
        text: "A fictional surgical trainee ends a talk on post-operative fluid prescribing: “To conclude: on our wards, one in three fluid prescriptions after day two was unnecessary, and stopping them did not cause harm. So here is my request: from next Monday, please review every fluid chart at the morning ward round, using the one-line checklist on your handout. We will re-audit in March. Thank you.” The final sentence is a date, the call to action is specific, and the audit lead asks for the checklist after the session. To a more senior audience, the trainee might instead say: “I’d like to suggest that we try this for three months; I’ll share the re-audit in March.” (Illustrative figures.)",
      },
    ],
    phrase_bank: [
      { phrase: "Thank you, Chair.", use: "Brief acknowledgement before your opening", register: "Formal", pronunciation: "One short phrase; then pause.", example: "Thank you, Chair. // Almost half of our patients…" },
      { phrase: "Every one of us has seen…", use: "Establishing relevance through shared experience", register: "Neutral", example: "Every one of us has seen a patient become confused after surgery." },
      { phrase: "What we don’t yet know is…", use: "Opening the gap or question", register: "Neutral – formal", example: "What we don’t yet know is whether screening changes outcomes." },
      { phrase: "Today I want to show you that…", use: "Stating your message in the opening", register: "Neutral", pronunciation: "Stress the key word of the message that follows.", example: "Today I want to show you that a two-minute screen finds delirium a day earlier." },
      { phrase: "I’ll do this in three steps.", use: "Giving the route", register: "Neutral", example: "I’ll do this in three steps: the problem, our approach and the results." },
      { phrase: "So that was…; now let’s look at…", use: "Signposting a transition", register: "Neutral", example: "So that was the problem; now let’s look at what we changed." },
      { phrase: "This is a composite case.", use: "Stating that a vignette is not a real, identifiable patient", register: "Neutral – formal", example: "This is a composite case, but every element is familiar." },
      { phrase: "To conclude, …", use: "Signalling the closing", register: "Neutral – formal", pronunciation: "Pause after “conclude”.", example: "To conclude, // early screening is feasible and finds delirium sooner." },
      { phrase: "So here is my request:", use: "Introducing a specific call to action", register: "Neutral", example: "So here is my request: try the screen for one month on your ward." },
      { phrase: "Would it be worth trying…?", use: "A diplomatic call to action for senior or unfamiliar audiences", register: "Formal, tentative", pronunciation: "Rising tone at the end of the question.", example: "Would it be worth trying the two-minute screen on one ward for a month?" },
      { phrase: "I’d like to suggest that we…", use: "A softer but specific request", register: "Formal", example: "I’d like to suggest that we review fluid charts at the morning round and compare results in March." },
      { phrase: "The point I’d like you to take away is…", use: "Restating the message after questions", register: "Neutral", example: "Thank you for the questions. The point I’d like you to take away is still this: screen on day one." },
    ],
    phrase_practice:
      "Write your opening using four expressions from the phrase bank — one for each job — and your closing using “To conclude” and “So here is my request”. Read both aloud, then replace any phrase that does not sound like you with your own words, keeping the function.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show the same talk opened in two ways — the conventional opening with thanks, outline and definitions, and a rewritten opening with relevance, gap, message and route — and closed in two ways, ending with “Any questions?” and ending with a planned final sentence. Notice where the audience’s attention is directed in each version and how long each opening takes before the message appears.",
    mistakes: [
      { mistake: "Spending the first minute on thanks, name and outline", correction: "One sentence of thanks; then relevance, gap, message and route." },
      { mistake: "Starting with a joke or a famous quotation", correction: "Use a vignette, a verified number, a genuine question or a contrast." },
      { mistake: "Asking a question and never answering it", correction: "Answer every question you raise in the opening, ideally in the close." },
      { mistake: "Using a real, recognisable patient story", correction: "Use a fictional or composite case with no identifiable details, and say that it is composite." },
      { mistake: "Ending with “That’s all — any questions?”", correction: "End with your message and a planned final sentence; then thank the audience." },
      { mistake: "A vague call to action", correction: "Say who should do what, where and by when — directly or diplomatically, to suit the audience." },
    ],
    reflection: [
      "How did the last three talks you attended begin and end? Which would you copy?",
      "What is the first sentence of your next talk going to be — and which job does it do?",
      "What do you want your audience to do on the Monday after your talk?",
    ],
    references: [
      "Murdock, B. B. (1962). The serial position effect of free recall. Journal of Experimental Psychology, 64(5), 482–488.",
      "Redelmeier, D. A., & Kahneman, D. (1996). Patients’ memories of painful medical treatments: Real-time and retrospective evaluations of two minimally invasive procedures. Pain, 66(1), 3–8.",
      "Loewenstein, G. (1994). The psychology of curiosity: A review and reinterpretation. Psychological Bulletin, 116(1), 75–98.",
      "Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.",
    ],
  },
  exercise: {
    title: "Rewrite an opening and a closing",
    instructions: "Rewrite the first and last minute of one of your own talks so that each does its jobs.",
    steps: [
      "Write down, as accurately as you can, how one of your recent talks began and ended.",
      "Rewrite the opening so that it establishes relevance, opens a gap, states your core message (from L10) and gives a route — in no more than about 120 words.",
      "Choose one opening device (vignette, number, question or contrast) and check it: is it fictional or verified, and is it answered later?",
      "Rewrite the closing with a concluding signal, the message in the same words as the opening, a specific call to action and a final sentence — in no more than about 100 words.",
      "Read both aloud and time them; mark the pause before your message.",
    ],
    prompt: "Paste your original opening and closing, your rewritten versions, the device you chose and your timings.",
    min_chars: 400,
    model_answer:
      "Original opening (fictional): “Good afternoon, thank you for having me. I am a nephrologist. My talk is about hyperkalaemia. First a definition…”\nRewritten opening (92 words): “Thank you, Chair. Most of us have been called at night about a potassium of six point five — and most of us have wondered whether the result was real. In our hospital, one in four of those night-time results came from a haemolysed sample [illustrative figure]. Today I want to show you that a simple change to how we take samples can halve unnecessary night-time calls. I’ll show you the problem, the change we made in the emergency department, and what happened to the calls.” Device: a shared experience plus a local audit number. (All figures in this model answer are illustrative; in your own talk, use verified data.)\nOriginal closing: “So that’s it. Any questions?”\nRewritten closing (74 words): “To conclude: one in four night-time hyperkalaemia calls came from haemolysed samples, and a change in sampling technique halved them. So here is my request: if you work in the emergency department, use the new sampling checklist from next week, and we will share the call data with you in three months. Fewer false alarms means more time for the patients who really need us at night. Thank you.”\nTimings: opening 38 seconds; closing 31 seconds.",
    self_check: [
      "The opening does all four jobs: relevance, gap, message and route.",
      "The device is fictional or verified, and any question is answered.",
      "There is at most one short sentence of thanks before the content.",
      "The closing restates the message in the same words as the opening.",
      "The call to action says who, what and when, and the final sentence is planned.",
    ],
  },
  quiz: [
    {
      prompt: "Which four jobs should an opening do?",
      options: [
        "Establish relevance, open a gap or question, state the message and give a route",
        "Thank the organisers, introduce yourself, define terms and show the outline",
        "Tell a joke, present the methods, show the results and take questions",
        "State the limitations, apologise for your English, show the outline and begin",
      ],
      correct: 0,
      explanation: "Relevance, gap, message and route tell the audience why to listen, what you will argue and how the talk is organised.",
    },
    {
      scenario: true,
      prompt: "You want to open with a patient story. What is the right approach?",
      options: [
        "Use last week’s patient with the date changed",
        "Avoid stories completely in medical talks",
        "Use a fictional or composite case with no identifiable details, and say that it is composite",
        "Show the patient’s imaging with the name blurred",
      ],
      correct: 2,
      explanation: "Vignettes are powerful, but they must never be identifiable — even a composite case must not contain recognisable details. Saying that a case is composite keeps the presentation honest.",
    },
    {
      scenario: true,
      prompt: "You have six minutes. Your current opening thanks five people, shows an outline slide and defines the disease. What is the best change?",
      options: [
        "Speak faster so that the opening fits",
        "Replace it with one sentence of thanks, then relevance, gap, message and route",
        "Keep it, because politeness is essential",
        "Move the definition to the end",
      ],
      correct: 1,
      explanation: "The opening is when attention is highest; it should carry your message, not administration.",
    },
    {
      prompt: "Why are signposts especially important in spoken presentations?",
      options: [
        "They make the talk longer",
        "They replace the need for slides",
        "They are required by congress organisers",
        "Listeners cannot see headings or how much remains, so they need a spoken map",
      ],
      correct: 3,
      explanation: "Signposts are the spoken equivalent of headings; they help listeners follow the structure.",
    },
    {
      scenario: true,
      prompt: "Which call to action is most likely to lead to change?",
      options: [
        "“We should all think more about fluids.”",
        "“Fluids are important.”",
        "“Please review every fluid chart at the morning ward round from next Monday, using the checklist on your handout.”",
        "“Any questions?”",
      ],
      correct: 2,
      explanation: "Specific plans that say who, what and when are more likely to be acted on than general intentions.",
    },
    {
      scenario: true,
      prompt: "The question-and-answer session ends with a difficult technical question. What is a strong way to finish?",
      options: [
        "Briefly return to your message: “The point I’d like you to take away is still…”",
        "Say “That’s all” and leave the stage",
        "Apologise for not knowing everything",
        "Start a new topic",
      ],
      correct: 0,
      explanation: "A short return to the message ensures that it, not the last question, is what the audience remembers.",
    },
  ],
  assignment: {
    title: "Scripted opening and closing",
    brief:
      "Write the complete opening and closing of a real presentation you will give, based on the message map from L10. The opening (about 100–150 words) must establish relevance, open a gap, state your message and give a route; the closing (about 80–120 words) must signal the conclusion, restate the message, include a specific take-home or call to action and end on a planned final sentence. Mark the pauses and the stressed word of your message (L07). Add a short commentary (100–200 words) explaining your choice of opening device, how you made it accurate and non-identifiable, and how you would shorten both for a five-minute slot. The submission must contain at least 280 words in total (the sum of the minimum lengths of the three parts).",
    min_words: 280,
    required: true,
    criteria: [
      { criterion: "Opening", description: "Relevance, gap, message and route are all present, in about one minute." },
      { criterion: "Device", description: "The opening device suits the audience, is fictional or verified, and is resolved later in the talk." },
      { criterion: "Closing", description: "Concluding signal, restated message, specific call to action and a planned final sentence." },
      { criterion: "Consistency", description: "The message is stated in the same words in the opening and the closing." },
      { criterion: "Delivery marking", description: "Pauses and stress are marked as in L07." },
    ],
  },
  resources: [
    { title: "L11 Lesson handout", description: "The four jobs of an opening, opening devices, signpost phrases, closing structure and call-to-action checklist.", file_url: "/materials/lessons/L11-handout.pdf", is_sample: false },
  ],
};
