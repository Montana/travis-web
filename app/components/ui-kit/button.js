import Component from '@ember/component';
import { computed } from '@ember/object';
import { checkDictionary } from 'travis/utils/ui-kit/assertions';

// Public dictionaries
export const COLORS = {
  BLUE: 'blue',
  GREY: 'grey',
};

// Private dictionaries
const DEFAULT_COLOR = COLORS.BLUE;

const BG_COLORS = {
  [COLORS.BLUE]: 'blue-400',
  [COLORS.GREY]: 'grey-700',
  disabled: 'grey-200',
  invert: 'transparent',
};

const HOVER_BG_COLORS = {
  [COLORS.BLUE]: 'blue-500',
  [`${COLORS.BLUE}-invert`]: 'blue-100',
  [COLORS.GREY]: 'grey-800',
  [`${COLORS.GREY}-invert`]: 'grey-150',
};

const LABEL_COLORS = {
  [`${COLORS.BLUE}-invert`]: 'blue-400',
  [`${COLORS.GREY}-invert`]: 'grey-700',
  disabled: 'white',
  'disabled-invert': 'grey-200',
  default: 'white',
};

export default Component.extend({
  tagName: '',

  // Public interface
  role: 'button',
  color: DEFAULT_COLOR,
  invert: false,
  disabled: false,

  onClick() {},

  // Private
  bgColor: computed('color', 'disabled', 'invert', function () {
    return this.invert
      ? BG_COLORS['invert']
      : this.disabled
        ? BG_COLORS['disabled']
        : BG_COLORS[this.color];
  }),
  hoverBgColor: computed('color', 'disabled', 'invert', 'bgColor', function () {
    return this.disabled
      ? this.bgColor
      : this.invert
        ? HOVER_BG_COLORS[`${this.color}-invert`]
        : HOVER_BG_COLORS[this.color];
  }),

  labelColor: computed('color', 'disabled', 'invert', function () {
    if (this.invert) {
      return this.disabled
        ? LABEL_COLORS['disabled-invert']
        : LABEL_COLORS[`${this.color}-invert`];
    } else {
      return this.disabled
        ? LABEL_COLORS['disabled']
        : LABEL_COLORS[this.color] || LABEL_COLORS['default'];
    }
  }),

  borderColor: computed('invert', 'bgColor', 'labelColor', function () {
    return this.invert ? this.labelColor : this.bgColor;
  }),

  // Lifecycle
  didReceiveAttrs() {
    this._super(...arguments);

    checkDictionary(this.color, COLORS, '@color', 'Button');
  },

  // Actions
  actions: {
    handleClick() {
      return this.onClick();
    }
  }
});
