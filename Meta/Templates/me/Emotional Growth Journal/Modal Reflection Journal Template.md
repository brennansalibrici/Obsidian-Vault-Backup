<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Reflection Journal Entry");

//Create Captured Moment note object
const reflectionJournal = window.customJS.createModalFormUtilsInstance();
reflectionJournal.init({
  app,
  tp,
  fileType: "reflection journal",
  context1: result.data.title,
  useContextAsLink: false
});

reflectionJournal.createNewFileName();

// 📄 Create new file and inject metadata
await reflectionJournal.createFileWithFrontmatter({
  title: reflectionJournal.newCreatedFileName,
  people: Array.isArray(result.data.people) ? result.data.people : [],
    summary: result.data.summary,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  created: reflectionJournal.formatUtils.db_formatDateTime(new Date()),
  last_modified: reflectionJournal.formatUtils.db_formatDateTime(new Date()),
  source_daily_note: reflectionJournal.generateDailyNoteLink(),
  emotions: result.data.emotions
});

-%>