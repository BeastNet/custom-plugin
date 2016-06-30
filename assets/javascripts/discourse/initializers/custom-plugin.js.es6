import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'custom-plugin',
  initialize(){

    withPluginApi('0.1', api => {
      api.decorateWidget('home-logo:before', function(helper) {
          var contents = []
        if (!helper.widget.site.mobileView) {
          contents.push(helper.attach('header-dropdown', {
            icon: 'globe',
            iconId: 'custom-icon-menu',
          }));
        }
          return contents
      })
 		});
 	}
}
