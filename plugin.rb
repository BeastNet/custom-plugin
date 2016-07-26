# name: custom-plugin
# about: this is a custom plugin for Discourse
# version: 0.5
# authors: Pankaj Gupta

register_asset "stylesheets/custom-plugin.css", :desktop
register_asset "javascripts/discourse/templates/user/user.hbs"
register_asset "javascripts/discourse/initializers/custom-plugin.js.es6"
register_asset "javascripts/discourse/initializers/d-editor.js.es6"
