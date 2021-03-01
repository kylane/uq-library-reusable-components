"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uq = function (exports) {
  'use strict';
  /**
   * Main Navigation
   * @file Drop down navigation handler.
   */

  var MainNavigation = /*#__PURE__*/function () {
    function MainNavigation(nav, navClass) {
      _classCallCheck(this, MainNavigation);

      this.nav = nav;
      this.navClass = navClass;
      this.toggleClass = "jsNavToggle";
      this.openModifier = "".concat(this.navClass, "__list--open");
      this.levelOpenModifier = "".concat(this.navClass, "__list-item--open");
      this.level1Class = "".concat(this.navClass, "__list--level-1");
      this.level2Class = "".concat(this.navClass, "__list--level-2");
      this.reverseClass = "".concat(this.navClass, "__list--reverse");
      this.subNavClass = "".concat(this.navClass, "__list-item--has-subnav");
      this.subToggleClass = "".concat(this.navClass, "__sub-toggle");
      this.init = this.init.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.handleMobileToggle = this.handleMobileToggle.bind(this);
      this.setOrientation = this.setOrientation.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.init();
    }

    _createClass(MainNavigation, [{
      key: "init",
      value: function init() {
        var _this = this;

        var mobileToggle = document.querySelector(".".concat(this.toggleClass));
        var subNavItems = this.nav.querySelectorAll(".".concat(this.subNavClass));
        var subNavLinks = this.nav.querySelectorAll(".".concat(this.subNavClass, " > a"));
        var subNavL2Items = this.nav.querySelectorAll(".".concat(this.level2Class, " .").concat(this.subNavClass));
        var subNavL2Links = this.nav.querySelectorAll(".".concat(this.level2Class, " .").concat(this.subNavClass, " > a"));
        var navLinks = this.nav.querySelectorAll('li > a');
        var subNavToggles = this.nav.querySelectorAll(".".concat(this.subToggleClass));
        mobileToggle.addEventListener('click', this.handleMobileToggle);
        subNavItems.forEach(function (item) {
          _this.setOrientation(item);

          item.addEventListener('mouseenter', _this.handleToggle);
          item.addEventListener('mouseleave', _this.handleToggle);
        });
        subNavLinks.forEach(function (item) {
          if (window.matchMedia('(min-width: 1024px)').matches) {
            item.addEventListener('touchend', _this.handleToggle);
          }
        });
        subNavL2Items.forEach(function (item) {
          _this.setOrientation(item);

          item.addEventListener('mouseenter', _this.handleToggle);
          item.addEventListener('mouseleave', _this.handleToggle);
        });
        subNavL2Links.forEach(function (item) {
          item.addEventListener('touchend', _this.handleToggle);
        });
        navLinks.forEach(function (item) {
          item.addEventListener('keydown', _this.handleKeyPress);
        });
        subNavToggles.forEach(function (item) {
          item.addEventListener('click', _this.handleToggle);
        });
      }
    }, {
      key: "handleMobileToggle",
      value: function handleMobileToggle(event) {
        var _this2 = this;

        var toggle = event.target;
        var target = this.nav.querySelectorAll(".".concat(this.level1Class));
        var ariaExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.classList.toggle('uq-site-header__navigation-toggle--close');
        toggle.setAttribute('aria-expanded', !ariaExpanded);
        target.forEach(function (el) {
          el.classList.toggle(_this2.openModifier);
          el.setAttribute('aria-expanded', !ariaExpanded);
        });
      }
    }, {
      key: "handleToggle",
      value: function handleToggle(event) {
        if ((event.type === 'mouseenter' || event.type === 'mouseleave') && window.matchMedia('(max-width: 1024px)').matches) {
          return;
        }

        var menuItem = event.target;

        if (menuItem.tagName !== 'LI') {
          menuItem = menuItem.parentElement;
        }

        var subNav = menuItem.querySelector('ul');

        if (subNav.classList.contains(this.openModifier)) {
          this.closeLevel(subNav, menuItem);
        } else {
          if (event.type === 'touchend') {
            event.preventDefault();
          }

          this.closeAllLevels();
          this.openLevel(subNav, menuItem);
        }
      }
    }, {
      key: "openLevel",
      value: function openLevel(subNav, menuItem) {
        subNav.classList.add(this.openModifier);
        menuItem.classList.add(this.levelOpenModifier);
        menuItem.querySelector('a').setAttribute('aria-expanded', 'true');
      }
    }, {
      key: "closeLevel",
      value: function closeLevel(subNav, menuItem) {
        subNav.classList.remove(this.openModifier);
        this.setOrientation(menuItem);
        menuItem.classList.remove(this.levelOpenModifier);
        menuItem.querySelector('a').setAttribute('aria-expanded', 'false');
      }
    }, {
      key: "closeAllLevels",
      value: function closeAllLevels() {
        var _this3 = this;

        var levels = this.nav.querySelectorAll(".".concat(this.subNavClass));
        levels.forEach(function (level) {
          var item = level.querySelector(".".concat(_this3.level2Class));

          _this3.closeLevel(item, level);
        });
      }
    }, {
      key: "setOrientation",
      value: function setOrientation(item) {
        var subNav = item.querySelector(".".concat(this.level2Class));
        var reverseClass = this.reverseClass;
        var subNavRight = 0;

        if (subNav && subNav.getBoundingClientRect()) {
          subNavRight = subNav.getBoundingClientRect().right;
        }

        if (window.innerWidth < subNavRight) {
          subNav.classList.add(reverseClass);
        }
      }
    }, {
      key: "handleKeyPress",
      value: function handleKeyPress(event) {
        var parent = event.currentTarget.parentNode;
        var nav = parent.parentNode;

        if (parent === nav.firstElementChild) {
          // If we shift tab past the first child, toggle this level.
          if (event.key === 'Tab' && event.shiftKey === true) {
            this.closeLevel(nav, nav.parentNode);
          }
        } else if (parent === nav.lastElementChild) {
          // If we tab past the last child, toggle this level.
          if (event.key === 'Tab' && event.shiftKey === false) {
            this.closeLevel(nav, nav.parentNode);
          }
        } // Toggle nav on Space (32) or any Arrow key (37-40).


        switch (event.keyCode) {
          case 32:
          case 37:
          case 38:
          case 39:
          case 40:
            event.preventDefault();
            this.handleToggle(event);
            break;
        }
      }
    }]);

    return MainNavigation;
  }();

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function require(path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var ready = createCommonjsModule(function (module) {
    /*!
      * domready (c) Dustin Diaz 2014 - License MIT
      */
    !function (name, definition) {
      module.exports = definition();
    }('domready', function () {
      var fns = [],
          _listener,
          doc = document,
          hack = doc.documentElement.doScroll,
          domContentLoaded = 'DOMContentLoaded',
          loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

      if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
        doc.removeEventListener(domContentLoaded, _listener);
        loaded = 1;

        while (_listener = fns.shift()) {
          _listener();
        }
      });
      return function (fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn);
      };
    });
  });
  /**
   * @file
   * UQ Accordion JS (instantiates an object that controls "accordion" nodes for 
   * the entire document). You need to make sure your accordion HTML is correctly
   * formatted and the accompanying SCSS/CSS is loaded as well.
   */

  var accordion = /*#__PURE__*/function () {
    /**
     * @constructor
     * @param {String} [className] - Class name of accordion wrappers (optional; 
     * default: "accordion").
     */
    function accordion(className) {
      _classCallCheck(this, accordion);

      if (!className) {
        className = 'accordion';
      } else {
        className = className;
      }

      this.className = className;
      this.init();
    }

    _createClass(accordion, [{
      key: "slideContentUp",

      /**
       * Method to hide accordion content
       * @method
       * @param {HTMLElement} el - 'Toggler' HTML element.
       */
      value: function slideContentUp(el) {
        var _this4 = this;

        var content = accordion.getNextSibling(el, ".".concat(this.className, "__content"));
        el.classList.remove("".concat(this.className, "__toggle--active"));
        el.setAttribute('aria-expanded', 'false');
        content.style.height = '0px';
        content.addEventListener('transitionend', function () {
          content.classList.remove("".concat(_this4.className, "__content--active"));
        }, {
          once: true
        });
        content.setAttribute('aria-hidden', 'true');
      }
      /**
       * Method to show accordion content
       * @method
       * @param {HTMLElement} el - 'Toggler' HTML element.
       */

    }, {
      key: "slideContentDown",
      value: function slideContentDown(el) {
        var content = accordion.getNextSibling(el, ".".concat(this.className, "__content"));
        el.classList.add("".concat(this.className, "__toggle--active"));
        el.setAttribute('aria-expanded', 'true');
        content.classList.add("".concat(this.className, "__content--active"));
        content.style.height = 'auto';
        var height = content.clientHeight + 'px';
        content.style.height = '0px';
        setTimeout(function () {
          content.style.height = height;
        }, 0);
        content.setAttribute('aria-hidden', 'false');
      }
      /**
       * Method to hide all other accordion content except for passed element.
       * @method
       * @param {HTMLElement} el - Excluded 'Toggler' HTML element.
       * @param {HTMLElement[]} togglers - List of 'toggler' elements.
       */

    }, {
      key: "slideUpOthers",
      value: function slideUpOthers(el, togglers) {
        for (var i = 0; i < togglers.length; i++) {
          if (togglers[i] !== el) {
            if (togglers[i].classList.contains("".concat(this.className, "__toggle--active"))) {
              this.slideContentUp(togglers[i]);
            }
          }
        }
      }
      /**
       * Click handler for 'togglers'
       * @method
       * @param {HTMLElement[]} togglers - List of 'toggler' elements.
       */

    }, {
      key: "handleToggle",
      value: function handleToggle(togglers) {
        var _this5 = this;

        return function (e) {
          e.preventDefault();

          if (e.target.classList.contains("".concat(_this5.className, "__toggle--active"))) {
            _this5.slideContentUp(e.target);
          } else {
            _this5.slideContentDown(e.target);

            _this5.slideUpOthers(e.target, togglers);
          }
        };
      }
      /**
       * Initialise accordion behavior
       * @method
       */

    }, {
      key: "init",
      value: function init() {
        var _this6 = this;

        ready(function () {
          if (window.location.hash) {
            _this6.hash = window.location.hash;
          } // Scroll to hash (param string) selected accordion


          if (_this6.hash && _this6.hash !== '') {
            var hashSelectedContent = document.querySelector("".concat(_this6.hash, ".").concat(_this6.className, "__content"));

            if (hashSelectedContent) {
              // Only apply classes on load when linking directly to an accordion item.
              var hashSelected = accordion.getPrevSibling(hashSelectedContent, ".".concat(_this6.className, "__toggle"));

              _this6.slideContentDown(hashSelected); // Scroll to top of selected item.


              window.scrollTo(0, hashSelected.getBoundingClientRect().top);
            }
          }

          var accordions = document.querySelectorAll(".".concat(_this6.className));
          accordions.forEach(function (el) {
            var togglers = el.querySelectorAll(".".concat(_this6.className, "__toggle"));
            togglers.forEach(function (el) {
              el.addEventListener('click', _this6.handleToggle(togglers));
            });
          });
        });
      }
    }], [{
      key: "getNextSibling",

      /**
       * Method to replace jQuery's .next() method.
       * See: https://gomakethings.com/finding-the-next-and-previous-sibling-elements-that-match-a-selector-with-vanilla-js/
       * @static
       * @param {HTMLElement} el - HTML element.
       * @param {String} selector - CSS selector string.
       */
      value: function getNextSibling(el, selector) {
        // Get the next sibling element
        var sibling = el.nextElementSibling; // If there's no selector, return the first sibling

        if (!selector) {
          return sibling;
        } // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop


        while (sibling) {
          if (sibling.matches(selector)) {
            return sibling;
          }

          sibling = sibling.nextElementSibling;
        }
      }
      /**
       * Method to get previous sibling element.
       * @static
       * @param {HTMLElement} el - HTML element.
       * @param {String} selector - CSS selector string.
       */

    }, {
      key: "getPrevSibling",
      value: function getPrevSibling(el, selector) {
        // Get the next sibling element
        var sibling = el.previousElementSibling; // If there's no selector, return the first sibling

        if (!selector) {
          return sibling;
        } // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop


        while (sibling) {
          if (sibling.matches(selector)) {
            return sibling;
          }

          sibling = sibling.previousElementSibling;
        }
      }
    }]);

    return accordion;
  }();
  /**
   * Equaliser script extracted and modified from Equalizer
   * (https://github.com/skrajewski/Equalizer).
   * A simple way to keep elements at equal height!
   * 
   */


  var gridMenuEqualiser = function () {
    /**
     * Initial equalizer
     *
     * @param {(String|NodeList)} [blocks="grid-menu--equalised"] - selector
     * string or list of DOM nodes.
     * @constructor
     */
    function gridMenuEqualiser(blocks) {
      if (!blocks) {
        blocks = ".grid-menu--equalised";
      }

      if (!(this instanceof gridMenuEqualiser)) {
        return new gridMenuEqualiser(blocks);
      }

      if (typeof blocks === "string") {
        this.blocks = document.querySelectorAll(blocks);
        return;
      }

      this.blocks = blocks;
    }
    /**
     * Recalculate height of blocks
     */


    gridMenuEqualiser.prototype.align = function () {
      var maxHeight = 0,
          max = this.blocks.length,
          i;

      for (i = 0; i < max; i++) {
        this.blocks[i].style.minHeight = "";
        maxHeight = Math.max(maxHeight, this.blocks[i].clientHeight);
      }

      for (i = 0; i < max; i++) {
        this.blocks[i].style.minHeight = maxHeight + "px";
      }
    };

    return gridMenuEqualiser;
  }();

  exports.accordion = accordion;
  exports.gridMenuEqualiser = gridMenuEqualiser;
  exports.siteHeaderNavigation = MainNavigation;
  return exports;
}({});