<%*
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();

// Step 1: Get active file, open and populate the appropriate form
let file = app.workspace.getActiveFile();
//debugger;
utils.getUpdateFormFromFileClass(app, tp, file);
const result = await modalForm.openForm(utils.modalFormName, {values: utils.modalFormFieldMap_Values});


%>


