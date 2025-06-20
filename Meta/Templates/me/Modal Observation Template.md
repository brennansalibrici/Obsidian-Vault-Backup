<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Observation");

//Create Captured Moment note object
const observation = window.customJS.createModalFormUtilsInstance();
observation.init({
  app,
  tp,
  fileType: "observation",
  context1: result.data.title,
  useContextAsLink: false
});

observation.createNewFileName();

// 📄 Create new file and inject metadata
await observation.createFileWithFrontmatter({
  title: observation.newCreatedFileName,
  people: Array.isArray(result.data.people) ? result.data.people : [],
  importance: result.data.importance,
  summary: result.data.summary,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  created: observation.formatUtils.db_formatDateTime(new Date()),
  last_modified: observation.formatUtils.db_formatDateTime(new Date()),
  source_daily_note: observation.generateDailyNoteLink(),
  feelings: result.data.feelings
});

-%>