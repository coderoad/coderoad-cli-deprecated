const pJKeys: PJKeys[] = [{
  name: 'name',
  validate: name => name.match(/^coderoad-[A-Za-z0-9\-]+$/),
  msg: 'must be kebabcased and start with "coderoad"',
  example: 'coderoad-tutorial-name',
}, {
    name: 'version',
    validate: version => version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/),
    msg: 'must be 3 numbers separated by dots',
    example: '0.1.0',
  }, {
    name: 'main',
    validate: main => main === 'coderoad.json',
    msg: 'must point to coderoad.json',
    example: 'coderoad.json',
  }, {
    name: 'description',
    validate: desc => typeof desc === 'string' && desc.length > 3,
    msg: 'must be long enough to describe a package',
    example: 'CodeRoad tutorial on ES2015 new features.'
  }, {
    name: 'keywords',
    validate: keywords => Array.isArray(keywords) && keywords.length && keywords.includes('coderoad'),
    msg: 'must be an array containing "coderoad"',
    example: '["coderoad", "tutorial", "js"]',
  }, {
    name: 'author',
    validate: author => typeof author === 'string' && author.length > 2,
    msg: 'must have an author name and optional email',
    example: 'Shawn McKay <me@email.com> (http://blog)',
  }, {
    name: 'config',
    validate: config => typeof config === 'object',
    msg: 'must be an object',
    example: '"config": {"language": "JS", "runner": "mocha-coderoad"}',
  }, {
    name: 'files',
    validate: files => Array.isArray(files) && files.includes('coderoad.json') && files.includes('tutorial'),
    msg: 'must be an array including "coderoad.json" & "tutorial"',
    example: '["coderoad.json", "tutorial"]',
  }, {
    name: 'engines',
    validate: engines => typeof engines === 'object' && engines.node && engines.node.match(/^[>=]?[0-9]+/),
    msg: 'must specify a valid node version',
    example: '"engines": { "node": ">=0.10.3"}',
  }, {
    name: 'language',
    config: true,
    validate: lang => typeof lang === 'string' && lang.length,
    msg: 'must specify a programming language',
    example: 'JS',
  }, {
    name: 'runner',
    config: true,
    validate: runner => typeof runner === 'string' && runner.length,
    msg: 'must specify a test runner',
    example: 'mocha-coderoad',
  }, {
    name: 'repository',
    optional: true,
    validate: (repo: string | { type: string, url: string }) => {
      return typeof repo === 'string' && repo.length ||
        typeof repo === 'object' && repo.hasOwnProperty('type')
        && typeof repo.type === 'string' &&
        repo.hasOwnProperty('url') && typeof repo.url === 'string';
    },
    msg: 'should have a valid repository',
    example: 'https://github.com/shmck/coderoad-tutorial-name',
  }, {
    name: 'bugs',
    optional: true,
    validate: (bugs: { url: string }) => typeof bugs === 'object' &&
      bugs.hasOwnProperty('url') && typeof bugs.url === 'string',
    msg: 'should have a link to where to post bugs',
    example: '"bugs": { "url": "https://github.com/shmck/coderoad-tutorial-name" }'
  }, {
    name: 'license',
    optional: true,
    validate: license => typeof license === 'string' && license.length,
    msg: 'should have a valid license (ex: MIT, ISC, etc.)',
    example: 'MIT',
  }];

interface PJErrors {
  msg: string;
  example: string;
}

interface PJKeys extends PJErrors {
  name: string;
  validate: (content: string) => boolean;
  config?: boolean;
  optional?: boolean;
}

interface ValidatePjOutput {
  errors: PJErrors[];
  warnings: PJErrors[];
}

export default function validatePackageJson(pj: PackageJson): ValidatePjOutput {
  const errors = [];
  const warnings = [];
  pJKeys.forEach(key => {
    // key on pj or pj.config
    const target = pj.config ? pj.config : pj;
    // key doesn't exist or key is invalid
    if (!target.hasOwnProperty(key.name) || key.validate(target[key.name])) {
      if (!key.optional) {
        errors.push({ msg: key.msg, example: key.example });
      } else {
        warnings.push({ msg: key.msg, example: key.example });
      }
    }
  });
  return {
    errors,
    warnings,
  };
}
