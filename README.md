# Reach Creative - Take-Home Challenge

## The Challenge

Please DOWNLOAD this repository to begin. At the end of your challenge, send your files to alan@reachcreative.com and nana@reachcreative.com, either by zip, github, dropbox, or whatever is easiest for you.

Included here are a set of tools to get you started. Please use the link to the zeplin project we provided as your design guide.  It includes designs for both mobile and desktop views.  

You may use the web interface or the zeplin desktop app (https://support.zeplin.io/quick-start/downloading-mac-and-windows-apps).  There is no difference between the two.  Zeplin files also includes notes (little yellow dots) on interactivity (i.e. what is a link or button, etc).  If you would like a quick primer on Zeplin and its use, the 3 minute explanation here should help: https://youtu.be/x1RPNx8Jsp4

## A Few Guidelines

- Feel free to use whatever third-party libraries or plugins you see fit
- We'll be looking for quality over quantity so dont worry if you get to all sections
- The main two things we'll be looking for are that the pieces you completed look like the designs and that its responsive for mobile
- When you send your completed challenge please include any caveats or notes about anything that gave you trouble or that you weren't sure about.  We will take that into consideration.


## The Tools

Tools included in this project:
- gulp.js
- SASS Preprocessor
- Hot reloading
- JS uglification
- CSS autoprefixer
- Image Minification

### Getting Started

1. Install Gulp globally by running `npm install gulp-cli -g`

2. Install SASS globally by running `npm install -g sass`

3. Install the project dependancies by running `npm install`.  This project uses Gulp as its task runner.  Reach doesn't use Gulp much these days for production projects, but it a great simple tool when creating simple html and css.

### Developing

1. Run `gulp watch` to begin the build process.  A browser should automatically open running the files locally at http://localhost:3000.  Keep this process running and the site will automatically hot-reload as you work.

2. Write your new HTML in `src/templates/index.html`.

3. Write you new CSS or SASS in `src/scss/_partials/main.scss`.  There are css base-styles written in the `src/scss/modules/` directory.  Feel free to overwrite anything in there you see fit.

4. Write any JS in `src/js/scripts.js`.

5. Images and any other static assets should be placed in `/app/assets/`. Included in that directory is the images for the gallery at the top of the page.  Please get all other assets from Zeplin.

6.  The directory `/app/assets/fonts/` includes one of the fonts you'll need for the project.  The other is a google font.

### Building

When you want to create a build for the project, simply run `gulp`, and the processed files will be written to `/app`
