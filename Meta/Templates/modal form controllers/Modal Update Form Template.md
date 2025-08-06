<%*
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();
const file = app.workspace.getActiveFile();

// Grab fileClass directly from YAML frontmatter
const fileClass = tp.frontmatter.fileClass;

// Inject everything you need
await utils.init({ app, tp, fileType: fileClass, formType: "update" });

// Safely access modal form name from injected handlers
const modalFormName = utils.handler.modalFormMap?.mdlFormName;

// If not found, fail fast
if (!modalFormName) {
  new Notice("❌ No modal form defined for this object type.");
  return;
}

// Open modal form
const result = await modalForm.openForm(modalFormName);

// Cancel check
if (result.status === "cancelled") {
  new Notice("🚫 Creation canceled. No file created.");
  return;
}


/*Old...
// Use utils object (already initialized)
utils.getUpdateFormFromFileClass(file);

const result = await modalForm.openForm(utils.modalFormName, {
  values: utils.modalFormFieldMap_Values
});

utils.updateFrontMatterFromForm(file, result);*/
%>