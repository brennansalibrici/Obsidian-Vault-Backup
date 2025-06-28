<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Attachment Need");

// Init utility
const need = window.customJS.createModalFormUtilsInstance();
need.init({
  app,
  tp,
  fileType: "attachment need",
  context1: result.data.aneed_name || "",
  useContextAsLink: false
});

// Extract need_type from prioritized modal checkboxes
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

// Extract threatened_by items (multi file links)
const supports = [
  result.data.supports_soothing,
  result.data.supports_strategy,
  result.data.supports_strategy,
  result.data.supports_strategy,
  result.data.supports_wound,
  result.data.supports_voice,
  result.data.supports_people,
  result.data.supports_theory
].flat().filter(Boolean);

// Generate filename and create file
need.createNewFileName();

await need.createFileWithFrontmatter({
  title: need.newCreatedFileName,
  need_group: result.data.need_group,
  need_type: needType,
  developmental_origin: result.data.developmental_origins,
  unmet_effects: result.data.unmet_effects,
  definition: result.data.definition,
  attachment_style_link: result.data.attach_style,
  rupture_effects: result.data.rupture_effects,
  relational_fulfillment: result.data.relational_fulfillment,
  relational_risk: result.data.relational_risk,
  earned_security_supports: result.data.earned_security_supports,
  partner_attunement_cue: result.data.partner_attachment_cue,
  created: need.formatUtils.db_formatDateTime(new Date()),
  last_modified: need.formatUtils.db_formatDateTime(new Date()),
  support_source_group: result.data.support_source_group,
  earned_security_supports: supports,
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
