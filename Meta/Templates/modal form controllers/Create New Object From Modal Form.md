<%*
//Open the form first
const modalForm = app.plugins.plugins.modalforms.api;
const fileType = tp.frontmatter.newObject;
const utils = window.customJS.createModalFormUtilsInstance();
await utils.init({ app, tp, fileType, formType: "create" });

const result = await modalForm.openForm(utils.modalFormName);
if (result.status === "cancelled") {
  new Notice("🚫 Creation canceled. No file created.");
  return;
}

await utils.createFileWithFrontmatter(result.data);
%>