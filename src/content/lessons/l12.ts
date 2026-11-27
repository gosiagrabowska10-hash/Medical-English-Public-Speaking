import type { LessonSpec } from "../lesson-types";

/**
 * L12 — Slides as Visual Support (Module 4, Presentation Architecture).
 * Written 27 November 2026 to the approved Content Standard, for review.
 * Builds on L07 (look, pause, conclude), L09 (slides and clicker), L10 (core message) and L11 (signposting).
 */
export const L12: LessonSpec = {
  code: "L12",
  week: 4,
  minutes: 55,
  aiTeacher: "presentation-coach",
  status: "ready",
  body: {
    intro:
      "In medicine, slides often become the presentation. They are written as documents, read aloud by the speaker and photographed by an audience that has stopped listening. For a speaker working in a second language the temptation is even stronger: a full slide feels like a safety net. This lesson argues the opposite. Slides work best when they support what you say — showing the evidence for a claim that you make aloud — and when they are designed for people who see each one for a few seconds from the back of a room. You will learn the assertion–evidence approach, how to present data that can be read at a glance, how to make slides accessible to every member of an international audience, and how to speak from your slides without reading them. The lesson builds directly on your core message (L10) and your signposts (L11): every slide should make one point that supports them.",
    objectives: [
      "Rewrite a text-heavy slide as an assertion–evidence slide with a sentence headline and visual evidence",
      "Choose and simplify a chart or table so that its main comparison can be read in a few seconds",
      "Check a slide for readability and accessibility: text size, contrast, colour use, abbreviations and confidentiality",
      "Present a slide by speaking from it rather than reading it, using the sequence look, pause, conclude",
    ],
    sections: [
      {
        heading: "What slides are for",
        paragraphs: [
          "Audiences can look at a slide and listen at the same time — that is what a good diagram with a clear explanation achieves. The difficulty arises with dense text. When a slide is full of sentences, many listeners start reading it, usually faster or slower than you speak, and they follow your voice less closely. The most specific problem is redundancy: if you then read the same sentences aloud, identical on-screen text and narration compete for the same attention instead of complementing each other. For many listeners the result is a talk that is harder to follow than either the slide or the speech alone.",
          "Slides are most useful for what speech cannot do well: showing images, data, anatomy, processes and relationships. Text on slides should be limited to what helps the audience to see the point — a headline, labels and a few words of emphasis. Detailed methods, references and the full results belong in a handout, a backup slide or the published paper.",
        ],
        callout: {
          kind: "evidence",
          text: "In studies of multimedia learning, people learned less when identical on-screen text was presented at the same time as narration than when they heard the narration alone — the “redundancy effect”. A psychological analysis of slide presentations also found frequent violations of principles of perception, memory and comprehension. These studies were not of medical congress talks, but they consistently point in the same direction.",
          refs: [1, 2, 3],
        },
      },
      {
        heading: "One slide, one point: the assertion–evidence approach",
        paragraphs: [
          "The assertion–evidence approach replaces the familiar topic heading and bullet list with two elements. The headline is a complete sentence — an assertion — that states the point of the slide: “Readmissions fell by a third after the nurse-led review”, not “Results”. The body is visual evidence for that assertion: a graph, an image, a diagram or a small table, with minimal text.",
          "This format has three advantages. The audience knows the point even if they look away for a moment. You know what to say, because the headline is your spoken sentence. And the sequence of headlines, read on their own, becomes the argument of the talk — a useful check that every slide supports the core message from L10. If two consecutive headlines say the same thing, merge the slides; if a headline does not connect to your message, the slide probably belongs in the backup section.",
        ],
        callout: {
          kind: "evidence",
          text: "In studies with engineering students, sentence headlines produced better recall of the main points than phrase headlines, and slides designed with an assertion and visual evidence produced better comprehension than topic-and-bullet slides. The studies were conducted in educational settings, not at medical congresses, so treat the size of the effect with caution.",
          refs: [4, 5],
        },
      },
      {
        heading: "Data that can be read in seconds",
        paragraphs: [
          "Most medical slides contain data, and most data slides contain too much. Begin by deciding which single comparison supports the headline. Then choose a format that makes that comparison easy to see. People judge positions along a common scale, such as the heights of bars from the same baseline or points on the same axis, more accurately than angles, areas or colour intensity. This is why a simple bar or dot chart is usually clearer than a pie chart or a three-dimensional graph.",
          "Simplify ruthlessly. Remove gridlines, unnecessary decimal places, legends that can be replaced by direct labels, and every series that does not serve the point. Highlight the comparison that matters — for example, the intervention group in a strong colour and the control in grey — and label it directly. If you must show a table, reduce it to the rows and columns the audience needs, and highlight the key cell.",
          "When you present the slide, apply the sequence from L07: tell the audience where to look, pause while they look, and then state the conclusion in the words of your headline. A data slide without this guidance asks every member of the audience to interpret the graph alone, in a few seconds, and they will not all reach the same conclusion.",
        ],
        callout: {
          kind: "evidence",
          text: "Experiments on graphical perception found that judgements of position along a common scale were more accurate than judgements of length, angle or area. This supports bar and dot charts over pie charts when exact comparisons matter.",
          refs: [6],
        },
      },
      {
        heading: "Readable and accessible slides",
        paragraphs: [
          "Design for the person in the back row, on a small screen in a hybrid session, and with less-than-perfect vision. As a recommended minimum for a standard 16:9 slide — professional guidance, not a universal rule — use body text of at least 24 points and headlines of at least 32 points, a plain sans-serif font, and strong contrast between text and background. Where a congress provides a template or its own size rules, follow them, and let the actual room, screen size and viewing conditions take precedence: a large hall may need larger text. Test each slide by viewing it at the size of a laptop screen from two metres away, or by shrinking it to a quarter of the screen: if you cannot read it, neither can your audience.",
          "Do not rely on colour alone to carry meaning. Red–green colour vision deficiency is common, especially among men, so a graph in which the only difference between groups is red versus green may be unreadable for several people in a large audience. Use colour together with labels, line styles or position, and choose colour pairs such as blue and orange that remain distinguishable.",
          "For international audiences, write abbreviations in full at first use, avoid local acronyms and idioms, and keep the language of slides simple. Never show identifiable patient information, including faces, names, dates of birth or rare combinations of details, without explicit consent and approval under your institution’s policies. Use images and figures only when you have the right to do so, and acknowledge their sources.",
        ],
        callout: {
          kind: "evidence",
          text: "A review of worldwide data reported that red–green colour vision deficiency affects about 8% of men and about 0.4% of women of northern European origin, with lower but still important prevalence in other populations.",
          refs: [7],
        },
      },
      {
        heading: "Speaking from slides, not reading them",
        paragraphs: [
          "If your slides contain only headlines and evidence, you cannot read them aloud — which is the point. You need a different safety net: speaker notes with a few keywords for each slide, the headline sentence you will say, the number you must protect, and the signpost that leads to the next slide. Practise each slide by looking at it for two seconds, turning to the audience and saying the point in your own words.",
          "Plan the moment each slide appears. Let the audience look at a new slide for a second or two before you speak, or tell them what to look at first. Use the blank or black slide function when you want attention back on you, for example during a story or a key message. And prepare backup slides after your closing slide for details you expect to be asked about; showing one in answer to a question is far more effective than squeezing it into the talk.",
          "Finally, check the practical details early: the congress template and aspect ratio, embedded fonts, videos that play without an internet connection, and a copy of the file on a memory stick and in your email. Many apparent slide problems on the day are file problems that could have been prevented.",
        ],
        callout: {
          kind: "recommendation",
          text: "Before every talk, read only your slide headlines in order. If they tell the story of your talk and support your core message, the structure is sound. This is an Academy practice recommendation.",
        },
      },
    ],
    examples: [
      {
        title: "From bullet list to assertion and evidence",
        setting: "Infectious diseases congress, results slide",
        text: "A fictional microbiologist’s original slide is titled “Results” and lists seven bullet points: sample size, median age, three resistance rates, a p-value and a comment. She reads all seven aloud. Rewritten, the headline says: “Resistance to the first-line antibiotic doubled in five years.” The body shows one bar chart with five bars, one per year, the last bar in a strong colour and directly labelled with the percentage. The other figures move to a backup slide. She says: “Look at the last bar.” She pauses. “Resistance has doubled in five years — which is why we changed our guideline.” Colleagues remember the result, and the guideline.",
      },
      {
        title: "A Kaplan–Meier curve for the back row",
        setting: "Oncology grand round, hybrid session",
        text: "A fictional oncologist’s survival curve comes directly from the published paper: small axis labels, four lines in similar colours, a dense risk table and a legend in the corner. Online participants report that they cannot read it. For the next session she redraws it with two lines only — the comparison her headline refers to — in dark blue and orange with different line styles, labels each line at its end, enlarges the axes and moves the risk table to a backup slide. She keeps the original figure available as a handout with the full citation.",
      },
      {
        title: "Speaking without the script on screen",
        setting: "Teaching session for nursing and medical students",
        text: "A fictional nephrologist who presents in his second language has always used full sentences on slides as a prompt. He moves the sentences to his speaker notes, keeps only headlines and diagrams on the slides, and practises each slide three times while looking at the room. In the session he glances at the headline, turns to the students and explains. At one point he loses a word; he looks at the headline, says it aloud and continues. Feedback afterwards mentions that he seemed “much more in contact with the group”.",
      },
    ],
    phrase_bank: [
      { phrase: "This slide shows that…", use: "Stating the assertion of a slide", register: "Neutral", example: "This slide shows that resistance has doubled in five years." },
      { phrase: "Please look at…", use: "Directing attention before you speak", register: "Neutral", pronunciation: "Pause after the object, before the conclusion.", example: "Please look at the orange line. //" },
      { phrase: "On the left you can see…, and on the right…", use: "Explaining a two-part visual", register: "Neutral", example: "On the left you can see the old pathway, and on the right the new one." },
      { phrase: "The key comparison here is…", use: "Highlighting the comparison that matters", register: "Neutral – formal", example: "The key comparison here is between the first and the last year." },
      { phrase: "I’ve highlighted…", use: "Explaining the use of colour or emphasis", register: "Neutral", example: "I’ve highlighted the intervention group in blue." },
      { phrase: "I won’t go through every number; the important one is…", use: "Selecting from a table", register: "Neutral", example: "I won’t go through every number; the important one is the readmission rate at six months." },
      { phrase: "The full details are in the handout.", use: "Moving detail out of the talk", register: "Neutral", example: "The full details are in the handout, with all the references." },
      { phrase: "I’ll come back to this slide if there are questions.", use: "Postponing detail to a backup slide", register: "Neutral", example: "I’ll come back to this slide if there are questions about the subgroups." },
      { phrase: "Let me take the slide away for a moment.", use: "Returning attention to the speaker", register: "Neutral", example: "Let me take the slide away for a moment, because this is the main point." },
      { phrase: "This image is shown with the patient’s consent.", use: "Stating consent for a clinical image", register: "Formal", example: "This image is shown with the patient’s written consent and has been anonymised." },
    ],
    phrase_practice:
      "Take your three most important slides. For each, say its headline as a sentence beginning “This slide shows that…”, then present it with “Please look at…”, a pause and your conclusion. Record yourself and check that you spoke to the audience, not to the screen.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show one results slide presented three times: read aloud from a bullet list, presented from an assertion–evidence version without guidance, and presented with “look, pause, conclude”. It will then show the same chart before and after simplification, viewed from the back of a lecture theatre and on a laptop in a hybrid session. Notice where the audience looks in each version and how long it takes to see the main comparison.",
    mistakes: [
      { mistake: "Writing the talk on the slides and reading it", correction: "Put sentences in speaker notes; show a headline and visual evidence." },
      { mistake: "Topic headings such as “Results” or “Background”", correction: "Use a sentence headline that states the point of the slide." },
      { mistake: "Pasting complex figures directly from papers", correction: "Redraw to show the one comparison that supports your headline; offer the original in a handout." },
      { mistake: "Using red and green as the only difference between groups", correction: "Use colour-blind-safe pairs and add labels or line styles." },
      { mistake: "Small text that cannot be read from the back of the room", correction: "Aim for at least 24-point body text and 32-point headlines on a 16:9 slide (recommended minimum; the congress template and the room take precedence); test at reduced size." },
      { mistake: "Showing identifiable patient images without consent", correction: "Use only anonymised images, or identifiable images with the patient’s explicit consent and all approvals required by your institution’s policies, and say so." },
    ],
    reflection: [
      "Which of your current slides could you not present if the projector failed — and what does that tell you about it?",
      "Read only the headlines of your last presentation. Do they tell its story?",
      "Who in your usual audience might struggle to read your slides, and what would help them?",
    ],
    references: [
      "Kalyuga, S., Chandler, P., & Sweller, J. (2004). When redundant on-screen text in multimedia technical instruction can interfere with learning. Human Factors, 46(3), 567–581.",
      "Mayer, R. E. (2020). Multimedia Learning (3rd ed.). Cambridge University Press.",
      "Kosslyn, S. M., Kievit, R. A., Russell, A. G., & Shephard, J. M. (2012). PowerPoint® presentation flaws and failures: A psychological analysis. Frontiers in Psychology, 3, 230.",
      "Alley, M., Schreiber, M., Ramsdell, K., & Muffo, J. (2006). How the design of headlines in presentation slides affects audience retention. Technical Communication, 53(2), 225–234.",
      "Garner, J., & Alley, M. (2013). How the design of presentation slides affects audience comprehension: A case for the assertion–evidence approach. International Journal of Engineering Education, 29(6), 1564–1579.",
      "Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. Journal of the American Statistical Association, 79(387), 531–554.",
      "Birch, J. (2012). Worldwide prevalence of red–green color deficiency. Journal of the Optical Society of America A, 29(3), 313–320.",
    ],
  },
  exercise: {
    title: "Rebuild one slide",
    instructions: "Turn one real, text-heavy slide from your own work into an assertion–evidence slide and plan how you will present it.",
    steps: [
      "Choose a slide from one of your talks that contains a lot of text or a complex chart. Describe it briefly (title, number of lines or series, what you used to say).",
      "Write a sentence headline that states its single point and supports your core message from L10.",
      "Describe the visual evidence you will use instead of text: chart type, what you will remove, what you will highlight and how you will label it.",
      "Check it against the readability list: text size, contrast, colour not used alone, abbreviations written in full, no identifiable patient information, permission for any image.",
      "Write what you will say, using the sequence look, pause, conclude, and note what moves to speaker notes or a backup slide.",
    ],
    prompt: "Paste your description of the original slide, the new headline, the description of the visual evidence, your checklist results and your spoken script for the slide.",
    min_chars: 350,
    model_answer:
      "Original slide (fictional): “Results” — nine bullet points: number of patients, mean age, sex ratio, HbA1c at baseline and 12 months in two groups, two p-values, hypoglycaemia events and a comment. I used to read every line.\nHeadline: “Patients in the telephone coaching group lowered their HbA1c twice as much in a year, without more hypoglycaemia.”\nVisual evidence: a dot chart with two groups at baseline and 12 months, connected by lines; coaching group in dark blue, usual care in grey, both labelled at the end of the line with the change. Removed: sex ratio, mean age and p-values (to backup slide); gridlines; legend. A small line under the chart: “Severe hypoglycaemia: 2 vs 3 events”.\nChecklist: text 28 points, headline 36; dark text on white; groups differ by colour, label and position; “HbA1c” written in full at first use in the talk (“glycated haemoglobin, HbA1c”); no patient data; chart redrawn from our own data.\nScript: “Please look at the blue line. // [pause] In the coaching group, HbA1c fell by twice as much over the year — // and there was no increase in severe hypoglycaemia. That’s the main result of our study.” Speaker notes: “twice as much; no more hypos; protect: 2 vs 3”.",
    self_check: [
      "The headline is a full sentence that states one point and supports your core message.",
      "The visual shows one main comparison, highlighted and directly labelled.",
      "Colour is not the only way to distinguish groups.",
      "No identifiable patient information is shown, and you have the right to use every image.",
      "Your script uses look, pause, conclude and does not read the slide.",
    ],
  },
  quiz: [
    {
      prompt: "What is an assertion–evidence slide?",
      options: [
        "A slide with a topic heading and five bullet points",
        "A slide with a sentence headline stating the point and visual evidence supporting it",
        "A slide that contains only a quotation",
        "A slide that lists all the references",
      ],
      correct: 1,
      explanation: "The sentence headline states the point; the body shows the evidence, with minimal text.",
    },
    {
      scenario: true,
      prompt: "Your results slide has nine lines of text, which you read aloud. Why is this likely to reduce comprehension?",
      options: [
        "Because reading aloud is impolite",
        "Because congress rules forbid text",
        "Because the audience reads and listens at the same time, and identical text and speech compete for attention",
        "Because nine is an unlucky number",
      ],
      correct: 2,
      explanation: "Research on the redundancy effect found that identical on-screen text and narration presented together can reduce learning.",
    },
    {
      scenario: true,
      prompt: "You need to compare the proportion of patients with complications in four hospitals. Which format is usually clearest?",
      options: [
        "Four pie charts",
        "A three-dimensional cone chart",
        "A table with all values to three decimal places",
        "A bar or dot chart on a common scale, with the key hospital highlighted",
      ],
      correct: 3,
      explanation: "Positions on a common scale are judged more accurately than angles or areas.",
    },
    {
      prompt: "Your graph shows the intervention group in red and the control group in green, with no labels. What is the main problem?",
      options: [
        "Viewers with red–green colour vision deficiency may not distinguish the groups",
        "Red is too emotional for medical slides",
        "Green is reserved for positive results",
        "There is no problem if the legend is large",
      ],
      correct: 0,
      explanation: "Red–green colour vision deficiency is common. Use colour-blind-safe pairs and add labels, line styles or position.",
    },
    {
      scenario: true,
      prompt: "You want to show a striking clinical photograph of a patient’s face. What must you do first?",
      options: [
        "Crop out the eyes",
        "Nothing, if the audience is medical",
        "Lower the image resolution",
        "Obtain explicit consent and follow your institution’s policy, or use an anonymised alternative",
      ],
      correct: 3,
      explanation: "Identifiable images require explicit consent and institutional approval; otherwise use anonymised material.",
    },
    {
      scenario: true,
      prompt: "A new data slide appears. What should you do in the first seconds?",
      options: [
        "Start explaining the methods immediately",
        "Tell the audience where to look, pause while they look, then state the conclusion",
        "Read the axis labels aloud",
        "Move quickly to the next slide",
      ],
      correct: 1,
      explanation: "Look, pause, conclude (L07) guides the audience to the right conclusion before they interpret the graph alone.",
    },
  ],
  assignment: {
    title: "Slide set review and redesign",
    brief:
      "Take the slide set of a real presentation you will give (or the slides you planned in L10 and L11). Submit: (1) the list of your slide headlines in order, rewritten as sentences, and a note on whether they tell the story of your talk and support your core message; (2) a description of two slides you have redesigned using the assertion–evidence approach, including the chart choice and what you removed; (3) an accessibility and confidentiality check of the whole set (text size, contrast, colour, abbreviations, patient information, image permissions), with what you changed; and (4) a short reflection (100–200 words) on how you will speak from the slides without reading them. Do not upload patient images or confidential material; describe slides in words.",
    min_words: 250,
    required: true,
    criteria: [
      { criterion: "Headlines", description: "Every slide has a sentence headline; read in order, they tell the story and support the core message." },
      { criterion: "Evidence design", description: "Redesigned slides show one comparison clearly, using an appropriate chart and minimal text." },
      { criterion: "Accessibility", description: "Text size, contrast and colour use are checked and corrected; colour is not used alone." },
      { criterion: "Confidentiality and permissions", description: "No identifiable patient information; images are consented, anonymised or properly licensed and attributed." },
      { criterion: "Delivery plan", description: "A realistic plan to speak from the slides using notes, look–pause–conclude and backup slides." },
    ],
  },
  resources: [
    { title: "L12 Lesson handout", description: "Assertion–evidence template, chart choice guide, readability and accessibility checklist, confidentiality checklist and phrase bank.", file_url: "/materials/lessons/L12-handout.pdf", is_sample: false },
  ],
};
