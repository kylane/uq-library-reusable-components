# UQ Library Reusable Web Components
### Current contents
- UQ Header (28 Feb 2021) - [ITS DS](https://design-system.uq.edu.au/?path=/docs/components-header--header)
- UQ Footer (28 Feb 2021) - [ITS DS](https://design-system.uq.edu.au/?path=/docs/components-footer--footer)

### Development
- run `npm ci` to install packages.
- run `npm run start` to run the project locally while developing with a listener
  - While this is running, you can run `cypress open` to manually run cypress tests
- run `npm run build` to run a test build in the `dist` folder
- run `npm run test` to run a test build in the `dist` folder and run all cypress tests

### Use

Add the following line at the end of your HTML document to initialise the components.
(NOTE: This is TBA in terms of final location etc)
```html
<script type="text/javascript" src="https://library.uq.edu.au/resuable/uq-lib-resusable.min.js"></script>
```

eg. UQ Header:
```html
<uq-header
        hideLibraryMenuItem="true"
        searchLabel="google.com.au"
        searchURL="www.google.com"
></uq-header>
```


### Setting up from the ITS Design System private packages
###### _Using UQ Header package as an example_

- Follow the export procedure from [ITS Design System github](https://github.com/uq-its-ss/design-system/blob/master/packages/private-design-output/README.md).
- Copy the exported package to a new folder (eg UQHeader) - or over existing files in the case of an update.
- Create the Web Component file (eg. UQHeader.js in that folder)
  - Update the reference to the CSS in the css/*.css
- Edit the js/uqds.js file to replace any reference to `document.query...` to a shadow dom reference by replacing it with `document.querySelector('uq-header').shadowRoot.query...`
- Register the new web component in `src/index.js` and insert the dom element in `/index.html'
- Add a line to the webpack config to copy the ~usds.js file from the ITS DS package to the dist root and rename it.
```html
  new CopyPlugin({
      patterns: [
        { from: "src/UQHeader/js/uqds.js", to: "header.js" },
      ],
    }),
```
- Make sure to update the dynamic load reference in the web component file.
- Run `npm run build` to pack the file into the `dist` folder - and open index.html there in a browser to test - or - run `npm run start` to have a listening system run in your local browser.
