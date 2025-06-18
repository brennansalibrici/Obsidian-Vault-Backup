
<%*
//Open the modal form and it's api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Coaching Session")

const sessionName = result.data.practice_log || "Untitled Practice Log";
const sessionLink = `[[${sessionName}]]`;
result.data.practice_log = sessionLink;

// Create practiceSession Object (for reading metadata) and get scenario reference link
const practiceSession = window.customJS.createModalFormUtilsInstance();
practiceSession.init(app, tp, "PRACTICE_SESSION", "ME/🧪 Practice Lab/🎬 Practice Logs", "Practice Session Template", sessionName);
practiceSession.newFileFullPath = `ME/🧪 Practice Lab/🎬 Practice Logs/${sessionName}.md`;

const sessionFile = app.vault.getAbstractFileByPath(practiceSession.newFileFullPath);
if (!sessionFile) throw new Error(`❌ Could not find practice session file at ${practiceSession.newFileFullPath}`);

const scenario = practiceSession.getFrontMatterValue(sessionFile, "scenario");

//Create New Coaching Session File
const coachingSession = window.customJS.createModalFormUtilsInstance();
coachingSession.init(app, tp, "COACHING_SESSION", "ME/🧪 Practice Lab/🧠 Coaching", "Coaching Session Template", sessionName);
coachingSession.createNewFileName();

await coachingSession.createFileWithFrontmatter({
  practice_session: sessionLink,
  scenario: scenario,
  status: "🟧 in progress",
  entered: false,
  people: Array.isArray(result.data.people) ? result.data.people : [],
  export_to_inputs: false,
  meta_skills: result.data.meta_skills,
  core_skills: result.data.core_skills,
  rehearsal_mode: result.data.rehearsal_mode
});

result.data.coaching_sessions = coachingSession.newCreatedFileLink;

//Update practice session file with new live rehearsal link
await practiceSession.updateFrontMatter(sessionFile, {
  coaching_sessions: coachingSession.newCreatedFileLink
});

//If selected, create Live Rehearsal file as well
if (result.data.rehearsal_mode === "Live Rehearsal & Coaching") {
  const liveRehearsal = window.customJS.createModalFormUtilsInstance();
  liveRehearsal.init(app, tp, "LIVE_REHEARSAL", "ME/🧪 Practice Lab/🎙️ Live Rehearsals", "Live Rehearsal Template", sessionName);
  liveRehearsal.createNewFileName();

  await liveRehearsal.createFileWithFrontmatter({
    practice_session: sessionLink,
    scenario: scenario,
    people: Array.isArray(result.data.people) ? result.data.people : [],
    status: "🟧 in progress",
	entered: false,
    export_to_inputs: false,
    live_rehearsals: result.data.rehearsal
  });

  //result.data.live_ = liveRehearsal.newCreatedFileLink;

  // Update practice session with coaching session link
  await practiceSession.updateFrontMatter(sessionFile, {
    live_rehearsals: liveRehearsal.newCreatedFileLink
  });
} else {
  result.data.coaching_session = "";
}

-%>
