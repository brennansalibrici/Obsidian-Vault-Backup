<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Trade-Off");

// Init utility
const tradeoff = window.customJS.createModalFormUtilsInstance();
tradeoff.init({
  app,
  tp,
  fileType: "tradeoff",
  context1: result.data.tradeoff_name || "",
  useContextAsLink: false
});

// Resolve tradeoff_type from prioritized checkboxes
const tradeoffType = [
  result.data.type_connection,
  result.data.type_safety,
  result.data.type_control,
  result.data.type_shortterm,
  result.data.type_self,
  result.data.type_avoidance,
  result.data.type_familiarity,
  result.data.type_power,
  result.data.type_belonging
].find(val => val && val.length > 0) || null;

// Resolve dominant_pole from prioritized checkboxes
const dominantPole = [
  result.data.ptype_safety,
  result.data.ptype_connection,
  result.data.ptype_truth,
  result.data.ptype_regulation,
  result.data.ptype_identity,
  result.data.ptype_grouth
].find(val => val && val.length > 0) || null;

// Resolve resolved_by from prioritized checkboxes
const resolvedBy = [
  result.data.rinternal_group,
  result.data.rrelational_group,
  result.data.rcognitive_group,
  result.data.rpractice_group
].filter(Boolean).flat();

// Generate file name
tradeoff.createNewFileName();

await tradeoff.createFileWithFrontmatter({
  title: tradeoff.newCreatedFileName,
  tradeoff_group: result.data.tradeoff_group,
  tradeoff_type: tradeoffType,
  applies_to: result.data.applies_to,
  example_behavior: result.data.example_behavior,
  dominant_pole_group: result.data.pole_group,
  dominant_pole: dominantPole,
  conflicted_part: result.data.conflicted_part,
  resolved_by: resolvedBy,
  resolved_by_group: result.data.resolvedby_group
  created: tradeoff.formatUtils.db_formatDateTime(new Date()),
  last_modified: tradeoff.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
