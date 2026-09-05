import { describe, it, expect } from 'vitest';
import {
  parseFrontmatter,
  extractSections,
  loadDocTopics,
  extractRawContent,
  parseDocItem,
  groupTopicsByFolder,
  sortDocTopics,
} from './docsLoader';

describe('docsLoader', () => {
  describe('extractRawContent', () => {
    it('handles string input directly', () => {
      expect(extractRawContent('raw content')).toBe('raw content');
    });

    it('extracts default property from object', () => {
      expect(extractRawContent({ default: 'module markdown' })).toBe('module markdown');
    });

    it('returns empty string for invalid inputs', () => {
      expect(extractRawContent(null)).toBe('');
      expect(extractRawContent(12345)).toBe('');
    });
  });

  describe('parseFrontmatter', () => {
    it('parses valid YAML frontmatter with single and double quotes', () => {
      const input = `---
id: "test-id"
title: 'Test Title'
order: 1
calloutType: info
unquotedKey: unquoted-value
noColonLine
---
# Content Header
This is body.`;

      const { data, content } = parseFrontmatter(input);
      expect(data.id).toBe('test-id');
      expect(data.title).toBe('Test Title');
      expect(data.order).toBe('1');
      expect(data.calloutType).toBe('info');
      expect(data.unquotedKey).toBe('unquoted-value');
      expect(content).toBe('# Content Header\nThis is body.');
    });

    it('returns empty data when no frontmatter is present', () => {
      const input = `# Just Markdown
No frontmatter here.`;

      const { data, content } = parseFrontmatter(input);
      expect(data).toEqual({});
      expect(content).toBe(input);
    });

    it('handles unclosed frontmatter gracefully', () => {
      const input = `---
id: unclosed
title: Broken`;

      const { data, content } = parseFrontmatter(input);
      expect(data).toEqual({});
      expect(content).toBe(input);
    });
  });

  describe('extractSections', () => {
    it('extracts ## headings and generates slugified ids', () => {
      const markdown = `
# Title (ignored)
## Overview & Architecture
Some text.
## Key Features 2026
More text.
### Subheading (ignored)
`;

      const sections = extractSections(markdown);
      expect(sections).toEqual([
        { id: 'overview-architecture', title: 'Overview & Architecture' },
        { id: 'key-features-2026', title: 'Key Features 2026' },
      ]);
    });

    it('returns empty array when no ## headings exist', () => {
      const markdown = 'Just plain paragraphs and text.';
      expect(extractSections(markdown)).toEqual([]);
    });
  });

  describe('parseDocItem', () => {
    it('populates defaults when frontmatter fields are omitted', () => {
      const doc = parseDocItem('simple-guide.md', '# Header\n\nBody content');
      expect(doc.id).toBe('simple-guide');
      expect(doc.title).toBe('simple guide');
      expect(doc.fileName).toBe('simple-guide');
      expect(doc.slug).toBe('simple-guide');
      expect(doc.folder).toBe('General');
      expect(doc.order).toBe(99);
      expect(doc.summary).toBe('');
      expect(doc.callout).toBeUndefined();
      expect(doc.externalLinks).toEqual([]);
    });

    it('handles empty path string falling back to untitled', () => {
      const doc = parseDocItem('', '# Content');
      expect(doc.id).toBe('untitled');
      expect(doc.title).toBe('untitled');
      expect(doc.fileName).toBe('untitled');
      expect(doc.slug).toBe('untitled');
    });

    it('parses callout without title, component preview type, and externalUrl without label', () => {
      const input = `---
calloutType: warning
component: button
externalUrl: https://specs.example.com
---
## Test Section`;

      const doc = parseDocItem('docs/Architecture/advanced.md', input);
      expect(doc.callout?.title).toBe('Note');
      expect(doc.callout?.type).toBe('warning');
      expect(doc.componentPreviewType).toBe('button');
      expect(doc.fileName).toBe('advanced');
      expect(doc.folder).toBe('Architecture');
      expect(doc.externalLinks[0]).toEqual({
        label: 'External Reference',
        url: 'https://specs.example.com',
        type: 'external',
      });
    });
  });

  describe('loadDocTopics', () => {
    it('loads all documents from docs/ directory grouped by folder', () => {
      const { topics, folderGroups } = loadDocTopics();

      expect(topics.length).toBe(3);
      expect(folderGroups.length).toBe(1);

      const folders = folderGroups.map((g) => g.folder);
      expect(folders).toContain('Personal Projects');

      const expenso = topics.find((t) => t.id === 'expenso-android');
      expect(expenso).toBeDefined();
      expect(expenso?.folder).toBe('Personal Projects');
      expect(expenso?.fileName).toBe('expenso-android');
      expect(expenso?.callout?.type).toBe('security');
      expect(expenso?.externalLinks.length).toBe(2);

      const aiAssistant = topics.find((t) => t.id === 'ai-work-assistant');
      expect(aiAssistant).toBeDefined();
      expect(aiAssistant?.folder).toBe('Personal Projects');
      expect(aiAssistant?.fileName).toBe('ai-work-assistant');

      const qrTransfer = topics.find((t) => t.id === 'qr-file-transfer');
      expect(qrTransfer).toBeDefined();
      expect(qrTransfer?.folder).toBe('Personal Projects');
      expect(qrTransfer?.fileName).toBe('qr-file-transfer');
    });
  });

  describe('groupTopicsByFolder', () => {
    it('groups topics and sorts folder groups alphabetically', () => {
      const mockTopics = [
        {
          id: 'z-topic',
          title: 'Z Topic',
          folder: 'Zebra Folder',
          fileName: 'z-topic',
          slug: 'z-topic',
          order: 1,
          summary: '',
          breadcrumbs: [],
          externalLinks: [],
          sections: [],
          markdown: '',
        },
        {
          id: 'a-topic',
          title: 'A Topic',
          folder: 'Alpha Folder',
          fileName: 'a-topic',
          slug: 'a-topic',
          order: 2,
          summary: '',
          breadcrumbs: [],
          externalLinks: [],
          sections: [],
          markdown: '',
        },
      ];

      const groups = groupTopicsByFolder(mockTopics);
      expect(groups).toHaveLength(2);
      expect(groups[0].folder).toBe('Alpha Folder');
      expect(groups[1].folder).toBe('Zebra Folder');
    });
  });

  describe('sortDocTopics', () => {
    it('sorts topics primarily by order and secondarily by fileName when order is identical', () => {
      const mockTopics = [
        {
          id: 'topic-b',
          title: 'Topic B',
          folder: 'General',
          fileName: 'beta-file',
          slug: 'topic-b',
          order: 1,
          summary: '',
          breadcrumbs: [],
          externalLinks: [],
          sections: [],
          markdown: '',
        },
        {
          id: 'topic-a',
          title: 'Topic A',
          folder: 'General',
          fileName: 'alpha-file',
          slug: 'topic-a',
          order: 1,
          summary: '',
          breadcrumbs: [],
          externalLinks: [],
          sections: [],
          markdown: '',
        },
        {
          id: 'topic-c',
          title: 'Topic C',
          folder: 'General',
          fileName: 'charlie-file',
          slug: 'topic-c',
          order: 2,
          summary: '',
          breadcrumbs: [],
          externalLinks: [],
          sections: [],
          markdown: '',
        },
      ];

      const sorted = sortDocTopics(mockTopics);
      expect(sorted[0].fileName).toBe('alpha-file');
      expect(sorted[1].fileName).toBe('beta-file');
      expect(sorted[2].fileName).toBe('charlie-file');
    });
  });
});
