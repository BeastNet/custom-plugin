import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'custom-plugin',
  initialize(){

    withPluginApi('0.1', api => {
      api.decorateWidget('home-logo:after', function(helper) {
          var headerState = helper.widget.parentWidget.state,
            contents = []
        if (!helper.widget.site.mobileView) {
          contents.push(helper.attach('header-dropdown', {
            title: 'icons',
            icon: 'home',
            iconId: 'toggle-messages-menu',
            active: headerState.messagesVisible,
            action: 'toggleMessages'
          }));
        }
        if (headerState.messagesVisible) {
          contents.push(helper.attach('custom-widget'))
        }
        return contents
      })

      api.attachWidgetAction('header', 'toggleMessages', function() {
        this.state.messagesVisible = !this.state.messagesVisible
      })
 		});
 	}
}