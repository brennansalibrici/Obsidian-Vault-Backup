<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Captured Moment");

//Create Captured Moment note object
const capturedMoment = window.customJS.createModalFormUtilsInstance();
capturedMoment.init({
  app,
  tp,
  fileType: "captured moment",
  context1: result.data.title,
  useContextAsLink: false
});

capturedMoment.createNewFileName();

// 📄 Create new file and inject metadata
await capturedMoment.createFileWithFrontmatter({
  title: capturedMoment.newCreatedFileName,
  people: Array.isArray(result.data.people) ? result.data.people : [],
  importance: result.data.importance,
  summary: result.data.summary,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  created: capturedMoment.formatUtils.db_formatDateTime(new Date()),
  last_modified: capturedMoment.formatUtils.db_formatDateTime(new Date()),
  source_daily_note: capturedMoment.generateDailyNoteLink(),
  emotions: result.data.feelings
});
-%>