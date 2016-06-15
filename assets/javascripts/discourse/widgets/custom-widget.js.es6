import { createWidget } from 'discourse/widgets/widget';
import { iconNode } from 'discourse/helpers/fa-icon';
import { avatarImg } from 'discourse/widgets/post';
import DiscourseURL from 'discourse/lib/url';
import { wantsNewWindow } from 'discourse/lib/intercept-click';

import { h } from 'virtual-dom';

function sanitizeName(name){
  return name.toLowerCase().replace(/[\s_-]/g,'');
}
createWidget('header-badge', {
  tagName: 'div.names.trigger-user-card',

  // TODO: Allow extensibility
  posterGlyph(attrs) {
  	const { currentUser } = this;
    if (currentUser.moderator) {
      return iconNode('shield', { title: I18n.t('user.moderator_tooltip') });
    }
  },

  userLink(attrs, text) {
  	const { currentUser } = this;
    return h('a', { attributes: {
      href: currentUser.get('path'),
      'data-auto-route': true,
      'data-user-card': currentUser.get('username')
    } }, text);
  },

  html(attrs) {
  	const { currentUser } = this;
    const username = currentUser.get('username');
    const name = currentUser.get('name');
    const nameFirst = this.siteSettings.display_name_on_posts && !this.siteSettings.prioritize_username_in_ux && name && name.trim().length > 0;
    const classNames = nameFirst ? ['first','full-name'] : ['first','username'];

    if (currentUser.staff) { classNames.push('staff'); }
    if (currentUser.admin) { classNames.push('admin'); }
    if (currentUser.moderator) { classNames.push('moderator'); }
    if (currentUser.new_user) { classNames.push('new-user'); }

    const primaryGroupName = attrs.primary_group_name;
    if (primaryGroupName && primaryGroupName.length) {
      classNames.push(primaryGroupName);
    }
    const nameContents = [ this.userLink(attrs, nameFirst ? name : username) ];
    const glyph = this.posterGlyph(attrs);
    if (glyph) { nameContents.push(glyph); }

    const contents = [h('span', { className: classNames.join(' ') }, nameContents)];
    if (name && this.siteSettings.display_name_on_posts && sanitizeName(name) !== sanitizeName(username)) {
      contents.push(h('span.second.' + (nameFirst ? "username" : "full-name"),
            this.userLink(attrs, nameFirst ? username : name)));
    }
    const title = attrs.user_title;
    if (title && title.length) {
      let titleContents = title;
      if (primaryGroupName) {
        const href = Discourse.getURL('/groups/${primaryGroupName}');
        titleContents = h('a.user-group', { attributes: { href } }, title);
      }
      contents.push(h('span.user-title', titleContents));
    }

    return contents;
  }
});
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


