<%*
// Open modal form and get result
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Trigger");

// Initialize Trigger object
const trigger = window.customJS.createModalFormUtilsInstance();
trigger.init({
  app,
  tp,
  fileType: "trigger",
  context1: result.data.trigger_name || "",
  useContextAsLink: false
});

// Combine all flag group fields into one flat array
const allFlagFields = [
  result.data.fgroup_emotional,
  result.data.fgroup_rooted,
  result.data.fgroup_power,
  result.data.fgroup_relational,
  result.data.fgroup_avoidance,
  result.data.fgroup_time,
  result.data.fgroup_cognitive,
  result.data.fgroup_boundary
];

const mergedFlags = Array.from(
  new Set(allFlagFields.flat().filter(Boolean))
);

// Extract trigger_type from whichever 'type_' field is filled
const triggerType = [
  result.data.type_relational,
  result.data.type_environmental,
  result.data.type_somantic,
  result.data.type_trauma,
  result.data.type_identity,
  result.data.type_boundary,
  result.data.type_social,
  result.data.type_spiritual
].find(val => val && val.length > 0) || null;

// Extract trigger_origin from whichever 'origin_' field is filled
const triggerOrigin = [
  result.data.origin_relational,
  result.data.origin_enviromental,
  result.data.origin_somatic,
  result.data.origin_trauma,
  result.data.origin_identity,
  result.data.origin_boundary,
  result.data.origin_social,
  result.data.origin_spiritual
].find(val => val && val.length > 0) || null;

// Generate file name
trigger.createNewFileName();

// Create the Trigger file
await trigger.createFileWithFrontmatter({
  title: trigger.newCreatedFileName,
  definition: result.data.definition,
  trigger_group: result.data.type_group,
  trigger_type: triggerType,
  trigger_origin: triggerOrigin,
  protective_strategies: result.data.protective_strategies,
  trigger_flags: mergedFlags,
  created: trigger.formatUtils.db_formatDateTime(new Date()),
  last_modified: trigger.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
