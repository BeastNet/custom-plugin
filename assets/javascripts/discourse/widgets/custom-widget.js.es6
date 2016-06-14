import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from 'discourse/helpers/fa-icon';
import { avatarImg } from 'discourse/widgets/post';
import DiscourseURL from 'discourse/lib/url';
import { wantsNewWindow } from 'discourse/lib/intercept-click';

import { h } from 'virtual-dom';


const dropdown = {
  buildClasses(attrs) {
    if (attrs.active) { return "active"; }
  }
  }
createWidget('user-avatar', {
  html(attrs) {
    const { currentUser } = this;

    const contents = [ avatarImg('medium', { template: currentUser.get('avatar_template'),
                                             username: currentUser.get('username') }) ];

    return contents;
  }
});
createWidget('user-name', {
  html(attrs) {
    const { currentUser } = this;
    const contents = currentUser.get('username');
    return contents;
  }
});

createWidget('user-detail', jQuery.extend({
  tagName: 'div.details-container',

  html(attrs) {
    const { currentUser } = this;

    return h('div.user-details',[h('a.icon', { attributes: { href: currentUser.get('path'), 'data-auto-route': true } },
             this.attach('user-avatar', attrs)),h('span', this.attach('user-name', attrs))]);
  }
}, dropdown));

createWidget('custom-widget',{
	tagName: 'div.slide-bottom',
	html(attrs){
		return [h('div.top-box',h('span.center-box')),h('div', [h('a.slide-close',"Close"),h('div', this.attach('user-detail', attrs))]),h('div.bottom-box')];
	}

})


