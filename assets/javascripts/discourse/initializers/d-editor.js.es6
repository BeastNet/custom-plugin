import { emojiSearch } from 'pretty-text/emoji';
import { translations } from 'pretty-text/emoji/data';
import { emojiUrlFor } from 'discourse/lib/text';
import { showSelector } from "discourse/lib/emoji/toolbar";

export default {
  name: "key-change",

  initialize: function (container, $editorInput) {
    const template = container.lookup('template:emoji-selector-autocomplete.raw');
    template.reopen({
         $editorInput.autocomplete({
          template: template,
          key: ":",
          afterComplete(text) {
            self.set('value', text);
          },
    
          transformComplete(v) {
            if (v.code) {
              return `${v.code}:`;
            } else {
              showSelector({
                appendTo: self.$(),
                container,
                onSelect: title => {
                  // Remove the previously type characters when a new emoji is selected from the selector.
                  let selected = self._getSelected();
                  let newPre = selected.pre.replace(/:[^:]+$/, ":");
                  let numOfRemovedChars = selected.pre.length - newPre.length;
                  selected.pre = newPre;
                  selected.start -= numOfRemovedChars;
                  selected.end -= numOfRemovedChars;
                  self._addText(selected, `${title}:`);
                }
              });
              return "";
            }
          },
    
          dataSource(term) {
            return new Ember.RSVP.Promise(resolve => {
              const full = `:${term}`;
              term = term.toLowerCase();
    
              if (term === "") {
                return resolve(["slight_smile", "smile", "wink", "sunny", "blush"]);
              }
    
              if (translations[full]) {
                return resolve([translations[full]]);
              }
    
              const options = emojiSearch(term, {maxResults: 5});
    
              return resolve(options);
            }).then(list => list.map(code => {
              return {code, src: emojiUrlFor(code)};
            })).then(list => {
              if (list.length) {
                list.push({ label: I18n.t("composer.more_emoji") });
              }
              return list;
            });
          }
        });  
    });
  }
};
