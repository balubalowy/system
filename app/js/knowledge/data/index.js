// app/js/knowledge/data/index.js
import { mathCategory, mathTree } from './math.js';
import { financeCategory, financeTree } from './finance.js';
import { techCategory, techTree } from './tech.js';
import { languagesCategory, languagesTree } from './languages.js';
import { developmentCategory, developmentTree } from './development.js';

export const DEFAULT_KNOWLEDGE_AREAS = {
    [mathCategory.title]: mathCategory,
    [financeCategory.title]: financeCategory,
    [techCategory.title]: techCategory,
    [languagesCategory.title]: languagesCategory,
    [developmentCategory.title]: developmentCategory
};

export const DEFAULT_KNOWLEDGE_TREE = {
    ...mathTree,
    ...financeTree,
    ...techTree,
    ...languagesTree,
    ...developmentTree
};
