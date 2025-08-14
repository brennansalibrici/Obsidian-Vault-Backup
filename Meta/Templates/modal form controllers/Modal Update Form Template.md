<%*
const utils = window.customJS.createModalFormUtilsInstance();
const file  = app.workspace.getActiveFile();
await utils.init({ app, tp, fileClass: tp.frontmatter.fileClass, formType: "update" });

const res = await utils.openUpdateFormWithDynamicTitle(file);
if (!res || res.status === "cancelled") return;

const data = res.data ?? (typeof res.getData === "function" ? res.getData() : res);
await utils.updateFileWithFrontmatter(file, data);

/*
const utils = window.customJS.createModalFormUtilsInstance();
const file = app.workspace.getActiveFile();
await utils.init({ app, tp, fileClass: tp.frontmatter.fileClass, formType: "update" });

const modalApi = app?.plugins?.plugins?.modalforms?.api;
if(!modalApi) { console.warn("Modal Forms API not available"); return; }

const values = utils.buildFormValuesFromFrontmatter(file);
const formName = utils.modalFormName;


//Start the observer now (fire-and-forget). Your form must have Custom Class Name = mf-dynamic-title
utils.ensureDynamicTitle(`Update — ${file?.basename || "Untitled"}`, { className: "mf-dynamic-title" });
debugger; 
//Open the form (your form must have Custom Class Name = mf-dynamic-title)
const result = await modalApi.openForm(formName, { values }); 

if (!result || result.status === "cancelled") return;
await utils.updateFileWithFrontmatter(file, result.data);
*/
%>