# Custom Start Page 1.1.0

A custom start page made primarily for Firefox.

Everything is dynamically generated from the [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js) file. Unless of course you
wish to change the theme/layout.

## Themes

Some premade themes are located [here](https://github.com/siidney/startpage/blob/master/public/themes/).
At least they will be as and when they are completed.

The theme/layout can easily be customised without affecting the core functionality by
simply using the [skel](https://github.com/siidney/startpage/blob/master/public/themes/skel) theme as a base.

It is fully documented and quite easy to understand.

## Details

This startpage is built of 3 key and one optional components, along with 4
scripts:

1. A list of user defined bookmarks. There are no limits upon the number of
   individual lists or organisation.
  - Bookmarks are user defined and auto generated from [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js).
  - Here's a short, silent and sweet screencast showcasing the awesomeness of it
    all: [Adding Bookmarks Screencast One](https://vid.me/MjdB) - *external link*

2. Just a clock.
  - This is not a requirement if the clock is not wanted.
  - Always nice to know the time though.

3. The most important element in the startpage is the form. This performs the
   core functionality.
  - Everything is taken from the user defined searchEngines from [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js).
  - *tags* are the shortform to access the required search.
  - *url* is the search url (rip this from the site by performing a dummy search)
  - *default* specifies whether or not this is the default search engine if no
    tag was specified in the query.
  - The search form can also:
    - Goto the home page of a configured search engine using the tag or site
      name. *case insensitive*
    - Recognise local (192.x.x) and filesystem urls (file:///xxx).
  - The search strings will be fully url encoded *AND* if you need to search for
something using the *:* delimiter you can rest easy in the knowledge that your
query will be sent as you intended.

4. The search form also contains a hidden (by default) list of user defined tags
   so no worries if your memory isn't too good.
  - The entries will auto complete in the search box on rollover.
  - Here's a short, silent, sexy screencast showcasing the awesomeness of
    adding your own search engines: [Adding SearchEngines Screencast One](https://vid.me/hMTb) - *external link*

5. The scripts.
  - Javascript is not my fortè so the fact this actually works as well as it
    does is miraculous.

## Sexy Silent ScreenCasts *external links*
[Functionality with ThemeThree](https://vid.me/7WSW)

[Functionality with ThemeTwo](https://vid.me/vrz8)

[Functionality With ThemeOne](https://vid.me/KPQH)

[Functionality With Basic](https://vid.me/WBBO)

## Known Issues

**Search Bar**

The about config pages from firefox cannot be opened programmatically (security
feature). So in order to access them you need to manually invoke the url bar as
before. A warning is provided if an attempt is made to access any of the
aforementioned.
