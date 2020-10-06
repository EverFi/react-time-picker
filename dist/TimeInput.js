"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _reactFit = _interopRequireDefault(require("react-fit"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _entry = _interopRequireDefault(require("react-clock/dist/entry.nostyle"));

var _dateUtils = require("@wojtekmaj/date-utils");

var _Divider = _interopRequireDefault(require("./Divider"));

var _Hour12Input = _interopRequireDefault(require("./TimeInput/Hour12Input"));

var _Hour24Input = _interopRequireDefault(require("./TimeInput/Hour24Input"));

var _MinuteInput = _interopRequireDefault(require("./TimeInput/MinuteInput"));

var _SecondInput = _interopRequireDefault(require("./TimeInput/SecondInput"));

var _NativeInput = _interopRequireDefault(require("./TimeInput/NativeInput"));

var _AmPm = _interopRequireDefault(require("./TimeInput/AmPm"));

var _dateFormatter = require("./shared/dateFormatter");

var _dates = require("./shared/dates");

var _propTypes2 = require("./shared/propTypes");

var _utils = require("./shared/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var allViews = ['hour', 'minute', 'second'];
var baseClassName = 'react-time-picker';

function hoursAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1 !== date2 // TODO: Compare 11:22:00 and 11:22 properly
  ;
}

function isValidInput(element) {
  return element.tagName === 'INPUT' && element.type === 'number';
}

function findInput(element, property) {
  var nextElement = element;

  do {
    nextElement = nextElement[property];
  } while (nextElement && !isValidInput(nextElement));

  return nextElement;
}

function focus(element) {
  if (element) {
    element.focus();
  }
}

function _renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  var usedFunctions = [];
  var pattern = new RegExp(Object.keys(elementFunctions).map(function (el) {
    return "".concat(el, "+");
  }).join('|'), 'g');
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function (arr, element, index) {
    var divider = element && // eslint-disable-next-line react/no-array-index-key
    _react["default"].createElement(_Divider["default"], {
      key: "separator_".concat(index)
    }, element);

    var res = [].concat(_toConsumableArray(arr), [divider]);
    var currentMatch = matches && matches[index];

    if (currentMatch) {
      var renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find(function (elementFunction) {
        return currentMatch.match(elementFunction);
      })];

      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        res.push(currentMatch);
      } else {
        res.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }

    return res;
  }, []);
}

var TimeInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TimeInput, _PureComponent);

  function TimeInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimeInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimeInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      amPm: null,
      hour: null,
      minute: null,
      second: null
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      if (event.target === event.currentTarget) {
        // Wrapper was directly clicked
        var firstInput = event.target.children[1];
        focus(firstInput);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case _this.divider:
          {
            event.preventDefault();
            var input = event.target;
            var property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
            var nextInput = findInput(input, property);
            focus(nextInput);
            break;
          }

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      var key = event.key,
          input = event.target;
      var isNumberKey = !isNaN(parseInt(key, 10));

      if (!isNumberKey) {
        return;
      }

      var value = input.value;
      var max = input.getAttribute('max');
      /**
       * Given 1, the smallest possible number the user could type by adding another digit is 10.
       * 10 would be a valid value given max = 12, so we won't jump to the next input.
       * However, given 2, smallers possible number would be 20, and thus keeping the focus in
       * this field doesn't make sense.
       */

      if (value * 10 > max || value.length >= max.length) {
        var property = 'nextElementSibling';
        var nextInput = findInput(input, property);
        focus(nextInput);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      switch (name) {
        case 'hour12':
          {
            _this.setState(function (prevState) {
              return {
                hour: value ? (0, _dates.convert12to24)(parseInt(value, 10), prevState.amPm) : null
              };
            }, _this.onChangeExternal);

            break;
          }

        case 'hour24':
          {
            _this.setState({
              hour: value ? parseInt(value, 10) : null
            }, _this.onChangeExternal);

            break;
          }

        default:
          {
            _this.setState(_defineProperty({}, name, value ? parseInt(value, 10) : null), _this.onChangeExternal);
          }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeNative", function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;

      if (!onChange) {
        return;
      }

      var processedValue = function () {
        if (!value) {
          return null;
        }

        return value;
      }();

      onChange(processedValue, false);
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeAmPm", function (event) {
      var value = event.target.value;

      _this.setState({
        amPm: value
      }, _this.onChangeExternal);
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeExternal", function () {
      var onChange = _this.props.onChange;

      if (!onChange) {
        return;
      }

      var formElements = [_this.hour12Input, _this.hour24Input, _this.minuteInput, _this.secondInput, _this.amPmInput].filter(Boolean);
      var formElementsWithoutSelect = formElements.slice(0, -1);
      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });

      if (formElementsWithoutSelect.every(function (formElement) {
        return !formElement.value;
      })) {
        onChange(null, false);
      } else if (formElements.every(function (formElement) {
        return formElement.value && formElement.checkValidity();
      })) {
        var hour = parseInt(values.hour24 || (0, _dates.convert12to24)(values.hour12, values.amPm) || 0, 10);
        var minute = parseInt(values.minute || 0, 10);
        var second = parseInt(values.second || 0, 10);
        var proposedValue = "".concat((0, _utils.padStart)(hour), ":").concat((0, _utils.padStart)(minute), ":").concat((0, _utils.padStart)(second));

        var processedValue = _this.getProcessedValue(proposedValue);

        onChange(processedValue, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "numberSelect", function (value) {
      var focusedElement = _this.props.focusedElement;

      _this.onChange({
        target: {
          name: focusedElement,
          value: value
        }
      });

      var input = _this["".concat(focusedElement, "Input")];

      var nextInput = findInput(input, 'nextElementSibling');

      if (nextInput) {
        focus(nextInput);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderHour", function (currentMatch, index) {
      if (/h/.test(currentMatch)) {
        return _this.renderHour12(currentMatch, index);
      }

      return _this.renderHour24(currentMatch, index);
    });

    _defineProperty(_assertThisInitialized(_this), "renderHour12", function (currentMatch, index) {
      var _this$props = _this.props,
          autoFocus = _this$props.autoFocus,
          hourAriaLabel = _this$props.hourAriaLabel,
          hourPlaceholder = _this$props.hourPlaceholder;
      var _this$state = _this.state,
          amPm = _this$state.amPm,
          hour = _this$state.hour;

      if (currentMatch && currentMatch.length > 2) {
        throw new Error("Unsupported token: ".concat(currentMatch));
      }

      var showLeadingZeros = currentMatch && currentMatch.length === 2;
      return _react["default"].createElement(_Hour12Input["default"], _extends({
        key: "hour12"
      }, _this.commonInputProps, {
        amPm: amPm,
        ariaLabel: hourAriaLabel,
        autoFocus: index === 0 && autoFocus,
        placeholder: hourPlaceholder,
        showLeadingZeros: showLeadingZeros,
        value: hour
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderHour24", function (currentMatch, index) {
      var _this$props2 = _this.props,
          autoFocus = _this$props2.autoFocus,
          hourAriaLabel = _this$props2.hourAriaLabel,
          hourPlaceholder = _this$props2.hourPlaceholder;
      var hour = _this.state.hour;

      if (currentMatch && currentMatch.length > 2) {
        throw new Error("Unsupported token: ".concat(currentMatch));
      }

      var showLeadingZeros = currentMatch && currentMatch.length === 2;
      return _react["default"].createElement(_Hour24Input["default"], _extends({
        key: "hour24"
      }, _this.commonInputProps, {
        ariaLabel: hourAriaLabel,
        autoFocus: index === 0 && autoFocus,
        placeholder: hourPlaceholder,
        showLeadingZeros: showLeadingZeros,
        value: hour
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMinute", function (currentMatch, index) {
      var _this$props3 = _this.props,
          autoFocus = _this$props3.autoFocus,
          minuteAriaLabel = _this$props3.minuteAriaLabel,
          minutePlaceholder = _this$props3.minutePlaceholder;
      var _this$state2 = _this.state,
          hour = _this$state2.hour,
          minute = _this$state2.minute;

      if (currentMatch && currentMatch.length > 2) {
        throw new Error("Unsupported token: ".concat(currentMatch));
      }

      var showLeadingZeros = currentMatch && currentMatch.length === 2;
      return _react["default"].createElement(_MinuteInput["default"], _extends({
        key: "minute"
      }, _this.commonInputProps, {
        ariaLabel: minuteAriaLabel,
        autoFocus: index === 0 && autoFocus,
        hour: hour,
        placeholder: minutePlaceholder,
        showLeadingZeros: showLeadingZeros,
        value: minute
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderSecond", function (currentMatch, index) {
      var _this$props4 = _this.props,
          autoFocus = _this$props4.autoFocus,
          secondAriaLabel = _this$props4.secondAriaLabel,
          secondPlaceholder = _this$props4.secondPlaceholder;
      var _this$state3 = _this.state,
          hour = _this$state3.hour,
          minute = _this$state3.minute,
          second = _this$state3.second;

      if (currentMatch && currentMatch.length > 2) {
        throw new Error("Unsupported token: ".concat(currentMatch));
      }

      var showLeadingZeros = currentMatch ? currentMatch.length === 2 : true;
      return _react["default"].createElement(_SecondInput["default"], _extends({
        key: "second"
      }, _this.commonInputProps, {
        ariaLabel: secondAriaLabel,
        autoFocus: index === 0 && autoFocus,
        hour: hour,
        minute: minute,
        placeholder: secondPlaceholder,
        showLeadingZeros: showLeadingZeros,
        value: second
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderAmPm", function (currentMatch, index) {
      var _this$props5 = _this.props,
          amPmAriaLabel = _this$props5.amPmAriaLabel,
          autoFocus = _this$props5.autoFocus,
          locale = _this$props5.locale;
      var amPm = _this.state.amPm;
      return _react["default"].createElement(_AmPm["default"], _extends({
        key: "ampm"
      }, _this.commonInputProps, {
        ariaLabel: amPmAriaLabel,
        autoFocus: index === 0 && autoFocus,
        locale: locale,
        onChange: _this.onChangeAmPm,
        value: amPm
      }));
    });

    return _this;
  }

  _createClass(TimeInput, [{
    key: "getProcessedValue",

    /**
     * Gets current value in a desired format.
     */
    value: function getProcessedValue(value) {
      var nativeValueParser = this.nativeValueParser;
      return nativeValueParser(value);
    }
    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: "renderCustomInputs",
    value: function renderCustomInputs() {
      var placeholder = this.placeholder;
      var format = this.props.format;
      var elementFunctions = {
        h: this.renderHour,
        H: this.renderHour,
        m: this.renderMinute,
        s: this.renderSecond,
        a: this.renderAmPm
      };
      var allowMultipleInstances = typeof format !== 'undefined';
      return _renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
    }
  }, {
    key: "renderNativeInput",
    value: function renderNativeInput() {
      var _this$props6 = this.props,
          disabled = _this$props6.disabled,
          maxTime = _this$props6.maxTime,
          minTime = _this$props6.minTime,
          name = _this$props6.name,
          nativeInputAriaLabel = _this$props6.nativeInputAriaLabel,
          required = _this$props6.required,
          value = _this$props6.value;
      return _react["default"].createElement(_NativeInput["default"], {
        key: "time",
        ariaLabel: nativeInputAriaLabel,
        disabled: disabled,
        maxTime: maxTime,
        minTime: minTime,
        name: name,
        onChange: this.onChangeNative,
        required: required,
        value: value,
        valueType: this.valueType
      });
    }
  }, {
    key: "renderClock",
    value: function renderClock() {
      var _this$props7 = this.props,
          disableClock = _this$props7.disableClock,
          isClockOpen = _this$props7.isClockOpen;

      if (isClockOpen === null || disableClock) {
        return null;
      }

      var _this$props8 = this.props,
          clockClassName = _this$props8.clockClassName,
          _this$props8$clockPro = _this$props8.clockProps,
          clockProps = _this$props8$clockPro === void 0 ? {} : _this$props8$clockPro,
          focusedElement = _this$props8.focusedElement,
          maxDetail = _this$props8.maxDetail,
          value = _this$props8.value;
      var _this$state4 = this.state,
          hour = _this$state4.hour,
          minute = _this$state4.minute,
          second = _this$state4.second;
      clockProps.renderNumbers = clockProps.renderNumbers && ['second', 'minute'].includes(focusedElement) ? 'minutes' : clockProps.renderNumbers;
      var className = "".concat(baseClassName, "__clock");

      var _concat = [].concat(value),
          _concat2 = _slicedToArray(_concat, 1),
          valueFrom = _concat2[0];

      if (!valueFrom) {
        if (hour) {
          valueFrom = new Date();
          valueFrom.setHours(hour, minute === undefined ? null : minute, second === undefined ? null : second);
        }
      }

      var maxDetailIndex = allViews.indexOf(maxDetail);
      return _react["default"].createElement(_reactFit["default"], {
        spacing: 0
      }, _react["default"].createElement("div", {
        className: (0, _mergeClassNames["default"])(className, "".concat(className, "--").concat(isClockOpen ? 'open' : 'closed'))
      }, _react["default"].createElement(_entry["default"], _extends({
        className: clockClassName,
        numberSelect: this.numberSelect,
        renderMinuteHand: maxDetailIndex > 0,
        renderSecondHand: maxDetailIndex > 1,
        value: valueFrom
      }, clockProps))));
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      /* eslint-disable jsx-a11y/click-events-have-key-events */

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return _react["default"].createElement("div", {
        className: className,
        onClick: this.onClick
      }, this.renderNativeInput(), this.renderCustomInputs(), this.renderClock());
    }
  }, {
    key: "formatTime",
    get: function get() {
      var maxDetail = this.props.maxDetail;
      var options = {
        hour: 'numeric'
      };
      var level = allViews.indexOf(maxDetail);

      if (level >= 1) {
        options.minute = 'numeric';
      }

      if (level >= 2) {
        options.second = 'numeric';
      }

      return (0, _dateFormatter.getFormatter)(options);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "formatNumber",
    get: function get() {
      var options = {
        useGrouping: false
      };
      return (0, _dateFormatter.getFormatter)(options);
    }
  }, {
    key: "valueType",
    get: function get() {
      var maxDetail = this.props.maxDetail;
      return maxDetail;
    }
  }, {
    key: "nativeValueParser",
    get: function get() {
      switch (this.valueType) {
        case 'hour':
        case 'minute':
          return _dateUtils.getHoursMinutes;

        case 'second':
          return _dateUtils.getHoursMinutesSeconds;

        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: "divider",
    get: function get() {
      return this.placeholder.match(/[^0-9a-z]/i)[0];
    }
  }, {
    key: "placeholder",
    get: function get() {
      var _this$props9 = this.props,
          format = _this$props9.format,
          locale = _this$props9.locale;

      if (format) {
        return format;
      }

      var hour24 = 21;
      var hour12 = 9;
      var minute = 13;
      var second = 14;
      var date = new Date(2017, 0, 1, hour24, minute, second);
      return this.formatTime(locale, date).replace(this.formatNumber(locale, hour12), 'h').replace(this.formatNumber(locale, hour24), 'H').replace(this.formatNumber(locale, minute), 'mm').replace(this.formatNumber(locale, second), 'ss').replace(new RegExp((0, _utils.getAmPmLabels)(locale).join('|')), 'a');
    }
  }, {
    key: "commonInputProps",
    get: function get() {
      var _this2 = this;

      var _this$props10 = this.props,
          className = _this$props10.className,
          disabled = _this$props10.disabled,
          isClockOpen = _this$props10.isClockOpen,
          maxTime = _this$props10.maxTime,
          minTime = _this$props10.minTime,
          required = _this$props10.required;
      return {
        className: className,
        disabled: disabled,
        itemRef: function itemRef(ref, name) {
          // Save a reference to each input field
          _this2["".concat(name, "Input")] = ref;
        },
        maxTime: maxTime,
        minTime: minTime,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        placeholder: '--',
        // This is only for showing validity when editing
        required: required || isClockOpen
      };
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextState = {};
      /**
       * If the next value is different from the current one  (with an exception of situation in
       * which values provided are limited by minDate and maxDate so that the dates are the same),
       * get a new one.
       */

      var nextValue = nextProps.value;

      if (hoursAreDifferent(nextValue, prevState.value)) {
        if (nextValue) {
          var _convert24to = (0, _dates.convert24to12)((0, _dateUtils.getHours)(nextValue));

          var _convert24to2 = _slicedToArray(_convert24to, 2);

          nextState.amPm = _convert24to2[1];
          nextState.hour = (0, _dateUtils.getHours)(nextValue);
          nextState.minute = (0, _dateUtils.getMinutes)(nextValue);
          nextState.second = (0, _dateUtils.getSeconds)(nextValue);
        } else {
          nextState.amPm = null;
          nextState.hour = null;
          nextState.minute = null;
          nextState.second = null;
        }

        nextState.value = nextValue;
      }

      return nextState;
    }
  }]);

  return TimeInput;
}(_react.PureComponent);

exports["default"] = TimeInput;
TimeInput.defaultProps = {
  maxDetail: 'minute',
  name: 'time'
};
TimeInput.propTypes = {
  amPmAriaLabel: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool,
  className: _propTypes["default"].string.isRequired,
  clockClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  clockProps: _propTypes["default"].shape({
    renderNumbers: _propTypes["default"].bool
  }),
  disableClock: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  focusedElement: _propTypes["default"].string,
  format: _propTypes["default"].string,
  hourAriaLabel: _propTypes["default"].string,
  hourPlaceholder: _propTypes["default"].string,
  isClockOpen: _propTypes["default"].bool,
  locale: _propTypes["default"].string,
  maxDetail: _propTypes["default"].oneOf(allViews),
  maxTime: _propTypes2.isTime,
  minTime: _propTypes2.isTime,
  minuteAriaLabel: _propTypes["default"].string,
  minutePlaceholder: _propTypes["default"].string,
  name: _propTypes["default"].string,
  nativeInputAriaLabel: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  required: _propTypes["default"].bool,
  secondAriaLabel: _propTypes["default"].string,
  secondPlaceholder: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([_propTypes2.isTime, _propTypes["default"].instanceOf(Date)])
};
(0, _reactLifecyclesCompat.polyfill)(TimeInput);