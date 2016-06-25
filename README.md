# Custom Start Page 1.0

A custom start page made primarily for Firefox.

Everything is dynamically generated from the [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js) file. Unless of course you
wish to change the theme/layout.

The theme/layout can easily be changed without affecting the functionality by
simply keeping the provided named html elements. However, their locations, size,
colours etc are all fully customisable.

## Default View

The exciting default view shows the search bar, clock and list of bookmarks.

![Screenshot0](/public/img/screenshots/2016-03-31-091905_1920x1080_scrot.png?raw=true "Default view")

## Bookmarks Highlight

Text effect on bookmarks rollover. Now we're getting exciting.

![Screenshot1](/public/img/screenshots/2016-03-31-092507_1920x1080_scrot.png?raw=true "Bookmarks highlight")

## Search Bar

Having difficulty remembering the tag for your desired search. Never fear, with
this handy drop down you can get a dynamic list of all your configured search
engines.

![Screenshot2](/public/img/screenshots/2016-04-01-152020_1920x1080_scrot.png?raw=true "Search Engines DropDown")

You can even roll-over the entries and the search box will automatically show you
the correct tag.

![Screenshot3](/public/img/screenshots/2016-04-01-135649_1920x1080_scrot.png?raw=true "Search Engines DropDown with tags")

Find the one you want and click on it to be taken to search box
and access the knowledge of the world.

If you don't specify a search tag not to worry as it will fallback to a default
user configurable search engine *see below*.

- The search box can recognise the site name you configured if you don't want to
remember the tag; *and* it's case insensitive.

- The search box will also take you to the homepage of a configured
search engine using just the tag or sitename. No need to enter the full url.

- The search bar can recognise local (192.x.x) and filesystem urls (file:///xxx).

![Screenshot4](/public/img/screenshots/2016-04-01-140601_1920x1080_scrot.png?raw=true "Search Box Site Name")

The search box can even recognise urls so rather than searching for the url it
will take you directly to the site.

![Screenshot5](/public/img/screenshots/2016-04-01-153146_1920x1080_scrot.png?raw=true "Search Box URL")

The search strings will be fully url encoded *AND* if you need to search for
something using the *:* delimiter you can rest easy in the knowledge that your
query will be sent as you intended.

![Screenshot6](/public/img/screenshots/2016-04-01-135222_1920x1080_scrot.png?raw=true "Search Box Tomfoolery")

## Configuring Bookmarks and Search Engines

Search engine and bookmark preferences are easily customisable and updateable.
All you need to do is edit [lists.js](https://github.com/siidney/startpage/blob/master/public/js/lists.js) to include *your* favourite site or search engine.

Search engines are stored for your convenience and include custom tags, a title
for the link and an easy way to specify a default search.

## Known Issues

**Search Bar**

The about config pages from firefox cannot be opened programmatically (security
feature). So in order to access them you need to manually invoke the url bar as
before. A warning is provided if an attempt is made to access any of the
aforementioned.
