
export interface SystemConfig {
  wslEnabled: boolean;
  packageManager: 'scoop' | 'winget' | 'choco' | 'none';
  customProjectPath: string;
  defaultShell: 'pwsh' | 'powershell' | 'cmd';
  includePathRules: boolean;
  includeCommandRules: boolean;
  includeWSLRules: boolean;
  refineLogging: boolean;
}

export interface GeneratedRule {
  category: string;
  rule: string;
  commandSnippet?: string;
  importance?: 'high' | 'medium' | 'low';
}

export interface RuleSet {
  title: string;
  description: string;
  rules: GeneratedRule[];
  logTemplate: string;
}
