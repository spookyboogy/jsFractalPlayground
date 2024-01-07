
A little project for learning various javascript and web development concepts (with fractals) 

You can view the project [here](https://spookyboogy.neocities.org/), on Neocities.

## To-Do List

- [ ] Add a second drawing mode (2nd offset fractal for 3d effect for eg)
- [ ] Add a mechanism for switching modes/configurations.
- [x] Set up GitHub actions to make pushing updates / deploying to Neocities from local repo easy.
- [x] Add toggle-able info panel for mobile debugging

## Implementation Ideas

- Implement a mode where:
  - For each palette (probably clearing canvas on new palette):
    - Draw fractal of increasing iteration level and proportionally decreasing line width.
    - Each new iteration level being slightly shifted on the canvas (e.g., down, left).
    - Refresh canvas

## Features-to-add

- [ ] A (hideable) menu containing sliders for custom configs (iteration level, line width, etc), with live updating.
- [ ] Click, drag, and release to set the location where a second fractal gets drawn (to create a 3D effect).

## Issues

- Depending on window size / resolution / platform, given a range of iterations to be drawn, the actual amount of iterations drawn on-screen might not be the full iteration level intended.
  - This is not so much a problem when drawing only a single fractal, rather than a range of them.
  - Other ideas would be to selectively draw certain iteration levels in the range, maybe skipping indices by 2nd or 3rds (or maybe depending on the palette being used) would produce a richer/faster animation when drawing ranges.

- Dragging the window to resize it can be fun for creating 2nd/offset fractals, but it sometimes is too blurry because `updateCanvas` gets called too many times while dragging the window. See if it's possible to capture drag events in particular to reduce the number of times it triggers `updateCanvas`.

## Miscellaneous

- Learn how to view/check neocities site visitors

