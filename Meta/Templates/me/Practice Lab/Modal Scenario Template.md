<%*
// Open modal and grab user input
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Scenario");

// Create Scenario note object
const scenario = window.customJS.createModalFormUtilsInstance();
scenario.init({
  app,
  tp,
  fileType: "scenario",  // or "core wound" if that's what you're using
  context1: result.data.title,
  useContextAsLink: false
});
scenario.createNewFileName();

// 📄 Create new file and inject metadata
await scenario.createFileWithFrontmatter({
  title: result.data.title,
  people: Array.isArray(result.data.people) ? result.data.people : [],
  type: result.data.type,
  summary: result.data.summary,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  created: scenario.formatUtils.db_formatDateTime(new Date()),
  last_modified: scenario.formatUtils.db_formatDateTime(new Date())
});

-%>