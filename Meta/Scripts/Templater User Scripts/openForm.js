// Templater user script: openForm.js
module.exports = async (formName, opts = {}) => {
  const modalForm = app.plugins.plugins.modalforms?.api;
  if (!modalForm) {
    new Notice("Modal Forms plugin not available");
    return { status: "cancelled" };
  }

  // Compute a nice title when not provided
  const activeName = app.workspace.getActiveFile()?.basename || "Untitled";
  const inferred =
    opts.mode === "update" ? `Update — ${activeName}` :
    opts.mode === "create" ? `Create — ${activeName}` :
    undefined;

  const options = { ...opts };
  if (!options.title && inferred) options.title = inferred;

  return await modalForm.openForm(formName, options);
};
