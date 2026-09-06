export interface DocSection {
  id: string;
  title: string;
}

export interface DocExternalLink {
  label: string;
  url: string;
  type: 'github' | 'playstore' | 'external';
}

export interface DocTopic {
  id: string;
  title: string;
  folder: string;
  fileName: string;
  slug: string;
  order: number;
  summary: string;
  breadcrumbs: string[];
  callout?: {
    type: 'note' | 'info' | 'warning' | 'security';
    title: string;
    message: string;
  };
  componentPreviewType?: 'button' | 'badge' | 'card';
  externalLinks: DocExternalLink[];
  sections: DocSection[];
  markdown: string;
}

export interface DocFolderGroup {
  folder: string;
  topics: DocTopic[];
}

/**
 * Extracts raw string content from dynamic import module.
 */
export function extractRawContent(moduleContent: unknown): string {
  if (typeof moduleContent === 'string') {
    return moduleContent;
  }
  if (moduleContent && typeof moduleContent === 'object' && 'default' in moduleContent) {
    return String((moduleContent as { default: unknown }).default);
  }
  return '';
}

/**
 * Parses simple YAML-style frontmatter from markdown content.
 */
export function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: trimmed };
  }

  const endIndex = trimmed.indexOf('---', 3);
  if (endIndex === -1) {
    return { data: {}, content: trimmed };
  }

  const frontmatterStr = trimmed.slice(3, endIndex).trim();
  const content = trimmed.slice(endIndex + 3).trim();
  const data: Record<string, string> = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove enclosing quotes if any
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  }

  return { data, content };
}

/**
 * Extracts sections from markdown headers (## Header Title).
 */
export function extractSections(markdown: string): DocSection[] {
  const sections: DocSection[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const title = match[1].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      sections.push({ id, title });
    }
  }

  return sections;
}

/**
 * Parses a single markdown document into a DocTopic item.
 */
export function parseDocItem(cleanPath: string, rawString: string): DocTopic {
  const parts = cleanPath.replace(/\\/g, '/').split('/');
  const rawFileName = parts[parts.length - 1] || 'untitled.md';
  const folderName = parts[parts.length - 2] || 'General';
  const fileName = rawFileName.replace(/\.md$/i, '');
  const slug = fileName;

  const { data, content } = parseFrontmatter(rawString);

  const id = data.id || slug;
  const title = data.title || slug.replace(/-/g, ' ');
  const order = data.order ? parseInt(data.order, 10) : 99;
  const summary = data.summary || '';
  const component = data.component as 'button' | 'badge' | 'card' | undefined;

  const callout = data.calloutType
    ? {
        type: data.calloutType as 'note' | 'info' | 'warning' | 'security',
        title: data.calloutTitle || 'Note',
        message: data.calloutMessage || '',
      }
    : undefined;

  const externalLinks: DocExternalLink[] = [];
  if (data.github) {
    externalLinks.push({
      label: 'GitHub Repository',
      url: data.github,
      type: 'github',
    });
  }
  if (data.playstore) {
    externalLinks.push({
      label: 'View on Google Play Store',
      url: data.playstore,
      type: 'playstore',
    });
  }
  if (data.externalUrl) {
    externalLinks.push({
      label: data.externalLabel || 'External Reference',
      url: data.externalUrl,
      type: 'external',
    });
  }

  const sections = extractSections(content);

  return {
    id,
    title,
    folder: folderName,
    fileName,
    slug,
    order,
    summary,
    breadcrumbs: ['Documentation', folderName, fileName],
    callout,
    componentPreviewType: component,
    externalLinks,
    sections,
    markdown: content,
  };
}

/**
 * Groups and sorts a list of topics by folder name.
 */
export function groupTopicsByFolder(topics: DocTopic[]): DocFolderGroup[] {
  const folderMap = new Map<string, DocTopic[]>();
  for (const topic of topics) {
    const list = folderMap.get(topic.folder) || [];
    list.push(topic);
    folderMap.set(topic.folder, list);
  }

  return Array.from(folderMap.entries())
    .sort(([folderA], [folderB]) => folderA.localeCompare(folderB))
    .map(([folder, groupTopics]) => ({
      folder,
      topics: groupTopics,
    }));
}

/**
 * Sorts doc topics primarily by order, then alphabetically by fileName.
 */
export function sortDocTopics(topics: DocTopic[]): DocTopic[] {
  return topics.sort((a, b) => a.order - b.order || a.fileName.localeCompare(b.fileName));
}

/**
 * Dynamically loads and groups all markdown files in the docs/ directory.
 */
export function loadDocTopics(): {
  topics: DocTopic[];
  folderGroups: DocFolderGroup[];
} {
  const rawDocs = import.meta.glob<{ default?: string } | string>(
    '../../../docs/**/*.md',
    { query: '?raw', eager: true }
  );

  const topics: DocTopic[] = [];

  for (const [path, moduleContent] of Object.entries(rawDocs)) {
    const rawString = extractRawContent(moduleContent);
    topics.push(parseDocItem(path, rawString));
  }

  sortDocTopics(topics);

  const folderGroups = groupTopicsByFolder(topics);

  return { topics, folderGroups };
}
