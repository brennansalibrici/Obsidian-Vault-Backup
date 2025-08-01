<%*
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();
//Get active file, open and populate the appropriate form
let file = app.workspace.getActiveFile();
utils.getUpdateFormFromFileClass(app, tp, file);
const result = await modalForm.openForm(utils.modalFormName, {values: utils.modalFormFieldMap_Values});
//Update file with changes made from the form
utils.updateFrontMatterFromForm(file, result);
%>