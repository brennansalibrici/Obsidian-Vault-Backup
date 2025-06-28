<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Practice Log");
const now = new Date();

// Create Practice Session Object
const practiceSession = window.customJS.createModalFormUtilsInstance();
practiceSession.init({
  app,
  tp,
  fileType: "practice session",
  context1: result.data.scenario,
  useContextAsLink: true
});

practiceSession.createNewFileName();

// Create the Practice Session file
await practiceSession.createNewFileFromTemplate();
const practiceSessionLink = practiceSession.newCreatedFileLink;

// Safety check
if (!practiceSession.newCreatedFile) {
  new Notice("❌ Failed to create Practice Session file.");
  throw new Error("Practice session file not created");
}

// Create Live Rehearsal and Coaching Session objects
const liveRehearsal = window.customJS.createModalFormUtilsInstance();
liveRehearsal.init({
  app,
  tp,
  fileType: "live rehearsal",
  context1: practiceSession.newCreatedFileName
});
liveRehearsal.createNewFileName();

const coachingSession = window.customJS.createModalFormUtilsInstance();
coachingSession.init({
  app,
  tp,
  fileType: "coaching session",
  context1: practiceSession.newCreatedFileName
});
coachingSession.createNewFileName();

// Link scenario and session
result.data.scenario = practiceSession.lnkField1;
result.data.title = practiceSession.newCreatedFileName;

// Wrap string fields if needed
if(result.data.meta_skills) result.data.meta_skills = `[[${result.data.meta_skills}]]`;
if(result.data.core_skills) result.data.core_skills = `[[${result.data.core_skills}]]`;

// Handle branching behavior
switch (result.data.rehearsal_mode) {
  case "Live Rehearsal":
    await liveRehearsal.createFileWithFrontmatter({
	  created: liveRehearsal.formatUtils.db_formatDateTime(now),
	  last_modified: liveRehearsal.formatUtils.db_formatDateTime(now),
      practice_session: practiceSessionLink,
      scenario: practiceSession.lnkField1,
      status: "🟧 in progress",
      entered: false,
      export_to_inputs: false,
      people: Array.isArray(result.data.people) ? result.data.people : [],
      rehearsal_mode: result.data.rehearsal_mode
    });
    result.data.live_rehearsals = liveRehearsal.newCreatedFileLink;
    result.data.coaching_session = "";
    break;

  case "Coaching":
    await coachingSession.createFileWithFrontmatter({
      created: coachingSession.formatUtils.db_formatDateTime(now),
      last_modified: coachingSession.formatUtils.db_formatDateTime(now),
      practice_session: practiceSessionLink,
      scenario: practiceSession.lnkField1,
      status: "🟧 in progress",
      entered: false,
      export_to_inputs: false,
      people: Array.isArray(result.data.people) ? result.data.people : [],
      meta_skills: result.data.meta_skills,
      core_skills: result.data.core_skills,
      rehearsal_mode: result.data.rehearsal_mode
    });
    result.data.live_rehearsals = "";
    result.data.coaching_session = coachingSession.newCreatedFileLink;
    break;

  case "Live Rehearsal & Coaching":
    await liveRehearsal.createFileWithFrontmatter({
      created: liveRehearsal.formatUtils.db_formatDateTime(now),
      last_modified: liveRehearsal.formatUtils.db_formatDateTime(now),
      practice_session: practiceSessionLink,
      scenario: practiceSession.lnkField1,
      status: "🟧 in progress",
      entered: false,
      export_to_inputs: false,
      people: Array.isArray(result.data.people) ? result.data.people : [],
      rehearsal_mode: result.data.rehearsal_mode
    });

    await coachingSession.createFileWithFrontmatter({
      created: coachingSession.formatUtils.db_formatDateTime(now),
      last_modified: coachingSession.formatUtils.db_formatDateTime(now),
      practice_session: practiceSessionLink,
      scenario: practiceSession.lnkField1,
      status: "🟧 in progress",
      entered: false,
      export_to_inputs: false,
      people: Array.isArray(result.data.people) ? result.data.people : [],
      meta_skills: result.data.meta_skills,
      core_skills: result.data.core_skills,
      rehearsal_mode: result.data.rehearsal_mode
    });

    result.data.live_rehearsals = liveRehearsal.newCreatedFileLink;
    result.data.coaching_session = coachingSession.newCreatedFileLink;
    break;

  default:
    new Notice("Unknown rehearsal mode selected.");
    break;
}

// Update the Practice Session frontmatter last
await new Promise(resolve => setTimeout(resolve, 600));

await practiceSession.updateFrontMatter(practiceSession.newCreatedFile, {
  created: practiceSession.formatUtils.db_formatDateTime(now),
  last_modified: practiceSession.formatUtils.db_formatDateTime(now),
  people: Array.isArray(result.data.people) ? result.data.people : [],
  scenario: practiceSession.lnkField1,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  live_rehearsals: result.data.live_rehearsals,
  coaching_sessions: result.data.coaching_session,
  rehearsal_mode: result.data.rehearsal_mode
});

console.log("✅ Practice Session flow complete");

-%>

