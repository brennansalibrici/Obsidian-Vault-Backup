<%*
//Open the form first
const modalForm = app.plugins.plugins.modalforms.api;
const fileType = tp.frontmatter.newObject;
const utils = window.customJS.createModalFormUtilsInstance();
//const mdlFormType = "create";

//Inject handlers based on fileType and find the right form from the injected handlers
await utils.init({ app, tp, fileType, formType: "create" });
const modalFormName = utils.handler.modalFormMap?.mdlFormName;

//Open the form, and if not found, fail fast
if (!modalFormName) {
  new Notice("❌ No modal form defined for this object type.");
  return;
}

const result = await modalForm.openForm(modalFormName);
if (result.status === "cancelled") {
  new Notice("🚫 Creation canceled. No file created.");
  return;
}

await utils.createFileWithFrontmatter(result.data);

/*
//Get title field key from modalFormMap
const titleFieldKey = utils.handler.modalFormMap?.title;
if (!titleFieldKey) {
  new Notice("❌ No title field defined in modalFormMap.");
  return;
}

//Extract title from form data and create filename and new file with it
const titleValue = result.data?.[titleFieldKey] || "Untitled";
utils.createNewFileName(titleValue);*/





/*Old........
// Extract context from modal response
const contextField = utils.fileTypeHandler[fileType].mdlFormName_CreateNewObject_fieldMap.title;
const contextValue = result.data?.[contextField] || "";

// Re-run init with context now that we have it
await utils.init({ app, tp, fileType, context1: contextValue });

// Generate filename and create
utils.createNewFileName();
const frontmatter = utils.resolveAllFrontmatter_ObjectCreation(result.data, fileType);
await utils.createFileWithFrontmatter(frontmatter);*/
%>