declare module 'core-coderoad/lib/alert' {
  export function reducer(open: boolean, action: Action): boolean;
  export function alertOpen(alert: Object);
  export function alertReplay();
  export function alertClose();
}

declare module 'core-coderoad/lib/editor' {
  export function dir(name: string): string;
  export function reducer(name: string, action: Action): string;
  export function editorDevToolsToggle();
  export function editorOpen(file: string);
  export function editorInsert(content: string);
  export function editorSet(content: string);
  export function editorSave();
  export function save();
  export function open(file: string);
  export function openFolder();
  export function set(content: string);
  export function insert(content: string);
  export function openDevTools();
  export function toggleDevTools();
  export function clearConsole();
  export function openTerminal();
  export function closeAllPanels();
  export function quit();
}

declare module 'core-coderoad/lib/polyfills' {
  export default function loadPolyfills(): void;
}

declare module 'core-coderoad/lib/route' {
  export function reducer(route: string, action: Action): string;
  export function routeSet(route: string);
}

declare module 'core-coderoad/lib/setup' {
  export function checks(checks: CR.Checks, action: Action): CR.Checks;
  export function packageJson(pj: PackageJson, action: Action): PackageJson;
  export function setupVerify();
  export function setupPackage();
}

declare module 'core-coderoad/lib/tutorial' {
  export function reducer(tutorial: CR.Tutorial, action: Action): CR.Tutorial;
  export function tutorialSet(name: string);
}

declare module 'core-coderoad/lib/tutorials' {
  export function reducer(tutorials: Tutorial.Info[], action: Action): Tutorial.Info[];
  export function tutorialsFind();
  export function tutorialUpdate(name: string);
}

declare module 'core-coderoad/lib/window' {
  export function windowToggle();
  export function reducer(open: boolean, action: Action): boolean;
}
