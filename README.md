[![npm version][npm-version-image]][npm-version-url]
[![npm downloads][npm-downloads-image]][npm-downloads-url]
[![Build Status][travis-image]][travis-url]
[![Demo][demo-image]][demo-url]
[![License][license-image]][license-url]
***

# FTI Portal Styleguide

> Styleguide based on Pattern Lab for FTI portal

This [demo page][demo-url] will show all implemented parts of the latest version (master branch) of this package.
It creates asset files, **style.css** and **bundle.js**, which will be implemented into our portals.

## Usage

There are different ways to use the Styleguide:

### Link the source - CDN at Google Cloud Storage (GCS)

You can put the following snippet into the head of your HTML document. Use the version (Semver) for production, to have more control.
```sh
<link rel="stylesheet" href="https://assets.gcloud.fti-group.com/fti-portal-styleguide/<VERSION>/css/style.css">
```

Use "latest" for internal test purposes.
```sh
<link rel="stylesheet" href="https://assets.gcloud.fti-group.com/fti-portal-styleguide/latest/css/style.css">
```
Note: Some portals use an individual way to implement the Styleguide. Read their instructions.

### Or NPM:

```sh
$ npm install @tourstream/fti-portal-styleguide --save
```

----------

## Install
It requires Node 10 or higher.

```
npm install
```

----------

## Development

[Pattern Lab](https://patternlab.io/) is based on [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/). Start with atoms and work your way up to templates and pages.
The SCSS files are component based.
Use mixins, functions and placeholders to avoid duplicated code and keep the styles on the components for high readability.
Component's own mixins come at the top of each component's file.
We code [mobile-first](https://zellwk.com/blog/how-to-write-mobile-first-css/).

We handle our Javascript files component based, which will be automatically bundled in one exported bundle file.

## Serve and Watch

```
npm run serve
```

## Build 
```
npm run build
```
You can find the files styles.css and styles.min.css  at `./dist-master/fti-portal-styleguide/latest/css`.
Take that to test the styles inside your portal locally by replacing the old styles.

## CSS Lint (Test)
```
npm run lint
```

## Debug mode
The Styleguide turns on debug mode per default using a cookie.
You can turn on debug mode on your portal by creating a cookie manually with debug=1 or by adding ?debug=1 to your url parameters.
Follow the instructions inside the error handling.

## Changelog
[Changelog](https://github.com/tourstream/fti-portal-styleguide/blob/master/CHANGELOG.md)

----------

## Deployment
### Staging
For feature branch deployment use Bamboo (Plan: FTI Styleguide / Styleguide).
A branch is available on Bamboo after the branch is created on Github.
`https://assets.gcloud.fti-group.com/fti-portal-styleguide/staging/<BRANCH-NAME>/index.html`

### Production
After merge to master on master run 

```
npm version <major|minor|patch|specific Semver version>
```

It requires ssh connection to Github. It will deploy to NPM and GCS using our Travis configuration.

### Usage on your portal
Setup a build with Semver versioning to have control over your styles.

### Styling Pattern Lab
Use `./source/css/pattern-scaffolding.css` to customize Pattern Lab.

----------

## Pattern States

1. ![#FF4136](https://placehold.it/15/ff4136/000000?text=+) `inprogress:` Element is in in progress on the developer side.
2. ![#ffcc00](https://placehold.it/15/ffccoo/000000?text=+) `inreview:` Element is in review on the developer side.
3. ![#cc33ff](https://placehold.it/15/cc33ff/000000?text=+) `undefined:` Element is complete and usable, but element on Invision is not defined or isn't set as complete.
4. ![#2ECC40](https://placehold.it/15/2ecc40/000000?text=+) `complete:` Element is set as complete in styleguide and in Invision.

----------

## Structure and Documentation

[SassDoc Documentation](http://sassdoc.com/annotations/) 

- Document your contribution
- use media queries inside the classes, to increase documentation and readability 

```
npm run docs
```
Look up the ./docs/ pages.

Debrecated: Visit [Confluence](https://confluence.fti-group.com/display/PORTALS/Styleguide?src=contextnavpagetreemode) to read more about the technical details of the styleguide.

***

[npm-version-image]: https://img.shields.io/npm/v/%40tourstream%2Ffti-portal-styleguide.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/@tourstream/fti-portal-styleguide
[npm-downloads-image]: https://img.shields.io/npm/dm/%40tourstream%2Ffti-portal-styleguide.svg?style=flat-square
[npm-downloads-url]: https://www.npmjs.com/package/@tourstream/fti-portal-styleguide

[travis-image]: https://img.shields.io/travis/tourstream/fti-portal-styleguide.svg?style=flat-square
[travis-url]: https://travis-ci.org/tourstream/fti-portal-styleguide

[demo-image]: https://img.shields.io/badge/Demo-latest-%230099cc.svg?style=flat-square
[demo-url]: https://assets.gcloud.fti-group.com/fti-portal-styleguide/latest/index.html

[license-image]: https://img.shields.io/github/license/tourstream/fti-portal-styleguide.svg?style=flat-square
[license-url]: https://github.com/tourstream/fti-portal-styleguide/blob/master/LICENSE
