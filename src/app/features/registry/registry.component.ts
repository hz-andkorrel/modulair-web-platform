import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

interface Plugin {
  id: string;
  name: string;
  version: string;
  size: string;
  lastUpdated: string;
  category: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-registry',
  imports: [
    CommonModule, 
    FormsModule,
    MatListModule, 
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistryComponent {
  searchTerm = signal('');
  selectedTags = signal<string[]>([]);

  plugins = signal<Plugin[]>([
    {
      id: 'theme-manager',
      name: 'Theme Manager',
      version: '2.1.0',
      size: '4.2 MB',
      lastUpdated: '2024-09-15',
      category: 'Customization',
      description: 'Manage and switch between different themes',
      tags: ['themes', 'ui', 'customization']
    },
    {
      id: 'git-helper',
      name: 'Git Helper',
      version: '1.8.3',
      size: '2.1 MB',
      lastUpdated: '2024-09-10',
      category: 'Development',
      description: 'Enhanced Git integration and workflow tools',
      tags: ['git', 'version-control', 'development']
    },
    {
      id: 'code-formatter',
      name: 'Code Formatter',
      version: '3.0.1',
      size: '1.5 MB',
      lastUpdated: '2024-09-05',
      category: 'Development',
      description: 'Auto-format code in multiple languages',
      tags: ['formatting', 'code-quality', 'development']
    },
    {
      id: 'file-manager',
      name: 'Advanced File Manager',
      version: '1.4.2',
      size: '3.8 MB',
      lastUpdated: '2024-08-28',
      category: 'Productivity',
      description: 'Enhanced file browsing and management features',
      tags: ['files', 'productivity', 'navigation']
    },
    {
      id: 'terminal-plus',
      name: 'Terminal Plus',
      version: '2.5.0',
      size: '5.1 MB',
      lastUpdated: '2024-08-20',
      category: 'Development',
      description: 'Advanced terminal with additional features',
      tags: ['terminal', 'cli', 'development']
    }
  ]);

  availableFilterTags = signal(['Development', 'Productivity', 'Customization']);

  filteredPlugins = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const selectedCategories = this.selectedTags();
    return this.plugins().filter(plugin => {
      const matchesSearch = !term || 
        plugin.name.toLowerCase().includes(term) ||
        plugin.category.toLowerCase().includes(term) ||
        plugin.description.toLowerCase().includes(term) ||
        plugin.tags.some(tag => tag.toLowerCase().includes(term));
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(plugin.category);
      return matchesSearch && matchesCategory;
    });
  });

  searchSuggestions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (term.length < 2) return [];

    const suggestions = new Set<string>();

    this.plugins().forEach(plugin => {
      if (plugin.name.toLowerCase().includes(term)) {
        suggestions.add(plugin.name);
      }
      if (plugin.category.toLowerCase().includes(term)) {
        suggestions.add(plugin.category);
      }
    });

    const templates = [
      'Development tools',
      'Productivity plugins',
      'Customization options',
      'Latest updates',
      'Popular plugins'
    ];

    templates.forEach(template => {
      if (template.toLowerCase().includes(term)) {
        suggestions.add(template);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSuggestionSelected(suggestion: string) {
    this.searchTerm.set(suggestion);
  }

  toggleTag(tag: string): void {
    const currentTags = this.selectedTags();
    if (currentTags.includes(tag)) {
      this.selectedTags.set(currentTags.filter(t => t !== tag));
    } else {
      this.selectedTags.set([...currentTags, tag]);
    }
  }

  onPluginUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // For now, just log the file. You can add logic to process or store the plugin file.
      console.log('Plugin file uploaded:', file);
      // TODO: Add logic to parse and add plugin to registry
    }
  }
}