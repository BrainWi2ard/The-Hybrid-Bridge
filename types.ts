
export interface SystemConfig {
  wslEnabled: boolean;
  packageManager: 'scoop' | 'winget' | 'choco' | 'none';
  customProjectPath: string;
  defaultShell: 'pwsh' | 'powershell' | 'cmd';
}

export interface GeneratedRule {
  category: string;
  rule: string;
  commandSnippet?: string;
}

export interface RuleSet {
  title: string;
  description: string;
  rules: GeneratedRule[];
}
