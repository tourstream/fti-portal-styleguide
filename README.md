[![npm version][npm-version-image]][npm-version-url]
[![npm downloads][npm-downloads-image]][npm-downloads-url]
[![Build Status][travis-image]][travis-url]
[![Demo][demo-image]][demo-url]
[![License][license-image]][license-url]

[![Heroku production][heroku-production-image]][heroku-production-url]
[![Heroku staging][heroku-staging-image]][heroku-staging-url]
***

# FTI Portal Styleguide

> Styleguide based on Pattern Lab grunt for FTI portal

This [demo page][demo-url] will show all implementated parts of the latest version (master branch) of this package.

## Usage

There are different ways to use this package ...


### link the source - CDN at Google Cloud Storage (GCS)

You can put the following snippet into the head of your HTML document ...

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


## Demo pages

We use multiple systems for different states of the code.

So, if you would like to see the result of an unmerged pull request just use the following pattern ...

heroku pattern: `https://fti-portal-styleguide-st-pr-[PULL_REQUEST_NUMBER].herokuapp.com/`

figure out the number of open pull request at github ... example #22 ...

 `https://fti-portal-styleguide-st-pr-22.herokuapp.com/` ... that's it
 
## Pattern States

1. ![#FF4136](https://placehold.it/15/ff4136/000000?text=+) `inprogress:` Element is in in progress on the developer side.
2. ![#ffcc00](https://placehold.it/15/ffccoo/000000?text=+) `inreview:` Element is in review on the developer side.
3. ![#cc33ff](https://placehold.it/15/cc33ff/000000?text=+) `usable:` Element is complete and usable, but element on Invision is not set as complete.
4. ![#2ECC40](https://placehold.it/15/2ecc40/000000?text=+) `complete:` Element is set as complete in styleguide and in Invision.

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
