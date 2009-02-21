JSLint for TextMate
===================

Use a local copy of [JSLint](http://www.jslint.com/)

* Run in web preview
* Use unmodified JSLint code
  * HTML is simply stripped down
  * JS just making nclik a global (or you can duplicate code).

Installation :
--------------

    cd ~/Library/Application\ Support/TextMate/Bundles/
    git clone git://github.com/ppierre/jslint-tmbundle.git JSLint.tmbundle
    osascript -e 'tell app "TextMate" to reload bundles'

> Un grand merci à Douglas Crockford sans qui écrire du code JavaScript serait un calvaire.