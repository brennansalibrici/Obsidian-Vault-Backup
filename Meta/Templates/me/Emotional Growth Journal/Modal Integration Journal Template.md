<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Integration Journal Entry");

//Create Captured Moment note object
const integrationJournal = window.customJS.createModalFormUtilsInstance();
integrationJournal.init({
  app,
  tp,
  fileType: "integration journal",
  context1: result.data.title,
  useContextAsLink: false
});

integrationJournal.createNewFileName();

// 📄 Create new file and inject metadata
await integrationJournal.createFileWithFrontmatter({
  title: integrationJournal.newCreatedFileName,
  people: Array.isArray(result.data.people) ? result.data.people : [],
    summary: result.data.summary,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  created: integrationJournal.formatUtils.db_formatDateTime(new Date()),
  last_modified: integrationJournal.formatUtils.db_formatDateTime(new Date()),
  source_daily_note: integrationJournal.generateDailyNoteLink(),
  emotions: result.data.emotions
});
-%>