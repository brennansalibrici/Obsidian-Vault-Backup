<%*
// Open the form first
const modalForm = app.plugins.plugins.modalforms.api;
const fileType = tp.frontmatter.newObject;
const utils = window.customJS.createModalFormUtilsInstance();

// INIT FIRST to inject handlers based on fileType
await utils.init({ app, tp, fileType });

// Safely access modal form name from injected handlers
const modalFormName = utils.fileTypeHandler[fileType]?.mdlFormName_CreateNewObject;

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

// Extract context from modal response
const contextField = utils.fileTypeHandler[fileType].mdlFormName_CreateNewObject_fieldMap.title;
const contextValue = result.data?.[contextField] || "";

// Re-run init with context now that we have it
await utils.init({ app, tp, fileType, context1: contextValue });

// Generate filename and create
utils.createNewFileName();
const frontmatter = utils.resolveAllFrontmatter_ObjectCreation(result.data, fileType);
await utils.createFileWithFrontmatter(frontmatter);
%>