<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Emotional Need");

// Init file utility
const need = window.customJS.createModalFormUtilsInstance();
need.init({
  app,
  tp,
  fileType: "emotional need",
  context1: result.data.need_name || "",
  useContextAsLink: false
});

// Extract need_type from prioritized type fields
const needType = [
  result.data.type_attachment,
  result.data.type_attunement,
  result.data.type_autonomy,
  result.data.type_identity,
  result.data.type_security,
  result.data.type_expression,
  result.data.type_regulation,
  result.data.type_competence,
  result.data.type_meaning,
  result.data.type_belonging,
  result.data.type_boundary
].find(val => val && val.length > 0) || null;

// Extract multi-threat sources
const threatenedBy = [
  result.data.threat_trigger,
  result.data.threat_wound,
  result.data.threat_voice,
  result.data.threat_strategy,
  result.data.threat_function,
  result.data.threat_trade
].flat().filter(Boolean);

// Generate filename
need.createNewFileName();

await need.createFileWithFrontmatter({
  title: need.newCreatedFileName,
  need_group: result.data.need_group,
  need_type: needType,
  developmental_origin: result.data.developmental_origins,
  threatened_by: threatenedBy,
  threat_source_group: result.data.threat_source_group,
  unmet_effects: result.data.unmet_effects,
  definition: result.data.definition,
  created: need.formatUtils.db_formatDateTime(new Date()),
  last_modified: need.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
