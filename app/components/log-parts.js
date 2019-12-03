import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool, reads } from '@ember/object/computed';

// const CLEAR_ANSI = /(?:\033)(?:\[0?c|\[[0356]n|\[7[lh]|\[\?25[lh]|\(B|H|\[(?:\d+(;\d+){,2})?G|\[(?:[12])?[JK]|[DM]|\[0K)/gm;

export default Component.extend({
  part: null,
  content: reads('part.content'),
  final: bool('part.final'),
  number: reads('part.number'),

  lines: computed('content', function () {
    let { content = '' } = this;

    content = content.replace(/\033\[1000D/gm, '\r');

    // This is an ultra-specific fix for this issue:
    // https://github.com/travis-ci/travis-ci/issues/7106
    // eslint-disable-next-line
    content = content.replace(/\r\u001B\[0m\n/g, '\n');

    // Fix for issue: https://github.com/travis-pro/team-teal/issues/2782
    // eslint-disable-next-line
    content = content.replace(/\r\u001B\[0m\r\n/gm, '\n');

    content = content.replace(/\r+\n/gm, '\n');
    content = content.replace(/\r+/gm, '\r');
    const contents = content.split(/^/gm) || [];

    return contents;
  }),
});
