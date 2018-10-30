[![npm version][npm-version-image]][npm-version-url]
[![npm downloads][npm-downloads-image]][npm-downloads-url]
[![Build Status][travis-image]][travis-url]
[![Demo][demo-image]][demo-url]
[![License][license-image]][license-url]

[![Heroku production][heroku-production-image]][heroku-production-url]
[![Heroku staging][heroku-staging-image]][heroku-staging-url]
***

# FTI Portal Styleguide

> Styleguide based on Pattern Lab for FTI portal and Quicksearch

This [demo page][demo-url] will show all implementated parts of the latest version (master branch) of this package.

It creates CSS files, style.css, which will be implemented into our portals via NPM dependencies.

## Dependents

If you have a project that relies on this styleguide, please add it here.
- FTI Portal
- Quicksearch

## Usage

There are different ways to use this package:


### Link the source - CDN at Google Cloud Storage (GCS)

You can put the following snippet into the head of your HTML document

Use the version (Semver) for production, to have more control.
```sh
<link rel="stylesheet" href="https://assets.gcloud.fti-group.com/fti-portal-styleguide/<VERSION>/css/style.css">
```
Use "latest" for internal test purposes.
```sh
<link rel="stylesheet" href="https://assets.gcloud.fti-group.com/fti-portal-styleguide/latest/css/style.css">
```

### npm package

If you want to use the npm package just install with [npm](https://www.npmjs.com/)

```sh
$ npm install @tourstream/fti-portal-styleguide --save
```

or with [yarn](https://yarnpkg.com/lang/en/)

```sh
$ yarn add @tourstream/fti-portal-styleguide
```

After this step you can use the sources as you like. They can be found in `./node_modules/@tourstream/fti-portal-styleguide/source`

## Development

[Pattern Lab](https://patternlab.io/) is based on [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/). Start with atoms and work your way up to templates and pages.
The SCSS files are component based.
Use mixins to avoid dublicated code and keep the styles on the components for high readability.
Component's own mixins come at the top of each component's file.
Use "dev-" as prefix for your templates name, that are not used in portals.
We code [mobile-first](https://zellwk.com/blog/how-to-write-mobile-first-css/).

Use `npm run serve` to run Pattern Lab locally. It will also watch.
Use `npm run build` to build and render Pattern Lab and CSS files. You can find the files styles.css and styles.min.css  at `./dist-master/fti-portal-styleguide/latest/css`.
Take that to test the styles inside your portal locally by replacing the old styles.

Use `npm run lint` to test your code styling.

### Changelog
[Changelog](https://github.com/tourstream/fti-portal-styleguide/blob/master/CHANGELOG.md)

### Deployment
#### Staging
For feature branch deployment use Bamboo (Plan: FTI Styleguide / Styleguide).
A branch is available on Bamboo after the branch is created on Github.
`https://assets.gcloud.fti-group.com/fti-portal-styleguide/staging/<BRANCH-NAME>/index.html`

#### Production
After merge to master on master run `npm version <major|minor|patch>`.
It requires ssh connection to Github. It will deploy to NPM and GCS using our Travis configuration.

### Usage on your portal
Setup a build with Semver versioning to have control over your styles.

### Styling Pattern Lab
Use `./source/css/pattern-scaffolding.css` to customize Pattern Lab.

## Pattern States

1. ![#FF4136](https://placehold.it/15/ff4136/000000?text=+) `inprogress:` Element is in in progress on the developer side.
2. ![#ffcc00](https://placehold.it/15/ffccoo/000000?text=+) `inreview:` Element is in review on the developer side.
3. ![#cc33ff](https://placehold.it/15/cc33ff/000000?text=+) `usable:` Element is complete and usable, but element on Invision is not set as complete.
4. ![#2ECC40](https://placehold.it/15/2ecc40/000000?text=+) `complete:` Element is set as complete in styleguide and in Invision.

## About the Structure
Visit [Confluence](https://confluence.fti-group.com/display/PORTALS/Styleguide?src=contextnavpagetreemode) to read more about the technical details of the styleguide.

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

[heroku-production-image]: https://img.shields.io/badge/Heroku-production-79589F.svg?style=flat-square
[heroku-production-url]: https://fti-portal-styleguide.herokuapp.com/
[heroku-staging-image]: https://img.shields.io/badge/Heroku-staging-79589F.svg?style=flat-square
[heroku-staging-url]: https://fti-portal-styleguide-staging.herokuapp.com/
