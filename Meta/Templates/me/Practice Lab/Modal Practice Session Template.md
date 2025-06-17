<%*

//Open the modal form and it's api; get the modalFormUtilities class and general defs
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Practice Log");

//Create the Practice Session Object
const practiceSession = window.customJS.createModalFormUtilsInstance();
practiceSession.init(app,tp,"PRACTICE_SESSION","ME/🧪 Practice Lab/🎬 Practice Logs","Practice Session Template",result.data.scenario);
practiceSession.createNewFileName();

//Create the Practice Session File FIRST, before anything else
await practiceSession.createNewFileFromTemplate();
const practiceSessionLink = practiceSession.newCreatedFileLink;

//**Safety Check**
if (!practiceSession.newCreatedFile) {
  new Notice("Failed to create Practice Session file.");
  throw new Error("Practice session file not created");
}

//Create the LiveRehearsal Object
const liveRehearsal = window.customJS.createModalFormUtilsInstance();
liveRehearsal.init(app,tp,"LIVE_REHEARSAL","ME/🧪 Practice Lab/🎙️ Live Rehearsals","Live Rehearsal Template",practiceSession.newCreatedFileName);
liveRehearsal.createNewFileName();

//Create the Coaching Session Object
const coachingSession = window.customJS.createModalFormUtilsInstance();
coachingSession.init(app,tp,"COACHING_SESSION","ME/🧪 Practice Lab/🧠 Coaching","Coaching Session Template",practiceSession.newCreatedFileName);
coachingSession.createNewFileName();

//Insert data into results object from the modal form
result.data.scenario = practiceSession.lnkField1;
//await tp.file.rename(practiceSession.newCreatedFileName);
result.data.title = practiceSession.newCreatedFileName;
if(result.data.meta_skills) {result.data.meta_skills = `[[${result.data.meta_skills}]]`;}
if(result.data.core_skills) {result.data.core_skills = `[[${result.data.core_skills}]]`;}

//Depending on selected mode, create the other files and store their links
switch(result.data.rehearsal_mode){
  case "Live Rehearsal":

	//Create New Live Rehearsal File
	await liveRehearsal.createFileWithFrontmatter({
	  practice_session: practiceSessionLink,
	  scenario: practiceSession.lnkField1,
	  status: "🟧 in progress",
	  entered: false,
	  export_to_inputs: false,
	  people: Array.isArray(result.data.people) ? result.data.people : [],
	  rehearsal_mode: result.data.rehearsal_mode
	});
	
	//Update Practice Session frontmatter and Insert New Live Rehearsal into the Practice Session
	result.data.live_rehearsals = liveRehearsal.newCreatedFileLink;
	result.data.coaching_session = "";

    break;

  case "Coaching":
  console.log("Switch Test", "Coaching is Selected");

	//Create New Coaching Session File
	await coachingSession.createFileWithFrontmatter({
	  practice_session: practiceSessionLink,
	  scenario: practiceSession.lnkField1,
	  status: "🟧 in progress",
	  entered: false,
	  export_to_inputs: false,
	  people: Array.isArray(result.data.people) ? result.data.people : [],
	  meta_skills: result.data.meta_skills,
	  core_skills: result.data.core_skills,
	  rehearsal_mode: result.data.rehearsal_mode	  
	});
	
	//Update Practice Session frontmatter and Insert New Live Rehearsal into the Practice Session
	result.data.live_rehearsals = "";
	result.data.coaching_session = coachingSession.newCreatedFileLink;
	
   break;
  
   case "Live Rehearsal & Coaching":
  

	//Create New Live Rehearsal File
	await liveRehearsal.createFileWithFrontmatter({
	  practice_session: practiceSession.newCreatedFileLink,
	  scenario: practiceSession.lnkField1,
	  status: "🟧 in progress",
	  entered: false,
	  export_to_inputs: false,
	  people: Array.isArray(result.data.people) ? result.data.people : [],
	  rehearsal_mode: result.data.rehearsal_mode
	});

	//Create New Coaching Session File
	await coachingSession.createFileWithFrontmatter({
	  practice_session: practiceSession.newCreatedFileLink,
	  scenario: practiceSession.lnkField1,
	  status: "🟧 in progress",
	  entered: false,
	  export_to_inputs: false,
	  people: Array.isArray(result.data.people) ? result.data.people : [],
	  meta_skills: result.data.meta_skills,
	  core_skills: result.data.core_skills,
	  rehearsal_mode: result.data.rehearsal_mode	  
	});
	
	//Update Practice Session frontmatter and Insert New Live Rehearsal into the Practice Session
	result.data.live_rehearsals = liveRehearsal.newCreatedFileLink;
	result.data.coaching_session = coachingSession.newCreatedFileLink;
	
  break;
  
  default:
    new Notice("Unknown rehearsal type selected.");
    break;
}

await new Promise(resolve => setTimeout(resolve, 600));
await practiceSession.updateFrontMatter(practiceSession.newCreatedFile,{
  people: Array.isArray(result.data.people) ? result.data.people : [],
  scenario: practiceSession.lnkField1,
  status: "🟧 in progress",
  entered: false,
  export_to_inputs: false,
  live_rehearsals: result.data.live_rehearsals,
  coaching_sessions: result.data.coaching_session,
  rehearsal_mode: result.data.rehearsal_mode
});
console.log("✅ Update complete", "Update Complete");

//tR += result.asFrontmatterString();

-%>

