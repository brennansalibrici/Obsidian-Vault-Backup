<%*
const modalForm = app.plugins.plugins.modalforms.api;
const utils = window.customJS.createModalFormUtilsInstance();

const file = app.workspace.getActiveFile();

// Grab fileClass directly from YAML frontmatter
const fileClass = tp.frontmatter.fileClass;

// Inject everything you need
await utils.init({ app, tp, fileType: fileClass });

// Use utils object (already initialized)
utils.getUpdateFormFromFileClass(file);

const result = await modalForm.openForm(utils.modalFormName, {
  values: utils.modalFormFieldMap_Values
});

utils.updateFrontMatterFromForm(file, result);
%>