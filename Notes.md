# Notes for writing filters

## click2load

Using `redirect=click2load.html` is generally useful, both to save time by not loading unnecessary iframes,
and to improve privacy by not connecting to unnecessary sites.

iframes from sites that already have their own "click to load" system should be whitelisted,
as the filter would just make the experience of using the site worse. A few examples include Twitter & Reddit.
