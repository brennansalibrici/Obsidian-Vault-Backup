---
Status: 
tags: " person/work"
Created: 2025-04-25T16:35:36
mapWithTag: true
fileClass: person
KeepInTouch: false
LastChatted:
Summary: 
---
## Details
## Events
## Conversations
%% Feel free to just make a link to this header if you had a quick conversation with someone that you logged in the `Conversations` part of your daily template %%
```dataview
table file.link as "Conversation"
from ""
where contains(text, "Nate Kinney") and contains(text, "#Conversations")
sort file.ctime desc
```
## Thoughts
```dataview
TABLE Created, tags
FROM [[]] AND #thought AND !"Hidden"
SORT Created desc
```
## Questions To Ask
%% For next time you chat with them %%: