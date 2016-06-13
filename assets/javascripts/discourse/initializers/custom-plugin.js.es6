import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'custom-plugin',
  initialize(){

    withPluginApi('0.1', api => {
      api.decorateWidget('home-logo:after', function(helper) {
            contents = []
        if (!helper.widget.site.mobileView) {
          contents.push(helper.attach('custom-widget', {
            action: 'toggleMessages'
              });
               return contents
        	}
       
      		})
 		});
 	}
}