import re

def extract(filename, out_js_file, imports_replacement):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'(?s)<script type="module">\s*import.*?\}\);\s*</script>\r?\n?', content)
    if not match:
        print(f"Not found in {filename}")
        return
        
    script_content = match.group(0)
    
    inner_script = re.sub(r'(?s)^<script type="module">\s*', '', script_content)
    inner_script = re.sub(r'(?s)\s*</script>\r?\n?$', '', inner_script)
    
    # Fix the top part up to DOMContentLoaded
    inner_script = re.sub(r'(?s)^import.*?document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{[\s\r\n]*(if\(window\.lucide.*?createIcons\(\);)?', imports_replacement, inner_script)
    # Remove internal ui/topbar inits
    inner_script = re.sub(r'^\s*initWishlistEngine\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initTopBar\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initDayTimeTrack\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initSidebarToggle\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initChecklists\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initReadingList\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initCalendar\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    inner_script = re.sub(r'^\s*initIdeasEngine\(\);.*?\r?\n', '', inner_script, flags=re.MULTILINE)
    
    with open(out_js_file, 'w', encoding='utf-8') as f:
        f.write(inner_script)
        
    new_content = content[:match.start()] + f'    <script type="module" src="js/global.js"></script>\n    <script type="module" src="{out_js_file.replace("app/", "")}"></script>\n' + content[match.end():]
    
    new_content = re.sub(r'<script src="js/sidebar\.js"></script>\r?\n\s*<script>\s*document\.addEventListener.*?renderSidebar\(\);\s*\}\);\s*</script>\r?\n?', '', new_content, flags=re.DOTALL)
    new_content = re.sub(r'<script type="module" src="js/topbar\.js.*?"\s*></script>\r?\n?', '', new_content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Processed {filename}")

budget_imports = """import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
"""

knowledge_imports = """import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
"""

inbox_imports = """import { db, USER_NODE } from './firebase.js';
import { escapeHTML } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
"""

extract('app/budget.html', 'app/js/budget.js', budget_imports)
extract('app/knowledge.html', 'app/js/knowledge.js', knowledge_imports)
extract('app/inbox.html', 'app/js/inbox.js', inbox_imports)
