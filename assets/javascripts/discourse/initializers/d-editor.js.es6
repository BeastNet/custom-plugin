import { emojiSearch } from 'pretty-text/emoji';
import { translations } from 'pretty-text/emoji/data';
import { emojiUrlFor } from 'discourse/lib/text';
import { showSelector } from "discourse/lib/emoji/toolbar";

export default {
  name: "key-change",

  initialize: function (container, $editorInput) {
    const template = container.lookup('template:emoji-selector-autocomplete.raw');
    template.reopen({
           
      
    });
  }
};
