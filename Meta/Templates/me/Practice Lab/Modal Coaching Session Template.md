
<%*
// Open the modal form
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Coaching Session");
const now = new Date();

// Normalize the selected practice log into a proper link
const sessionName = result.data.practice_log || "Untitled Practice Log";
const sessionLink = `[[${sessionName}]]`;
result.data.practice_log = sessionLink;

// Create Practice Session object to extract scenario link
const practiceSession = window.customJS.createModalFormUtilsInstance();
practiceSession.init({
  app,
  tp,
  fileType: "practice session",
  context1: sessionName,
  useContextAsLink: true
});
practiceSession.newFileFullPath = `ME/🧪 Practice Lab/🎬 Practice Logs/${sessionName}.md`;

const sessionFile = app.vault.getAbstractFileByPath(practiceSession.newFileFullPath);
if (!sessionFile) throw new Error(`❌ Could not find practice session file at ${practiceSession.newFileFullPath}`);

const scenario = practiceSession.getFrontMatterValue(sessionFile, "scenario");

// Create Coaching Session
const coachingSession = window.customJS.createModalFormUtilsInstance();
coachingSession.init({
  app,
  tp,
  fileType: "coaching session",
  context1: sessionName
});
coachingSession.createNewFileName();

await coachingSession.createFileWithFrontmatter({
  created: coachingSession.formatUtils.db_formatDateTime(now),
  last_modified: coachingSession.formatUtils.db_formatDateTime(now),
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

// Update practice session file with new coaching session link
await practiceSession.updateFrontMatter(sessionFile, {
  coaching_sessions: coachingSession.newCreatedFileLink
});

// If "Live Rehearsal & Coaching" selected, also create Live Rehearsal
if (result.data.rehearsal_mode === "Live Rehearsal & Coaching") {
  const liveRehearsal = window.customJS.createModalFormUtilsInstance();
  liveRehearsal.init({
    app,
    tp,
    fileType: "live rehearsal",
    context1: sessionName
  });
  liveRehearsal.createNewFileName();

  await liveRehearsal.createFileWithFrontmatter({
    created: liveRehearsal.formatUtils.db_formatDateTime(now),
    last_modified: liveRehearsal.formatUtils.db_formatDateTime(now),
    practice_session: sessionLink,
    scenario: scenario,
    people: Array.isArray(result.data.people) ? result.data.people : [],
    status: "🟧 in progress",
    entered: false,
    export_to_inputs: false,
    rehearsal_mode: result.data.rehearsal_mode
  });

  await practiceSession.updateFrontMatter(sessionFile, {
    live_rehearsals: liveRehearsal.newCreatedFileLink
  });
} else {
  result.data.live_rehearsals = "";
}

-%>
