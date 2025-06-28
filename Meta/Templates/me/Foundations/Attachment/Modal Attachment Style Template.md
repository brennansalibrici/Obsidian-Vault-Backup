<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Attachment Style");

// Init utility
const style = window.customJS.createModalFormUtilsInstance();
style.init({
  app,
  tp,
  fileType: "attachment style",
  context1: result.data.style_name || "",
  useContextAsLink: false
});

//Extract core_fear from modal select fields
const fear = [
result.data.fear_relational,
result.data.fear_identity,
result.data.fear_vulnerable,
result.data.fear_autonomy
].find(val => val && val.length > 0) || null;

//Extract rupture_type from multiselect fields
const ruptures = [
result.data.rtype_neglect,
result.data.rtype_misattunement,
result.data.rtype_boundary,
result.data.rtype_breaks
].flat().filter(Boolean);

// Generate filename and create file
style.createNewFileName();

await style.createFileWithFrontmatter({
  title: style.newCreatedFileName,
  style_group: result.data.style_group,
  style_type: result.data.style_type,
  style_subtype: result.data.style_subtype,
  style_pattern: result.data.style_pattern,
  progression_from: result.data.progression_from,
  progression_to: result.data.progression_to,
  core_fears_group: result.data.core_fears_group,
  core_fears: fear,
  rupture_group: result.data.rupture_group,
  rupture_types: ruptures,
  internal_challenges: result.data.internal_challenges,
  relational_challenges: result.data.relational_challenges,
  partner_attunement: result.data.partner_attunement,
  definition: result.data.definition,
  created: style.formatUtils.db_formatDateTime(new Date()),
  last_modified: style.formatUtils.db_formatDateTime(new Date()),
 
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});

/*
const { modalFormData, createFileWithFrontMatter } = this;

const frontmatter = {
  fileClass: "attachment_style",
  title: modalFormData["style_name"],
  style_group: modalFormData["style_group"],
  style_type: modalFormData["style_type"],
  style_subtype: modalFormData["style_subtype"],
  style_pattern: modalFormData["style_pattern"],
  core_fears_group: modalFormData["core_fears_group"],
  core_fears: [
    ...modalFormData["fear_relational"] || [],
    ...modalFormData["fear_identity"] || [],
    ...modalFormData["fear_vulnerable"] || [],
    ...modalFormData["fear_autonomy"] || []
  ],
  progression_from: modalFormData["progression_from"],
  progression_to: modalFormData["progression_to"],
  rupture_group: modalFormData["rupture_group"],
  rupture_types: [
    ...modalFormData["rtype_neglect"] || [],
    ...modalFormData["rtype_misattunement"] || [],
    ...modalFormData["rtype_boundary"] || [],
    ...modalFormData["rtype_breaks"] || []
  ],
  internal_challenges: modalFormData["internal_challenges"],
  relational_challenges: modalFormData["relational_challenges"],
  partner_attunement: modalFormData["partner_attunement"],
  definition: modalFormData["definition"],
  // required boilerplate:
  created: tp.date.now("YYYY-MM-DD HH:mm"),
  last_modified: tp.date.now("YYYY-MM-DD HH:mm"),
  id: tp.date.now("x"),
  status: "",
  type: "trigger",
  tags: [],
  category: "note",
  entered: true,
  archived: false,
  priority: "⚪ None",
  visibility: "🔒 private",
  linked_wounds: [],
  internal_voices: [],
  associated_emotions: [],
  soothing_resources: [],
  healing_pathways: [],
  healing_resources: [],
  protective_strategies: [],
  triggered_by: [],
  needs_behind_it: [],
  behavior_functions: [],
  tradeoffs: [],
  notes: "",
  related: [],
  media: [],
  attachments: []
};

await createFileWithFrontMatter(frontmatter);
*/
%>
