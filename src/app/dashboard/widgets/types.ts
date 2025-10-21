export interface WidgetDef {
  id: string;        
  title: string;    
  description?: string;
}

export interface PluginDef {
  id: string;        
  name: string;     
  widgets: WidgetDef[];
}
