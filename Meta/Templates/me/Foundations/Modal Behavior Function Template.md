<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Behavior Function");

// Init utility instance
const behavior = window.customJS.createModalFormUtilsInstance();
behavior.init({
  app,
  tp,
  fileType: "behavior function",
  context1: result.data.behavior_name || "",
  useContextAsLink: false
});

// Extract function_type from whichever 'type_' field was used
const functionType = [
  result.data.type_avoidance,
  result.data.type_control,
  result.data.type_emotional,
  result.data.type_self,
  result.data.type_connection,
  result.data.type_safety,
  result.data.type_distress,
  result.data.type_moral
].find(val => val && val.length > 0) || null;

// Generate file name and create file
behavior.createNewFileName();

await behavior.createFileWithFrontmatter({
  title: behavior.newCreatedFileName,
  function_group: result.data.function_group,
  function_type: functionType,
  why: result.data.why,
  created: behavior.formatUtils.db_formatDateTime(new Date()),
  last_modified: behavior.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
