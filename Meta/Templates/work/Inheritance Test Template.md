---
<%* await tp.user.global_frontmatter() %>
id: <%* tR += tp.date.now("x") %>
created: <%* tR += tp.date.now("YYYY-MM-DD HH:mm") %>
last_modified: <%* tR += tp.date.now("YYYY-MM-DD HH:mm") %>
title: <%* tR += tp.file.title() %>
fileClass: customer
customer status:
  - "{{VALUE: 🟩,🟨,🟧,🟥,⬛️}}"
name: "{{VALUE:Name}}"
notes: "{{VALUE:Notes}}"
---


