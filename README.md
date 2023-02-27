# Widget

## Development:

Run `npm start` and open `https://localhost:3000`.

### JS

We house the VideoMagnet in a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) (see "CSS" section below for why). The shadow DOM is largely separate from the main "light DOM", which means that some JS DOM functions (e.g. `document.getElementById()` or `document.querySelector()`) won't work for DOM elements within the shadow DOM (they'll only search elements in the light DOM).

In general, it's probably better to use React refs for stuff like this, and we shouldn't need to do much of this DOM manipulation anyway.

### CSS

We use CSS modules ~~to generate unique CSS class names so that our CSS class names don't collide with CSS from sites we embed this on~~ because we love modular CSS! To stop CSS from the host site from bleeding into the VideoMagnet, we use a shadow DOM and prevent CSS inheritance from the "light DOM" with `all: initial`.

Using a shadow DOM presents some interesting challenges for how we load our CSS into the DOM; see `src/Embed.js` for how this happens (yes, there is probably a better way to do this).

What CSS modules and shadow DOM means for development:

- Use `styleName` instead of `className` in JavaScript. This is required because we use `babel-plugin-css-modules` to match the generated class names between CSS and JS.
- When you create a new CSS file, you need to import it in `src/Embed.js` (in addition to the React components where you use it) and add it to the correct group of CSS styles to be inserted into the document `<head>` or the shadow DOM body.
  - Importing it in `src/Embed.js` actually adds the CSS to the DOM, but `babel-plugin-css-modules` also requires importing the CSS in your JS files in order to resolve `styleName`s.
- Our CSS isn't globally-scoped. To use classes from multiple CSS files, you need to import all of those CSS files in your JS file.
  - There are ways to do globally-scoped classes with CSS modules, but it's a bit awkward: see `src/animations.css`.
- To use `@media` breakpoints from `src/media.css`, you need to import them into your CSS file with `@value`: see `src/VideoMagnet.css`.
- You'll probably want to install PostCSS language support so your editor understands all of our CSS files ([for VS Code](https://marketplace.visualstudio.com/items?itemName=csstools.postcss))

Check out `webpack.config.js` to see how the build process and class name generation actually works.

#### Autoprefixer

We use [Autoprefixer](https://github.com/postcss/autoprefixer/) to handle vendor prefixing in our CSS. This is super useful, but be careful with using rules with multiple selectors that require prefixing (e.g. `div:fullscreen, div a { color: red; }` gets split up into multiple rules: `div:-ms-fullscreen`, `div:-webkit-fullscreen`, and `div:fullscreen, div a`, which causes issues at least in Safari).


### Jitsu / Event Tracking

We use [Jitsu](https://jitsu.com/) to hnadle piping events to bigquery. There are 4 main types of events `open_tour`, `button_click`, `form_view`, `form_submission`. Jitsu has an additional type of event it sends called (`user_identify`). Once passed over Jitsu, it enriches information like location, ip_address and multiple other fields. #Todo: Something we can consider in the future is skipping Jitsu entirely and only depending on our backend and videomagnet for context. Additionally, we package additional data for each type of `open_tour` event. There are 4 types of `open_tour` events: chatbot button (single or multiple buttons), widget, inline or forceStartOpen param. In each of those data we try to pass in additional details as it might pertain: `button_title`, `button_subtitle` etc.


### Style

We use ESLint and Prettier for code style! Find a tutorial to have your IDE
automatically run ESLint on file save. If you want to run it manually,
do `npm run lint` (or without the automatic fixes: `npm run style`).

Hotfix needed on production? Add `[skip lint]` or `[skip style]` anywhere
in your commit message so that the build doesn't break. This only works
on master/main branch. PRs cannot bypass this without breaking the preview build.

There are lots of great editor integrations for Prettier out there to help you get the
most out of it: https://prettier.io/docs/en/editors.html

## Production:

### Local testing

Run `npm run build` to build and open `dist/index.html`.

If it doesn't load, make sure your `.env` `REACT_APP_HOST` variable is correct (if you're expecting to use the backend running on `localhost`, change the env variable and rebuild).

### Embedding on other sites

See `README_EMBED.md` for more info on how to embed this in other sites.
