# CodeRoad CLI
Command line interface for [CodeRoad](http://coderoad.github.io).

## Setup

```
> npm install -g coderoad-cli
```

## Tutorial Development

##### Development

* In your development directory, run `> coderoad create $NAME$`
* Run `> npm link` to create a symbolic link to your project
* Update changes to your tutorial by running `> coderoad build`

##### Viewing/Testing your Tutorial

* Open a new directory and run `> npm init`
* Add your package name to the `dependencies` in `package.json`:

```
"dependencies": {
    "coderoad-$NAME$": "^0.1.0"
  }
```

* Run `> npm link coderoad-$NAME$` & `> npm install`. This will install a package link pointing at your development tutorial.
* Open [atom-coderoad](https://github.com/coderoad/atom-coderoad) to view your tutorial. Your package should appear as a loaded package.


## Commands
- create [name]
- build [tutorial.md]
- publish [version]   _currently instructions only_
- tutorials           _coming soon_
- search [query]      _currently instructions only_
- docs
- help

### Create

"create" gets you started building your tutorial.

```
> coderoad create $my-tutorial-name$
```

"create" generates:

* a `package.json` configuration with the following settings:

```
  "name": "coderoad-$TUTORIAL-NAME$",
  "main": "coderoad.json",
  "keywords": ["coderoad", "tutorial"],
  "coderoad": {
      "testDir": "test",
      "testSuffix": ".spec.js"
    }
```

* an example `tutorial.md` file & tutorial directory
* an example `test` directory with a few example tests

Feel free to fill out the "author" or "authors" field, and add any additional
project related keywords.

### Build

"build" compiles your markdown tutorial into a data file called `coderoad.json`.

"build" defaults to `tutorial/tutorial.md`. Optionally specify the path to your tutorial markdown file.

```
> coderoad build
> coderoad build $path/to/tutorial.md$
```

"build" also generates a `README.md` with an outline of your chapters & pages
as well as an explanation of how to setup your tutorial.
