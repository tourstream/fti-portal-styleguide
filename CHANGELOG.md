# fti-portal-styleguide Change Log

All notable changes to this project will be documented in this file.

## 0.20.0
- Adds mobile first level navigation
- z-indexes are now collected at custom values

## 0.19.2
- Adds checkbox style

## 0.19.0
- Adds material-input classes
- Changes gray-300

## 0.18.1
- Changed header behavior
  - Navigation is cleaned up and uses flexbox
  - Header is cleanup and uses flexbox
  - Navigation is renamed to header-menu-desktop
  - Mobile Navigation is added and it's called header-menu-mobile, a menu can be added there
  - Phone icons has been updated and an info icon has been added
- A new state is added for styles and designs that shouldn't be used: "deprecated"
- Icons have been added to atoms

## 0.17.2
- FTI logo files have been updated

## 0.17.1
- Changes gray-800 and text-muted
- Fixes dropdown-toggle line-height

## 0.17.0
- Creates icons as components
- Removes dropdown arrow
- Adds an example of arrow-down and location icons

## 0.16.0
- Creates dropdown and tab-menu as components
- Adds an example of tab-menu component into patternlab
- Adds an example of dropdown component into patternlab

## 0.15.8
- aligns Teaser-Buttons on the right side

## 0.15.7
- Renames Versace template to Standard Template
- Removes unused templates

## 0.15.6
- Changes the 50%-width of images in the Text-Image-Teaser to max-width

## 0.15.5
- Changes the font- and background color of the Header Menu element.

## 0.15.4
- Changed the font color and the background color of the footer hotline element.
- Updated README.md to inform about feature branch deployment
- Changed order of link for latest and version

## 0.15.2
- Changes cookie message background and increases z-index.

## 0.15.0

- FTI customized Bootstrap imports are now fully integrated. You can remove fti-bootstrap from your project.
- Cleaning: Double imports are removed.
    - Removed bootstrap-helper.scss, bootstrap-grid and bootstrap-reboot.scss since they are available via fti-bootstrap/bootstrap.scss
- Imports are managed by style.scss and Bootstrap related imports are managed by fti-bootstrap/bootstrap.scss.
- You can now use fti-bootstrap/customized-variables to define your values, which you need together with Bootstrap. Instead of the default value of Bootstrap, the customized value will be taken.
- Cleaning: Renamed "base" folder to "typography" folder.
- Cleaning: Removed some styles, which were commented out and therefore not used.
- Readme.md is now much more clear about this project and how to use the project.
