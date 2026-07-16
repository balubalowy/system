import re

with open('E:/antygravity/app/index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

# Wyciągnięcie topbar i sidebar
match = re.search(r'(<header class="topbar">.*?</aside>)', idx, re.DOTALL)
if match:
    ui_block = match.group(1)
    
    # --- 1. INBOX.HTML ---
    with open('E:/antygravity/app/inbox.html', 'r', encoding='utf-8') as f:
        inb = f.read()
    
    inb = re.sub(r'<header class="topbar".*?</header>', ui_block, inb, flags=re.DOTALL)
    if '<div class="container">' not in inb:
        inb = inb.replace('<main', '<div class="container">\n<main')
        inb = inb.replace('</main>', '</main>\n</div>')
        
    with open('E:/antygravity/app/inbox.html', 'w', encoding='utf-8') as f:
        f.write(inb)

    # --- 2. KNOWLEDGE.HTML ---
    with open('E:/antygravity/app/knowledge.html', 'r', encoding='utf-8') as f:
        knw = f.read()
    
    knw = re.sub(r'<header class="topbar".*?</header>', ui_block, knw, flags=re.DOTALL)
    if '<div class="container">' not in knw:
        knw = knw.replace('<main', '<div class="container">\n<main')
        knw = knw.replace('</main>', '</main>\n</div>')
        
    with open('E:/antygravity/app/knowledge.html', 'w', encoding='utf-8') as f:
        f.write(knw)
    
    print("UI Transfer completed successfully!")
else:
    print("UI Block not found!")
