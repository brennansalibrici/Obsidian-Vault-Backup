<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Soothing Resource");

// Initialize the file generator
const resource = window.customJS.createModalFormUtilsInstance();
resource.init({
  app,
  tp,
  fileType: "soothing resource",
  context1: result.data.resource_name || "",
  useContextAsLink: false
});

// Generate the file name from the resource name
resource.createNewFileName();

// Create the Soothing Resource file
await resource.createFileWithFrontmatter({
  title: resource.newCreatedFileName,
  resource_type: result.data.resource_type,
  access_mode: result.data.access_mode,
  regulation_zone: result.data.regulation_zone,
  soothing_effects: result.data.soothing_effects,
  created: resource.formatUtils.db_formatDateTime(new Date()),
  last_modified: resource.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
