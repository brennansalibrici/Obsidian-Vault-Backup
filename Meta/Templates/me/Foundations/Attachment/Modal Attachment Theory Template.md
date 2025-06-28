<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Attachment Theory");

// Init utility
const theory = window.customJS.createModalFormUtilsInstance();
theory.init({
  app,
  tp,
  fileType: "attachment theory",
  context1: result.data.theory_name || "",
  useContextAsLink: false
});

// Extract need_type from prioritized modal checkboxes
const fears = [
  result.data.fear_relational,
  result.data.fear_identity,
  result.data.fear_vulnerable,
  result.data.fear_autonomy,
  result.data.type_security
].find(val => val && val.length > 0) || null;

// Extract threatened_by items (multi file links)
const effects = [
  result.data.etrust_effects,
  result.data.evulnerability_effects,
  result.data.ecloseness_effects,
  result.data.ecommunication_effectes,
  result.data.eself_effects
 ].flat().filter(Boolean);

// Extract integration_tips items (multi file links)
const tips = [
  result.data.itip_core,
  result.data.itip_realtional,
  result.data.itip_somatic,
  result.data.itip_cognitive,
  result.data.itip_external
 ].flat().filter(Boolean);

// Extract influenced_by items (multi file links)
const influence = [
  result.data.if_attach,
  result.data.if_poly,
  result.data.if_poly,
  result.data.if_modern
 ].flat().filter(Boolean);


// Generate filename and create file
theory.createNewFileName();

await theory.createFileWithFrontmatter({
  title: theory.newCreatedFileName,
  style_group: result.data.style_group,
  styles: result.data.style_type,
  core_fears_group: result.data.core_fears_group,
  core_fears: fears,
  strategies: result.data.strategies,
  relational_effects_group: result.data.relational_effects_group,
  relational_effects: effects,
  growth_path: result.data.growth_path,
  integration_group: result.data.integration_group,
  integration_tips: tips,
  influenced_by: influence,
  notes: result.data.note,
  created: theory.formatUtils.db_formatDateTime(new Date()),
  last_modified: theory.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
