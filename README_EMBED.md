# Widget Embedding

We use `public/index.html` (which outputs to `dist/index.html`) to easily test the VideoMagnet and to demo some of the configurable embedding settings. `index.html` also has comments explaining many of the embedding-related settings and gotchas.

`public/iframe.html` is used to demo embedding in an iFrame with the `inline` layout setting (see the "Configuration" section below). Use `localhost:3000/iframe.html`. **Do not use `/iframe.html` in production, since it references `localhost:3000` as the iFrame `src`, not our production URL**.

`index.html` is used when testing/staging on https://embed.tour.video or a Render PR preview.

## Configuration

The JS object passed into the `LeaseMagnets` function contains the magnet configuration.

Options (all optional besides `uuid`):

- `uuid` (required): magnet UUID string.
- `inline` (default `false`): When inline, the button is never shown and the VideoMagnet starts open, with the video paused. This is primarily intended for iFrames, but can also be used for a fullscreen tour with just `?inline=true`. See `public/iframe.html` for an example of iFrame embedding.
- `layout` (default `"left"`): For non-inline layouts, which side of the page to position the VideoMagnet and button on. Options: `"left"`, `"center"`, `"center-bottom"`, `"right"`. Ignored if `inline=true` or a `parentId` is provided.
- `startOpen` (default `false`): `true` if the VideoMagnet should be initially open. Triggered automatically if `openLeaseMagnets` is present in the URL parameters. No effect for `inline=true`. Note that the video may not be able to play automatically if the user hasn't interacted with the page.
- `desktopWidth`, `desktopHeight` (default `50` and `95`): Override the VideoMagnet height and width on desktop / tablets (phone widths will not change). Values will be used as percentages. These have no effect for `layout=inline`.
- `parentId`: ID of a DOM element to use as the VideoMagnet's parent. That element should have `position: fixed`. See `index.html` for an example of using `parentId` and comments explaining some of the required CSS. If `parentId` is not provided or it is invalid, the VideoMagnet will be appended to the `<body>` (which may cause an overflow on some sites).
- `startScreen`: String `category.screen` route to start at instead of the default start route, e.g. `floor_plans.main`.
- `buttonLabel` (default `"Take a virtual tour"`): Label for the button that opens the VideoMagnet.
- `showButton` (default `true`): Show the Button when the VideoMagnet is closed. This may be useful when using the global `window.toggleLeaseMagnetsOpen()` function (see below)
- `hideButtons` (default `false`): Hide the navigation buttons when the hideButtons is true.
- `primaryColor` (default `red`): Primary color for the VideoMagnet theme. Note that hex colors in the URL (e.g. for iFrame embedding) must be URL-encoded (use `%23` instead of a leading `#`); this is not a problem for embedding by calling the `LeaseMagnets({ ... })` function.
- `backgroundOpacity` (default `0`): Opacity for a black background shade for the VideoMagnet.
- `inlineCTA`: String call-to-action to be displayed when the VideoMagnet is inline and has not yet played. Note that spaces and other special characters must be encoded in URLs when using an iFrame (e.g. `Hello there` becomes `"Hello%20there`)
- `showLinksInline` (default: `false`): When inline, the VideoMagnet autoplays while muted. If this is `true`, the nav links will be shown during that inline muted autoplay.
- `blockEvents`: Single string or array of string event types to stop from propagating out of the shadow DOM. This is a special case for when other JS on the page reacts unexpectedly to events from the shadow DOM (e.g. old versions of [SmoothScroll :rage:](https://github.com/cferdinandi/smooth-scroll/) and `keydown` events when typing spaces in our form). This should probably be set manually on a customer-by-customer basis, since it requires some testing/debugging to figure out which event types to block.
- `onClose`: Function to call when the VideoMagnet is closed ("X" button clicked)
- `widgetType`: can make the tour open as a "vertical" or "circle" widget


## Opening/closing the VideoMagnet

In most cases, the VideoMagnet is opened by clicking on the `Button` and closed by clicking the close button. However, some sites may wish to also open the VideoMagnet e.g. when clicking on a link. To support this, we expose two functions to `window`:

- `window.toggleLeaseMagnetsOpen()` will open/close the VideoMagnet
- `window.setLeaseMagnetsScreen(newRouteString)` accepts a string route (e.g. `"floor_plans.main"`) to use as the new route. Sites may want to call this before opening the VideoMagnet, e.g. to open to a specific screen.
## Reconfiguring the VideoMagnet on the fly

The VideoMagnet configuration can be reset without destroying and completely re-creating it by calling the `window.LeaseMagnets({ ... })` function again with a different configuration. Some changes (`primaryColor`) will happen instantly, others (`startScreen`) may trigger animations/transitions.

Note that the VideoMagnet does not store the previous config. If you want to e.g. have a `primaryColor: "blue"` VideoMagnet, then later change `startScreen`, you must provide both `primaryColor` AND `startScreen` when you call `LeaseMagnets({ ... })` again.

Reconfiguring the VideoMagnet requires rendering it into the same DOM element, whether created by the VideoMagnet or specified using `parentId`. Either way, **the `parentId` must remain the same (`undefined` or the initially provided value) between reconfigurations.** If you want to change the `parentId`, call `window.destroyLeaseMagnets()` first. Otherwise, multiple instances of the VideoMagnet will be created, and the new will overwrite the global `window` functions (e.g. `toggleLeaseMagnetsOpen`) of the other instance.

## Overriding the VideoMagnet config

To create a temporary instance of the VideoMagnet that overrides some parts of the initial configuration, use `window.tempLeaseMagnets({ ...overrides })`. The instance will be reset to the most recent config passed to `window.LeaseMagnets()` when the VideoMagnet closes and runs `onClose`.

This is **not** equivalent to reconfiguring the VideoMagnet on the fly, which requires providing an entirely new config to `window.LeaseMagnets()`, rather than overriding the previous config.

You can call `tempLeaseMagnets()` without having a previous config created (just make sure to provide all required elements of the config in the `overrides` argument).

## Automatically opening the VideoMagnet

Adding `?openLeaseMagnets` to the URL query parameters will make the VideoMagnet open automatically when the page loads with `layout=center` and `backgroundOpacity=0.5`. The `?openLeaseMagnets` query parameter will be automatically removed when the VideoMagnet closes, and the VideoMagnet will reset to the initial config.

## Destroying the VideoMagnet

Calling `window.destroyLeaseMagnets()` to remove the VideoMagnet from the page. This will remove any light DOM elements that were created to hold the VideoMagnet, but will not delete parent elements specified using `parentId` (or their shadow DOMs).

## Embedding with Tag Manager

We use Google Tag Manager to inject our custom HTML into the host site. An example tag using the "Custom HTML" tag in Google Tag Manager:

```html
<div id="leasemagnets" style="position: fixed; bottom: 0;" />
<script
  type="text/javascript"
  src="https://embed.tour.video/leasemagnets.js"
></script>
<script type="text/javascript">
  LeaseMagnets({
    uuid: MAGNET_UUID,
    parentId: 'leasemagnets',
    buttonLabel: 'Take a virtual tour and get $250 off',
  });
</script>
```

This may fail with "element is not a DOM object" in the Tag Manager preview (it doesn't seem to create the `<div id="leasemagnets" />`) but it does work when deployed.

Pro tip: when testing live on an external site, you can use a URL query parameter (e.g. `uuid: (new URLSearchParams(window.location.search)).get('uuid')`) to only display the widget when you add the UUID to the URL (but, don't test in production if you can help it! :smile:).
