# fti-portal-styleguide Change Log

All notable changes to this project will be documented in this file.

## 0.15.0

- FTI customized Bootstrap imports are now fully integrated. You can remove fti-bootstrap from your project.
- Cleaning: Double imports are removed.
    - Removed bootstrap-helper.scss, bootstrap-grid and bootstrap-reboot.scss since they are available via fti-bootstrap/bootstrap.scss
- Imports are managed by style.scss and Bootstrap related imports are managed by fti-bootstrap/bootstrap.scss.
- You can now use fti-bootstrap/customized-variables to define your values, which you need together with Bootstrap. Instead of the default value of Bootstrap, the customized value will be taken.
- Cleaning: Renamed "base" folder to "typography" folder.
- Cleaning: Removed some styles, which were commented out and therefore not used.
- Readme.md is now much more clear about this project and how to use the project.
