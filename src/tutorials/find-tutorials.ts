import {join} from 'path';
import {readFileSync} from 'fs';
import fileExists from 'node-file-exists';
import {isTutorial} from './is-tutorial';
// import {canUpdateTutorial} from './update';

export default function findTutorials(
  dir: string, deps: Object
): Tutorial.Info[] {
  if (!!deps && Object.keys(deps).length > 0) {
    return (Object.keys(deps)

      // map over possible tutorials
      // filter to only packages with a coderoad.json file
      .filter((name: string) => isTutorial(dir, name))
      .map(function(name: string) {
        const pathToTutorialPackageJson = join(
          dir, 'node_modules', name, 'package.json'
        );
        // no package.json
        if (!fileExists(pathToTutorialPackageJson)) {
          console.log(
            `Error with ${name}: no package.json file found.`
          );
          return {
            name,
            version: 'NOT INSTALLED'
          };
        }

        let tutorialPackageJson = JSON.parse(
          readFileSync(pathToTutorialPackageJson, 'utf8')
        );
        const version = tutorialPackageJson.version;

        return {
          name,
          version,
          latest: false // !!canUpdateTutorial(name, version)
        };
      }));
  } else {
    return [];
  }
}
