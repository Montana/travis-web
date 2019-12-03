import Component from '@ember/component';
import { computed } from '@ember/object';
import { match, or } from '@ember/object/computed';
import Log from 'travis/utils/log';

const FOLD = /fold:(start|end):([\w_\-\.]+)/;
const TIME = /time:(start|end):([\w_\-\.]+):?([\w_\-\.\=\,]*)/;

export default Component.extend({
  tagName: '',

  line: '',

  isFold: match('line', FOLD),
  isTime: match('line', TIME),
  isMeta: or('isFold', 'isTime'),

  metaParts: computed('line', 'isMeta', function () {
    let { line, isMeta} = this;

    if (isMeta) {
      return line.split(':');
    }
    return [];
  }),

  meta: computed('metaParts.[]', function () {
    const { metaParts } = this;
    if (metaParts.length) {
      const [type, position, detail] = metaParts;
      return {
        type,
        position,
        detail,

        isStart: position === 'start',
        isEnd: position === 'end',
      };
    }
    return {};
  }),

  xardions: computed('line', 'isMeta', function () {
    const { isMeta, line } = this;
    return isMeta ? [] : Log.Deansi.apply(line) || [];
  }),
});
