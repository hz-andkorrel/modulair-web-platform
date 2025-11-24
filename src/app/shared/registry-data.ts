import { signal } from '@angular/core';

export interface Plugin {
  id: string;
  name: string;
  version: string;
  size: string;
  lastUpdated: string;
  category: string;
  description: string;
  tags: string[];
}

export const plugins = signal<Plugin[]>([
  {
    id: 'key-plugin',
    name: 'Room Key',
    version: '2.1.0',
    size: '4.2 MB',
    lastUpdated: '2025-11-23',
    category: 'Smart Access Control',
    description: 'Manage and switch between different themes',
    tags: ['themes', 'ui', 'customization'],
  },
  {
    id: 'mews-plugin',
    name: 'Mews Plugin',
    version: '1.8.3',
    size: '2.1 MB',
    lastUpdated: '2024-09-10',
    category: 'Smart Access Control',
    description: 'Mews is a cloud-based property management system (PMS) used mainly in hotels',
    tags: ['smart access control'],
  },
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    version: '3.0.1',
    size: '1.5 MB',
    lastUpdated: '2024-09-05',
    category: 'Development',
    description: 'Auto-format code in multiple languages',
    tags: ['formatting', 'code-quality', 'development'],
  },
  {
    id: 'file-manager',
    name: 'Advanced File Manager',
    version: '1.4.2',
    size: '3.8 MB',
    lastUpdated: '2024-08-28',
    category: 'Productivity',
    description: 'Enhanced file browsing and management features',
    tags: ['files', 'productivity', 'navigation'],
  },
  {
    id: 'terminal-plus',
    name: 'Terminal Plus',
    version: '2.5.0',
    size: '5.1 MB',
    lastUpdated: '2024-08-20',
    category: 'Development',
    description: 'Advanced terminal with additional features',
    tags: ['terminal', 'cli', 'development'],
  },
]);

export const categories = signal<string[]>([...new Set(plugins().map((p) => p.category))]);
