export interface Rule {
  id: string;
  name: string;
  severity: "error" | "warning";
  check: (line: string, index: number, lines: string[]) => {
    token: string;
    detail: string;
    fix: string;
  } | null;
}

export interface IssueResult {
  file: string;
  line: number;
  ruleId: string;
  name: string;
  severity: "error" | "warning";
  token: string;
  detail: string;
  fix: string;
  snippet: string;
}

export interface Config {
  ignoreRules?: string[];
  ignorePaths?: string[];
}

export declare const RULES: Rule[];
export declare function loadConfig(cwd?: string): Config;
export declare function scanFile(filePath: string, config?: Config): IssueResult[];
export declare function scanDirectory(dirPath: string, config?: Config): IssueResult[];
