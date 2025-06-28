<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Emotional Wound");

// Init utility instance
const wound = window.customJS.createModalFormUtilsInstance();
wound.init({
  app,
  tp,
  fileType: "emotional wound",
  context1: result.data.wound_name || "",
  useContextAsLink: false
});

// Extract wound_type from whichever 'type_' field was used
const woundType = [
  result.data.type_family,
  result.data.type_psychological,
  result.data.type_social,
  result.data.type_trauma,
  result.data.type_cultural
].find(val => val && val.length > 0) || null;

// Extract origin_context from multiple possible fields
const originContext = [
  result.data.origin_family,
  result.data.origin_psycological,
  result.data.origin_social,
  result.data.origin_trauma,
  result.data.origin_culture
].flat().filter(Boolean);

// Generate file name and create file
wound.createNewFileName();

await wound.createFileWithFrontmatter({
  title: wound.newCreatedFileName,
  wound_group: result.data.wound_group,
  wound_type: woundType,
  origin_context: originContext,
  visible_patterns: result.data.visible_patterns,
  created: wound.formatUtils.db_formatDateTime(new Date()),
  last_modified: wound.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
