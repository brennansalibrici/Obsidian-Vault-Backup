<%*
// Grab fileClass directly from YAML frontmatter, choose the right form (and type of form) and open it
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();
const file = app.workspace.getActiveFile();
const fileClass = tp.frontmatter.fileClass;
await utils.init({ app, tp, fileType: fileClass, formType: "update" });

//Build pre-fill values from file's existing frontmatter
const values = utils.buildFormValuesFromFrontmatter(file);
const result = await modalForm.openForm(utils.modalFormName, { values });

// Cancel check
if (result.status === "cancelled") {
  new Notice("🚫 Update canceled.");
  return;
}

await utils.updateFileWithFrontmatter(file, result.data);
%>