<%*
const utils = window.customJS.createModalFormUtilsInstance();
const file = app.workspace.getActiveFile();
await utils.init({ app, tp, fileClass: tp.frontmatter.fileClass, formType: "update" });

const modalApi = app?.plugins?.plugins?.modalforms?.api;
if(!modalApi) { console.warn("Modal Forms API not available"); return; }

const values = utils.buildFormValuesFromFrontmatter(file);
const formName = utils.modalFormName;


//Start the observer now (fire-and-forget). Your form must have Custom Class Name = mf-dynamic-title
utils.ensureDynamicTitle(`Update — ${file?.basename || "Untitled"}`, { className: "mf-dynamic-title" });

//Open the form (your form must have Custom Class Name = mf-dynamic-title)
const result = await modalApi.openForm(formName, { values }); 

if (!result || result.status === "cancelled") return;
await utils.updateFileWithFrontmatter(file, result.data);







/*
// Grab fileClass directly from YAML frontmatter, choose the right form (and type of form) and open it
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();
const file = app.workspace.getActiveFile();

await utils.init({ app, tp, fileClass: tp.frontmatter?.fileClass, formType: "update" });

console.log({
  fileClassFromYaml: tp.frontmatter?.fileClass,
  resolvedFileClass: utils?.fileClass,
  handlerFound: !!utils?.handler,
  modalFormName: utils?.modalFormName
});

//Build pre-fill values from file's existing frontmatter
const values = utils.buildFormValuesFromFrontmatter(file);
debugger;
//const result = await modalForm.openForm(utils.modalFormName, { values });
const result = await utils.openFormWithTitle(
  { values },
  { title: utils.concatUpdateFormTitle(file) }
);

// Cancel check
if (result.status === "cancelled") {
  new Notice("🚫 Update canceled.");
  return;
}

await utils.updateFileWithFrontmatter(file, result.data);
*/
%>