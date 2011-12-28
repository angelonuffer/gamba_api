gamba_api
=========

A js api to create toolbars and editors using jquery.


Building jquery
---------------

You need to build the jquery submodule::

    $ cd gamba/jquery
    $ make

See the "gamba/jquery/README.md" for more informations.


Running tests
-------------

To run the tests, you need an HTTP server. I like the thttpd for this::

    # thttpd -d gamba/

Go to a browser and access the url "http://localhost/tests.html".
