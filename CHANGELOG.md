# fti-portal-styleguide Change Log

All notable changes to this project will be documented in this file.

## 0.29.1
- Fixes dropdown breakpoint bug in quicksearch

## 0.29.0
- Adds colorful tabs component

## 0.28.1
- Adds components for the ads

## 0.28.0
- outputs an "isolated" css file, so styles apply only to an element instead of the whole document

## 0.27.6
- Updates the value of the `$grey-100` variable to improve its visibility

## 0.27.5
- Fixes cookie alert, it saves sessions again

## 0.27.4
- Adds delay when opening sub menu on desktop
- Prevents bubbling on mouseout by using mouseleave

## 0.27.3
- Reverses transition behaviour, to avoid Quicksearch not being accessible

## 0.27.2
- Fixes unscrollable background on Safari on iOS
- Adds transition delay for opening submenus on desktop
- Adds bold highlight on menu on mobile and tablet view

## 0.27.1
- updates navigation, making it more resilient against hick ups when opening and closing it

## 0.27.0
- Adds second level navigation
- Adds JS file for global variables

## 0.26.2
- Adds a scss variable for the select component's z-index 

## 0.26.1
- fixes clickable area for select component

## 0.26.0
- fixes margin for the icon on the select component

## 0.25.0
- Adds a new organism: Link List with Single Title
- Updated Link List 25 for Pattern Lab
- Updates structure of atoms and molecules related to Link Lists
- Improved CSS for Link List 25 for when editors add less than 4 columns to the page
- Added specific JSON data for Link Lists

## 0.24.0
- Adds select component

## 0.23.0
- removes unused icons from pattern lab
- changes gz extension on css, so that it can be used with gcloud bucket

## 0.22.5
- fixes backgground image size for iOS 10

## 0.22.4
- Resizes the Logo to 80x80 in LG Viewport

## 0.22.3
- Changes tag component

## 0.22.2
- Deletes some spaces when using parameters to avoid Errors when running the styleguide
- 0.22.1 skipped because of problems between npm and git. 0.22.1 can't be used anymore. 

## 0.22.0
- Adds background image for quicksearch

## 0.21.0
- makes the whole teaser clickable
- Adds close button component
- Adds tag component

## 0.20.1
- fixes overlapping navigation with quick search

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
