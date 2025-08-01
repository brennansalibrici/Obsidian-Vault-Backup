<%*
//Open the form first
const modalForm = app.plugins.plugins.modalforms.api;
const fileType = tp.frontmatter.newObject;
debugger;
const utils = window.customJS.createModalFormUtilsInstance();
const result = await modalForm.openForm(utils.constructor.fileTypeHandlers[fileType]?.mdlFormName_CreateNewObject);

// Form Cancel check
if (result.status === "cancelled") {
  new Notice("🚫 Creation canceled. No file created.");
  return;
}

//Extract context from the modal form result dynamically
const contextField = utils.constructor.fileTypeHandlers[fileType].mdlFormName_CreateNewObject_fieldMap.title;
const contextValue = result.data?.[contextField] || "";

//Init the modalFormUtils object with context 
await utils.init({ app, tp, fileType, context1: contextValue });

//Generate file name
utils.createNewFileName();

//Build frontmatter and create file
const frontmatter = utils.resolveAllFrontmatter_ObjectCreation(result.data, fileType);
await utils.createFileWithFrontmatter(frontmatter);
%>