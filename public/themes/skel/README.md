# Basic Skeleton

This is the absolute basic markup required to enable full startpage
functionality.

Simply place the index.html file from this director in the root filepath of your
installation to begin theming.

There are only 3 required and 1 optional elements along with 4 scripts to use
the startpage successfully:

1. An element with id="bookmarks" to display the user defined bookmarks.
  - Bookmarks are user defined and auto generated from [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js).

2. An element with id="time" for the clock.
  - This is not a requirement if the clock is not wanted.

3. The most important element in the startpage is the form. This performs the
   core functionality.
  - This should be copied verbatim from the skel template.
  - It can be styled any which was so long as the names, classes, id's and base
    elements are left as is.

4. An ul with class="hide" is necessary for the showing/hiding of the user
   defined search engine list.
  - This should be copied verbatim to ensure correct functionality.
  - In order for the list to be initially hidden the custom css should be used
    to achieve this.

5. The base script tags should be copied verbatim. Missing one or changing the
   order may very well break something.

So long as the aforementioned is adhered to the possibilites are near infinite.
The search engines and bookmarks are automatically generated from the user so
all that needs doing is making it look as fantastic as it performs ;)

## No Theme with all required elements
![Screenshot1](https://github.com/siidney/startpage/blob/master/public/themes/skel/screenshots/2016-08-26-015846_1920x1080_scrot.png "No Theming")

