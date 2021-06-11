# Tartufo, Managed By npm!

[Tartufo](https://tartufo.readthedocs.io/en/stable/) is an open-source project provides tooling to look for and find secrets that may or may not have been accidentally committed to code. It provides a wonderful pre-commit mode that is perfect for keeping repositories clean of committed secrets.

This package exists to help orchestrate making sure Tartufo is available for use by local developers working in pure-javascript projects. When installed into your projects, it will provide a local you can use in your `package.json` scripts.

This package _prefers_ to use a globally-installed tartufo _if present_, otherwise it will install a local copy.

## Prerequisites

This package requires that Python 3.6+ be installed and available. It expects to find python either at the command `python3` or `python` if the former is not available.

**This package does not currently support Windows!**

### Installing Python on a Mac

We recommend using [Homebrew](https://brew.sh) to install Python via `brew install python`.

### Installing Python on Linux

Please follow your distro's recommendations for installing Python.

### Installing Python on Windows

_Windows is not yet supported with this package. This documentation will be udpated when it is supported._

## Installing

Run `npm install --save-dev tartufo-node` to install in your local project

## Example usage

You can use `tartufo` like any other npm-provided bin, for example to use tartufo as a pre-commit you could combine it with [Husky](https://github.com/typicode/husky#readme):

```json
{
  "scripts": {
    "tartufo:pre-commit": "tartufo pre-commit"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run tartufo:pre-commit"
    }
  }
}
```

Alternatively you could work with tartufo directly via npx, for example you could run `npx tartufo --help` in your project to see command line tools available to you.

## Troubleshooting

This package provides a `tartufo-helper` tool to help diagnose issues locally. To do so, run `npx tartufo-helper doctor` to see debugging output. If necessary, it may recommend you run `npx tartufo-helper reset` to reset your local installation.

## How it works

This package takes advantage of `preinstall` and `postinstall` npm lifecycle hooks. When installing into your package, two things will happen:

First, the `preinstall` script will validate your local environment and fail if it cannot find Python 3.6+.

Second `postinstall` script will check if you have `tartufo` available globally. If so, the `postinstall` script will exit as there is nothing to do!

However if no `tartufo` is available, it will create a [venv](https://docs.python.org/3/library/venv.html) locally (in the `node_modules` folder) and use pip to install tartufo.
