# Tartufo, Managed By npm!

> ⚠️ **DEPRECATED**: This package is no longer maintained and has been deprecated. Please use an alternative solution or contact the maintainers for more information.

[Tartufo](https://tartufo.readthedocs.io/en/stable/) is an open-source project that provides tooling to look for and find secrets that may or may not have been accidentally committed to code. It provides a wonderful pre-commit mode that is perfect for keeping repositories clean of committed secrets.

**This package** exists to help orchestrate ensuring Tartufo is available for use by local developers working in pure-javascript projects. When installed into your projects, it provides a handy shim that you can use in `package.json` scripts without having to instruct developers to perform extra installation steps!

This package _prefers_ to use a globally-installed Tartufo _if present_, otherwise it will install a local copy.

## Prerequisites

This package requires that Python 3.6+ be installed and available. It expects to find python either at the command `python3` or `python` if the former is not available.

### Installing Python on a Mac

We recommend using [Homebrew](https://brew.sh) to install Python via `brew install python`.

### Installing Python on Linux

Please follow your distro's recommendations for installing Python.

### Installing Python on Windows

> **Note**
> We recommend using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). If you do so, please ignore this section and instead follow any Linux instructions.

Microsoft's ["Get started using Python on Windows for beginners"](https://learn.microsoft.com/en-us/windows/python/beginners#install-python) provides tips on how to install Python.

## Installing

Run `npm install --save-dev @godaddy/tartufo-node` to install in your local project

## Example usage

You can use `tartufo` like any other npm-provided bin, for example to use tartufo as a pre-commit you could combine it with [Husky](https://github.com/typicode/husky#readme):

Add the following to your `package.json`:

```json
{
  "scripts": {
    "tartufo:pre-commit": "tartufo pre-commit"
  }
}
```

Then tell Husky to run the command on pre-commit:

```bash
npx husky add .husky/pre-commit "npm run tartufo:pre-commit"
git add .husky/pre-commit
```

Alternatively you could work with tartufo directly via npx, for example you could run `npx tartufo --help` in your project to see command line tools available to you.

### Specifying a Tartufo version

You may specify a Tartufo version using [Python version specifiers](https://peps.python.org/pep-0440/#version-specifiers). For example, if you want to install and use only Tartufo 3.x you can add the following to your `package.json`:

```json
{
  "tartufo-node": {
    "version": ">= 3.3.1, < 4.0.0"
  }
}
```

The `pip install` command will run _every_ postinstall cycle so you can rest assured that the local version will always remain up to date.

Please note that the _global_ tartufo (the one available on your system) will always take precedence and the version config above will be ignored in those cases.

## Troubleshooting

This package provides a `tartufo-helper` tool to help diagnose issues locally. To do so, run `npx tartufo-helper doctor` to see debugging output. If necessary, it may recommend you run `npx tartufo-helper reset` to reset your local installation.

## How it works

This package takes advantage of `preinstall` and `postinstall` npm lifecycle hooks. When installing into your package, two things will happen:

First, the `preinstall` script will validate your local environment and fail if it cannot find Python 3.6+.

Second `postinstall` script will check if you have `tartufo` available globally. If so, the `postinstall` script will exit as there is nothing to do!

However if no `tartufo` is available, it will create a [venv](https://docs.python.org/3/library/venv.html) locally (in the `node_modules` folder) and use pip to install tartufo.
