// import commandLine from 'atom-plugin-command-line';
//
// export function tutorialUpdate(name: string): void {
//   console.log(`run "npm install --save-dev ${name}"`);
//   // commandLine(
//   //   // 'npm', `install --save-dev ${name}`
//   // ).then((res) => {
//   //   console.log(res);
//   //   store.dispatch(tutorialsFind());
//   // });
// }
//
// export function canUpdateTutorial(
//   name: string, currentVersion: string
// ): Promise<boolean> {
//   return null;
//   // if (global.hasOwnProperty('navigator') || !global.navigator.onLine) {
//   //   return null;
//   // }
//   return (commandLine(
//     'npm', `outdated ${name}`
//   ).then(
//     (res: string) => {
//       console.log(res);
//       if (res.length > 0) {
//         // npm link enabled
//         const linked = res.match(/[0-9\.]+\s+linked/);
//         if (linked) { return false; }
//         // not latest version
//         const match = res.match(/[0-9\.]+\s+[0-9\.]+\s+([0-9\.]+)/);
//         if (match.length >= 2) {
//           // return match[1]; // string output
//           return true;
//         }
//       }
//       return null;
//     })
//   );
// }
