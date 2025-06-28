<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Protective Strategy");

// Init utility
const strategy = window.customJS.createModalFormUtilsInstance();
strategy.init({
  app,
  tp,
  fileType: "protective strategy",
  context1: result.data.strategy_name || "",
  useContextAsLink: false
});

// Extract strategy_type from prioritized source fields
const strategyType = [
  result.data.type_cognitive,
  result.data.type_behavioral,
  result.data.type_relational,
  result.data.type_somatic,
  result.data.type_emotional,
  result.data.type_defensive,
  result.data.type_identity
].find(val => val && val.length > 0) || null;

// Extract functions (multi)
const functions = [
  result.data.ftype_protection,
  result.data.ftype_emotional,
  result.data.ftype_relational,
  result.data.ftype_control,
  result.data.ftype_cognitive
].flat().filter(Boolean);

// Extract tradeoffs (multi)
const tradeoffs = [
  result.data.ttype_connection,
  result.data.ttype_safety,
  result.data.ttype_control,
  result.data.ttype_shortterm,
  result.data.ttype_self,
  result.data.ttype_avoidance,
  result.data.ttype_familiar,
  result.data.ttype_power,
  result.data.ttype_belonging
].flat().filter(Boolean);

// Generate file name and create file
strategy.createNewFileName();

await strategy.createFileWithFrontmatter({
  title: strategy.newCreatedFileName,
  strategy_group: result.data.strategy_group,
  strategy_type: strategyType,
  function_group: result.data.function_group,
  functions: functions,
  tradeoff_group: result.data.tradeoff_group,
  tradeoffs: tradeoffs,
  adaptive_alternatives: result.data.adaptive_alternatives,
  narrative: result.data.narrative,
  created: strategy.formatUtils.db_formatDateTime(new Date()),
  last_modified: strategy.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
