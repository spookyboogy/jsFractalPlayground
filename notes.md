- Make a minimal, toggle-able debug panel so that we can see canvas size vs viewport size vs drawing buffer size in real time

- create "auto" mode, which basically simulates clicking the triangle at optimal times to produce most interesting animation (ie after 5-6 iterations, calling a new updateCanvas)

- note on setting combos : interesting math related to colorIndex % palette.length palette5 , 8 iterations, 0.6 width palette4, 7, .75 palette2, 8, .75 palette5, 11, .125 js note : Accesses palette4 directly using 'destructuring' : const { palette1 } = palettes;
