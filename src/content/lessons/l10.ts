import type { LessonSpec } from "../lesson-types";

/**
 * L10 — The Core Message (Module 4, Presentation Architecture).
 * Written 27 November 2026 to the approved Content Standard, for review.
 */
export const L10: LessonSpec = {
  code: "L10",
  week: 4,
  minutes: 60,
  aiTeacher: "presentation-coach",
  status: "ready",
  body: {
    intro:
      "Most medical presentations fail for a reason that has nothing to do with English. The speaker knows too much, shows too much and never says plainly what the audience should take away. After a busy session, colleagues remember perhaps one idea from each talk — and if the speaker has not chosen that idea, the audience chooses it for them, often from a detail on slide seven. This lesson gives you a disciplined way to decide what your talk is for before you open your slide software. You will learn to reduce a body of work to one core message, to test that message against the audience in front of you, and to build two or three supporting points that carry it. The method is the foundation for the rest of this module: openings and closings in L11 and slide design in L12 both depend on a message you can state in one sentence. It also works in a second language, because a clear message protects you when words are hard to find: you always know where you are going.",
    objectives: [
      "Write a one-sentence core message for a presentation that states a claim, not a topic",
      "Test a core message against the audience, the setting and the time available, and revise it",
      "Select two or three supporting points and the evidence for each, and cut material that does not serve the message",
      "Deliver a 30-second spoken version of your message without slides",
    ],
    sections: [
      {
        heading: "Why experts struggle to simplify",
        paragraphs: [
          "Doctors who present are usually the people who know the subject best in the room. That is exactly the difficulty. Once you know something well, it becomes hard to imagine not knowing it: abbreviations feel universal, the reasoning feels obvious, and every result feels important because you remember the effort behind it. The audience has none of this context. They meet your work for the first time, at speaking speed, with no way to scroll back.",
          "The practical consequence is that experts overestimate what an audience can absorb and underestimate how much guidance it needs. A clear core message is the simplest correction. It forces you to decide what matters from the audience’s point of view, not from the point of view of the person who did the work.",
        ],
        callout: {
          kind: "evidence",
          text: "In economic experiments, better-informed participants were unable to ignore their own knowledge when predicting the judgements of less-informed people — an effect the authors called the “curse of knowledge”. The studies did not concern presentations, but they describe the same bias that makes expert talks hard to follow.",
          refs: [1],
        },
      },
      {
        heading: "Topic, title and message are not the same",
        paragraphs: [
          "A topic is what you talk about: “delirium screening in older surgical patients”. A title is how the programme lists it. A message is what you want the audience to believe or do when you have finished: “Screening every older surgical patient on the first post-operative day detects delirium a day earlier, and it takes two minutes per patient.” Only the message gives the talk a direction.",
          "A useful test is grammatical. A topic is a noun phrase. A message is a complete sentence with a verb, and usually a claim that someone could disagree with. If your sentence cannot be challenged — “Delirium is an important problem” — it is still a topic. If it includes too many clauses to say in one breath, it is still a summary of everything you did, not a message.",
          "Good medical messages are specific about the population, the finding and the consequence. They also respect the strength of the evidence. A single-centre observational study supports “was associated with”, not “prevents”. Precision here is not only a matter of style; it protects your credibility with expert audiences who will notice an overclaim at once.",
        ],
      },
      {
        heading: "Working memory sets the limits",
        paragraphs: [
          "Listeners hold only a small amount of new information in mind at once. When a talk asks them to track six findings, four abbreviations and a complex graph at the same time, they do not simply remember less of everything; they lose the thread that connects the pieces. Written text can be reread. Speech cannot.",
          "This is why the Academy recommends one core message and no more than three supporting points for a short talk. Each supporting point should be a sentence in its own right, and each should clearly support the message. Additional findings can go into a backup slide, a handout or the answer to a question. Leaving them out of the talk is not hiding them; it is choosing what the audience can actually use.",
        ],
        callout: {
          kind: "evidence",
          text: "A widely cited review of research on short-term memory concluded that adults can hold roughly three to five meaningful units (“chunks”) in mind at once. Presentations are not memory experiments, but the limit explains why a small number of clearly grouped points is easier to follow than a long list.",
          refs: [2],
        },
      },
      {
        heading: "Building the message: four questions",
        paragraphs: [
          "Write your message before you open your slides, by answering four questions in order. First: who is in the room, and what do they already know? A message for cardiologists at a specialist congress differs from one for a hospital management board. Second: what do they care about? Patients, workload, cost, safety, training or an open scientific question. Third: what is the single most important thing your work shows them? Fourth: what should they think or do differently afterwards?",
          "Then combine the answers into one sentence and say it aloud. Many speakers find a simple narrative frame helpful: what is known, what is the problem or gap, and therefore what you found or propose. For example: “We know that delirium is common after surgery, but it is often detected late on busy wards; therefore we tested a two-minute screen on day one, and it found delirium a day earlier.” Shortened to its core, this becomes the message.",
          "Finally, check the message against the time available. A five-minute oral presentation can carry one message and one or two points. A forty-minute grand round can carry the same message with three well-developed points and a discussion of limitations. The message stays constant; the depth changes.",
        ],
        callout: {
          kind: "recommendation",
          text: "The “And, But, Therefore” frame and the problem–gap–finding sequence are widely taught in science communication. They are practical tools, not research findings: use them to draft, then revise the sentence in your own words.",
          refs: [3, 4],
        },
      },
      {
        heading: "Supporting points and the evidence for each",
        paragraphs: [
          "Once the message is fixed, every part of the talk must earn its place by supporting it. List everything you could include — results, methods, background, anecdotes — and sort each item into one of three groups: essential to support the message, useful for questions, and interesting to you but not to this audience. Only the first group goes into the talk.",
          "Arrange the supporting points in the order that makes the message most convincing. For research, this is often problem, method in brief, key result and implication. For a clinical guideline or service change, it may be the current problem, the proposal and what it will mean for the team. Each point should end by connecting back to the message, so the audience hears the same idea from several angles.",
          "Clinicians already use structured formats when communication must be fast and safe. One example is SBAR (Situation, Background, Assessment, Recommendation), a handover and escalation tool used in many hospitals. It exists because a clear structure reduces the effort needed to understand a message under pressure. SBAR is not a presentation framework, and it is mentioned here only as an analogy: a presentation is a slower setting with different aims, but the underlying principle — say what matters in a predictable order — is the same. Familiarity with SBAR varies between countries and institutions; if it is not used where you work, the same idea applies to any structured handover format you know.",
        ],
        callout: {
          kind: "evidence",
          text: "SBAR was adopted in clinical settings as a shared structure for communication between clinicians; reports of its implementation describe improved clarity and a common model for escalating concerns. It is cited here as an example of structured clinical communication, not as evidence about presentations.",
          refs: [5],
        },
      },
      {
        heading: "The thirty-second test",
        paragraphs: [
          "Before you build a single slide, explain your talk aloud in thirty seconds to someone outside your specialty, or record yourself if no one is available. Say the message, name the supporting points and stop. If you cannot do it, the talk is not yet ready, however polished the slides are.",
          "The test has a second benefit for speakers working in a second language. A message you have said aloud many times becomes a phrase you can produce under pressure. When you lose a word in the middle of a talk, you can always return to it: “The point I want you to take away is this: …” Your message becomes both the destination of the talk and a safe place to come back to.",
        ],
      },
    ],
    examples: [
      {
        title: "From a topic to a message",
        setting: "Regional anaesthesia meeting, ten-minute oral presentation",
        text: "A fictional anaesthetist’s first draft is titled “Experience with ultrasound-guided nerve blocks in our unit” and contains eighteen slides covering technique, equipment, eight outcome measures and a literature review. Asked what the audience should remember, she says: “That we do a lot of blocks.” After the four questions, she writes: “In our unit, adding a block nurse to the team allowed us to provide nerve blocks for hip-fracture patients within four hours of admission, and patients needed less opioid on the first day.” She keeps three outcome measures, moves the rest to backup slides and reduces the talk to nine slides. The talk is shorter, and colleagues ask about staffing — the point she actually wanted to make.",
      },
      {
        title: "One message, two audiences",
        setting: "Paediatric respiratory service, congress talk and management meeting",
        text: "A fictional paediatric team has introduced a nurse-led asthma clinic. At a specialist congress, the message is: “A nurse-led review within two weeks of an emergency attendance was associated with fewer repeat attendances over six months in our population.” At the hospital management meeting the next week, the same work becomes: “A nurse-led review after an emergency attendance was associated with fewer repeat visits in our pilot; extending it to all sites would need one additional nurse post, and its effect should be evaluated as it is extended.” The data are the same. The audience, and therefore the message, are different.",
      },
      {
        title: "Saving a journal club",
        setting: "Internal medicine journal club, trainee presenting a trial",
        text: "A fictional trainee prepares twenty-five slides summarising every table of a randomised trial. A consultant suggests a different approach: “Tell us whether this trial should change what we do on Monday.” The trainee rewrites the talk around one sentence: “This trial supports earlier switching from intravenous to oral antibiotics in stable patients, but its population excludes most of our frail elderly patients.” Two supporting points follow — the result and the limitation — and the discussion that follows is the best of the year, because the audience knows what is being argued.",
      },
    ],
    phrase_bank: [
      { phrase: "The one thing I’d like you to remember is…", use: "Stating your core message explicitly", register: "Neutral", pronunciation: "Stress “ONE”; pause after “is”.", example: "The one thing I’d like you to remember is this: // two minutes of screening finds delirium a day earlier." },
      { phrase: "In short, …", use: "Giving the message in its shortest form", register: "Neutral – formal", example: "In short, the block nurse made early analgesia possible." },
      { phrase: "This matters because…", use: "Linking a point to the audience’s concerns", register: "Neutral", example: "This matters because late detection means a longer stay." },
      { phrase: "I’ll make three points.", use: "Announcing the number of supporting points", register: "Neutral", pronunciation: "Stress “THREE”.", example: "To support that, I’ll make three points: the problem, the change we made, and the result." },
      { phrase: "Which brings me back to my main point:", use: "Returning to the message after a supporting point", register: "Neutral", example: "Which brings me back to my main point: early screening is feasible on a busy ward." },
      { phrase: "What this means for your practice is…", use: "Turning a finding into a consequence for the audience", register: "Neutral – formal", example: "What this means for your practice is that one question on day one can change management." },
      { phrase: "The evidence for this comes from…", use: "Introducing support for a claim", register: "Formal", example: "The evidence for this comes from our audit of four hundred patients." },
      { phrase: "We found an association, not proof of cause.", use: "Stating the strength of evidence honestly", register: "Formal", example: "We found an association, not proof of cause, but the size of the difference is worth testing." },
      { phrase: "I won’t go into the details of…, but…", use: "Signalling that you are leaving material out", register: "Neutral", example: "I won’t go into the details of the statistics, but they are in the backup slides." },
      { phrase: "If you remember nothing else, …", use: "Repeating the message near the end", register: "Neutral, informal", example: "If you remember nothing else, remember the two-minute screen." },
    ],
    phrase_practice:
      "Write your core message as one sentence. Then say it three times aloud, each time introduced by a different expression from the phrase bank, and record the version that sounds most natural to you. Use that version in your opening, after your last supporting point, and in your close.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show a ten-minute talk reduced to its core message in real time: the presenter answers the four questions aloud, writes the message, sorts the slides into three groups and delivers the thirty-second version before and after the revision. Notice how the number of slides falls while the clarity of the spoken message rises.",
    mistakes: [
      { mistake: "Using the title as the message", correction: "Write a complete sentence with a verb and a claim someone could disagree with." },
      { mistake: "Including every result because it took work to obtain", correction: "Keep only results that support the message; move the rest to backup slides." },
      { mistake: "Overstating the evidence to make the message stronger", correction: "Match the verb to the design: “was associated with”, “suggests”, “showed”." },
      { mistake: "Writing the message after the slides", correction: "Write and say the message first; build slides to support it." },
      { mistake: "Using the same message for every audience", correction: "Keep the data; adapt the consequence to what this audience cares about." },
      { mistake: "Stating the message only once", correction: "State it in the opening, return to it after each point and repeat it in the close." },
    ],
    reflection: [
      "Think of the last talk you attended. What was its message — and did the speaker say it?",
      "Which part of your own current work do you find hardest to leave out, and why?",
      "How would the message of your next talk change if the audience were managers rather than specialists?",
    ],
    references: [
      "Camerer, C., Loewenstein, G., & Weber, M. (1989). The curse of knowledge in economic settings: An experimental analysis. Journal of Political Economy, 97(5), 1232–1254.",
      "Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87–114.",
      "Olson, R. (2015). Houston, We Have a Narrative: Why Science Needs Story. University of Chicago Press.",
      "Schimel, J. (2012). Writing Science: How to Write Papers That Get Cited and Proposals That Get Funded. Oxford University Press.",
      "Haig, K. M., Sutton, S., & Whittington, J. (2006). SBAR: A shared mental model for improving communication between clinicians. Joint Commission Journal on Quality and Patient Safety, 32(3), 167–175.",
    ],
  },
  exercise: {
    title: "From topic to core message",
    instructions: "Turn the topic of one of your own talks into a core message and a short structure.",
    steps: [
      "Choose a presentation you will give, or recently gave, and write its title or topic.",
      "Answer the four questions in one or two lines each: audience, what they care about, the most important finding, what they should think or do afterwards.",
      "Combine the answers into one sentence of no more than 35 words, with a verb and a claim. Check that the verb matches the strength of your evidence.",
      "List up to three supporting points, each as a full sentence, and one item you will now leave out.",
      "Say the message and the points aloud in 30 seconds, and note what was hard to say.",
    ],
    prompt: "Paste your topic, your answers to the four questions, your one-sentence message, your supporting points, what you left out, and a note on the 30-second test.",
    min_chars: 300,
    model_answer:
      "Topic: “Our experience with a frailty screen in the emergency department.”\nAudience: emergency physicians and geriatricians at a regional meeting; they know frailty matters but doubt that screening is feasible in a crowded department. They care about: time, flow and avoidable admissions. Most important finding: triage nurses completed the screen in most eligible patients, and screen-positive patients were referred to geriatrics earlier. Afterwards they should: consider piloting the screen at triage.\nMessage (35 words): “A one-minute frailty screen at triage was completed for most patients over seventy-five in our department, and geriatric review happened earlier without delaying flow; it may be feasible in similar settings, subject to local evaluation.”\nSupporting points: (1) Frail older patients waited too long for geriatric review. (2) Triage nurses completed the screen in one minute, with brief training. (3) Geriatric review happened earlier, and time in the department did not increase.\nLeft out: the comparison of three frailty tools — moved to a backup slide.\n30-second test: hard to say “screen-positive” naturally; I will say “patients who screened positive”.",
    self_check: [
      "The message is a full sentence with a verb and a claim, not a topic.",
      "The verb matches the evidence (association, feasibility or effect).",
      "There are no more than three supporting points, each a full sentence.",
      "At least one item has been deliberately left out.",
      "You said it aloud within about 30 seconds.",
    ],
  },
  quiz: [
    {
      prompt: "Which of these is a core message rather than a topic?",
      options: [
        "Antibiotic stewardship in surgical wards",
        "Our experience with antibiotic stewardship",
        "Stopping prophylactic antibiotics after 24 hours halved their use on our surgical wards, with no rise in wound infections",
        "Important lessons from stewardship",
      ],
      correct: 2,
      explanation: "A message is a complete sentence that makes a specific claim. The other options are topics or titles.",
    },
    {
      scenario: true,
      prompt: "Your single-centre observational study found that patients seen by the new clinic had fewer readmissions. Which message wording is most appropriate for a specialist audience?",
      options: [
        "The new clinic prevents readmissions",
        "Attendance at the new clinic was associated with fewer readmissions in our population",
        "Readmissions are a serious problem",
        "The clinic proves that follow-up works",
      ],
      correct: 1,
      explanation: "An observational design supports “was associated with”. Overclaiming damages credibility with expert listeners.",
    },
    {
      scenario: true,
      prompt: "You have a five-minute oral slot and seven interesting findings. What should you do?",
      options: [
        "Present all seven quickly",
        "Choose the findings that support one message, present two or three, and keep the rest for questions",
        "Present the methods in detail and leave the findings for the poster",
        "Ask the chair for more time",
      ],
      correct: 1,
      explanation: "Listeners can hold only a few new units in mind. A small number of points that support one message is easier to follow and remember.",
    },
    {
      prompt: "What is the main reason experts find it hard to simplify their own work?",
      options: [
        "Their English is not good enough",
        "Medical content cannot be simplified",
        "Audiences prefer complex talks",
        "Once you know something well, it is hard to imagine not knowing it",
      ],
      correct: 3,
      explanation: "The “curse of knowledge” makes it difficult to judge what a less-informed audience needs.",
    },
    {
      scenario: true,
      prompt: "You present the same audit to a specialist congress and to the hospital board. What should change?",
      options: [
        "The consequence you emphasise, to match what each audience cares about",
        "The data, so that the board sees better results",
        "Nothing; the message should be identical",
        "Only the slide colours",
      ],
      correct: 0,
      explanation: "The evidence stays the same; the message is adapted to the audience’s concerns, such as practice for specialists and resources for managers.",
    },
    {
      scenario: true,
      prompt: "Halfway through your talk you lose the next word and your mind goes blank. Which strategy from this lesson helps most?",
      options: [
        "Apologise for your English",
        "Skip to the last slide",
        "Return to your rehearsed message: “The point I want you to take away is this: …”",
        "Read the slide word for word",
      ],
      correct: 2,
      explanation: "A message you have said aloud many times is a safe phrase to return to, and it re-orients both you and the audience.",
    },
  ],
  assignment: {
    title: "Message map for your next presentation",
    brief:
      "Prepare a one-page message map for a real presentation you will give in the next three months. Include: (1) the setting, audience and time available; (2) your core message in one sentence; (3) two or three supporting points, each with the evidence that supports it; (4) a list of material you have decided to leave out or keep for questions, with a one-line reason; and (5) a short reflection (150–250 words) on how the message changed during drafting and how you would adapt it for a different audience. This map will be the starting point for Workshop II (Structure Clinic).",
    min_words: 200,
    required: true,
    criteria: [
      { criterion: "Message", description: "One complete sentence that makes a specific, defensible claim for this audience." },
      { criterion: "Evidence and precision", description: "The wording matches the strength of the evidence; no overclaiming." },
      { criterion: "Structure", description: "Two or three supporting points, each clearly linked to the message and to evidence." },
      { criterion: "Selection", description: "Material left out is identified, with reasons." },
      { criterion: "Reflection", description: "Shows how the message was tested and how it would change for another audience." },
    ],
  },
  resources: [
    { title: "L10 Lesson handout", description: "The four questions, message test, message map template, evidence verbs and phrase bank.", file_url: "/materials/lessons/L10-handout.pdf", is_sample: false },
  ],
};
