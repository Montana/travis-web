import Component from '@ember/component';
import { not } from '@ember/object/computed';

export default Component.extend({
  job: null,
  log: null,

  isTailing: false,
  autoCloseFold: not('isTailing'),

  actions: {
    toTop() {
      this.set('isTailing', false);
      return this.scroller.scrollToElement(this.element, { duration: 100 });
    },

    toggleTailing() {
      const isActive = !this.isTailing;
      this.set('isTailing', isActive);
      // if (isActive) {
      //   this.doTailing();
      // }
    },

    toggleLog() {
      this.toggleProperty('logIsVisible');
    },

    toggleRemoveLogModal() {
      this.toggleProperty('isShowingRemoveLogModal');
    },
  },
});
