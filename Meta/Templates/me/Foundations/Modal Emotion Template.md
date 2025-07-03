<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Emotion");

// Init utility
const emotion = window.customJS.createModalFormUtilsInstance();
emotion.init({
  app,
  tp,
  fileType: "emotion",
  context1: result.data.emotion_name || "",
  useContextAsLink: false
});

//Generate file name
emotion.createNewFileName();

await emotion.createFileWithFrontmatter({
title: result.data.emotion_name,
  status: "🟩 complete",
  emotion_group: result.data.emotion_group,
  emotion_type: result.data.emotion_type,
  energy_mood: result.data.energy_mood,
  emotion_origins: result.data.emotion_origins,
  emotion_effects: result.data.emotion_effects,
  emotion_flags: result.data.emotion_flags,
  emotion_color: result.data.emotion_color,
  opposite: result.data.opposite,
  internal_voices: result.data["internal voices"],
  linked_wounds: result.data.linked_wounds,
  soothing_resources: result.data.soothing_resources,
  needs_behind_it: result.data.needs_behind_it,
  triggered_by: result.data.triggered_by,
  definition: result.data.definition
});

/*
// Begin building frontmatter
emotion.frontmatter = {
  title: result.data.emotion_name,
  emotion_group: result.data.emotion_group,
  emotion_type: result.data.emotion_type,
  energy_mood: result.data.energy_mood,
  emotion_origins: result.data.emotion_origins,
  emotion_effects: result.data.emotion_effects,
  emotion_flags: result.data.emotion_flags,
  emotion_color: result.data.emotion_color,
  opposite: result.data.opposite,
  internal_voices: result.data["internal voices"],
  linked_wounds: result.data.linked_wounds,
  soothing_resources: result.data.soothing_resources,
  needs_behind_it: result.data.needs_behind_it,
  triggered_by: result.data.triggered_by,
  definition: result.data.definition
};

// Create the file
await emotion.create();
*/
%>
