"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uq = function (exports) {
  'use strict';
  /**
   * Header module
   * @file Handles interaction behaviour for the Header. Does not output any
   * HTML elements.
   * TODO: make this class configurable
   */

  var header = /*#__PURE__*/function () {
    function header() {
      _classCallCheck(this, header);

      this.init();
    }

    _createClass(header, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.toggle = document.querySelector('uq-header').shadowRoot.querySelector('.search-toggle__button');
        this.search = document.querySelector('uq-header').shadowRoot.querySelector('.nav-search');
        this.searchInput = document.querySelector('uq-header').shadowRoot.querySelector('.search-query__input');
        this.meta = document.querySelector('uq-header').shadowRoot.querySelector('meta.uq-header__mq--desktop');
        this.toggle.addEventListener('click', function () {
          _this.handleToggle();
        });
      }
    }, {
      key: "handleToggle",
      value: function handleToggle() {
        this.toggle.classList.toggle('search-toggle__button--icon-close');
        this.search.classList.toggle('nav-search--open');

        if (this.search.classList.contains('nav-search--open')) {
            this.searchInput.focus();
          } else {
            this.toggle.blur();
          }
      }
    }]);

    return header;
  }();

  exports.header = header;
  return exports;
}({});
