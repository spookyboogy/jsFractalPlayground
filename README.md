
A little project for learning various javascript and web development concepts (with fractals) 

You can view the project [here](https://spookyboogy.neocities.org/), on Neocities.

## To-Do List

- [ ] Add a mode for drawing offset fractals for 3d effect
- [x] Add mechanism for live swapping color palettes
- [x] Add a mechanism for switching drawing modes/configurations.
- [x] Set up GitHub actions to make pushing updates / deploying to Neocities from local repo easy.
- [x] Add toggle-able info panel for mobile debugging
- [ ] Add small, maybe default-hidden buttons to github repo and other links, or a single button which unpacks an array of buttons (animated preferably)
- [ ] Remove redundant or underwhelming color palettes, add better ones
- [ ] add a keybinding for resetting canvas (for when it gets too busy)
- [ ] and/or add a default auto reset/looping mode to prevent oversaturation

## Features-to-add

- [ ] A (hideable) menu containing sliders for custom configs (iteration level, line width, etc), with live updating.
- [ ] Click, drag, and release to set the location where a second fractal gets drawn (to create a 3D effect) (not sure this is a good idea anymore)

## Issues

- There's a hard limit to the iteration level that can be darwn onto screen (depends on resolution/DPR). Need to figure out the formula for that max iteration level so that maxIterations can be set according to device limitations.

- Need to find an expression/formula which finds calculates the best minLineWidth for a given maxIterations and DPR. The goal is to ensure that the lineWidth  used for the smallest trianlges (at maxIterations, assuming dynamicLineWidthMode) is thin enough that it doesn't fully color the area of the triangle being outlined, but also wide enough that it has a chance to be visible. 

- Dragging the window to resize it can be fun for creating 2nd/offset fractals, but it sometimes is too blurry because `updateCanvas` gets called too many times while dragging the window. See if it's possible to capture drag events in particular to reduce the number of times it triggers `updateCanvas`. ie it should be debounced

## Miscellaneous

- Learn how to view/check neocities site visitors
- The first click of pyramidContainer doesn't display the info box, why not?

