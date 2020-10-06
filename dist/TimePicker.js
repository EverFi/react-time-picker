"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _makeEventProps = _interopRequireDefault(require("make-event-props"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _TimeInput = _interopRequireDefault(require("./TimeInput"));

var _propTypes2 = require("./shared/propTypes");

var _utils = require("./shared/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allViews = ['hour', 'minute', 'second'];
var baseClassName = 'react-time-picker';
var outsideActionEvents = ['mousedown', 'focusin', 'touchstart'];

var TimePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TimePicker, _PureComponent);

  function TimePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onOutsideAction", function (event) {
      if (_this.wrapper && !_this.wrapper.contains(event.target)) {
        _this.closeClock();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      var closeClock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.setState({
        isOpen: !closeClock
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onFocus = _this$props.onFocus;

      if (onFocus) {
        onFocus(event);
      } // Internet Explorer still fires onFocus on disabled elements


      if (disabled) {
        return;
      }

      if (event.target.name) {
        _this.setState({
          focusedElement: event.target.name
        });

        if (event.target.name === 'amPm') {
          _this.closeClock();
        } else {
          _this.openClock();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openClock", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeClock", function () {
      _this.setState(function (prevState) {
        if (!prevState.isOpen) {
          return null;
        }

        return {
          isOpen: false
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleClock", function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopPropagation", function (event) {
      return event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      return _this.onChange(null);
    });

    return _this;
  }

  _createClass(TimePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleOutsideActionListeners();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isOpen = this.state.isOpen;
      var _this$props2 = this.props,
          onClockClose = _this$props2.onClockClose,
          onClockOpen = _this$props2.onClockOpen;

      if (isOpen !== prevState.isOpen) {
        this.handleOutsideActionListeners();
        (0, _utils.callIfDefined)(isOpen ? onClockOpen : onClockClose);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleOutsideActionListeners(false);
    }
  }, {
    key: "handleOutsideActionListeners",
    value: function handleOutsideActionListeners(shouldListen) {
      var _this2 = this;

      var isOpen = this.state.isOpen;
      var shouldListenWithFallback = typeof shouldListen !== 'undefined' ? shouldListen : isOpen;
      var fnName = shouldListenWithFallback ? 'addEventListener' : 'removeEventListener';
      outsideActionEvents.forEach(function (eventName) {
        return document[fnName](eventName, _this2.onOutsideAction);
      });
    }
  }, {
    key: "renderInputs",
    value: function renderInputs() {
      var _this$props3 = this.props,
          amPmAriaLabel = _this$props3.amPmAriaLabel,
          autoFocus = _this$props3.autoFocus,
          clearAriaLabel = _this$props3.clearAriaLabel,
          clearIcon = _this$props3.clearIcon,
          clockAriaLabel = _this$props3.clockAriaLabel,
          clockIcon = _this$props3.clockIcon,
          disableClock = _this$props3.disableClock,
          disabled = _this$props3.disabled,
          format = _this$props3.format,
          hourAriaLabel = _this$props3.hourAriaLabel,
          hourPlaceholder = _this$props3.hourPlaceholder,
          locale = _this$props3.locale,
          maxTime = _this$props3.maxTime,
          minTime = _this$props3.minTime,
          minuteAriaLabel = _this$props3.minuteAriaLabel,
          minutePlaceholder = _this$props3.minutePlaceholder,
          name = _this$props3.name,
          nativeInputAriaLabel = _this$props3.nativeInputAriaLabel,
          required = _this$props3.required,
          secondAriaLabel = _this$props3.secondAriaLabel,
          secondPlaceholder = _this$props3.secondPlaceholder;
      var _this$state = this.state,
          focusedElement = _this$state.focusedElement,
          isOpen = _this$state.isOpen;

      var _this$props4 = this.props,
          clockClassName = _this$props4.clockClassName,
          timePickerClassName = _this$props4.className,
          maxDetail = _this$props4.maxDetail,
          onChange = _this$props4.onChange,
          value = _this$props4.value,
          clockProps = _objectWithoutProperties(_this$props4, ["clockClassName", "className", "maxDetail", "onChange", "value"]);

      var _concat = [].concat(value),
          _concat2 = _slicedToArray(_concat, 1),
          valueFrom = _concat2[0];

      var ariaLabelProps = {
        amPmAriaLabel: amPmAriaLabel,
        hourAriaLabel: hourAriaLabel,
        minuteAriaLabel: minuteAriaLabel,
        nativeInputAriaLabel: nativeInputAriaLabel,
        secondAriaLabel: secondAriaLabel
      };
      var placeholderProps = {
        hourPlaceholder: hourPlaceholder,
        minutePlaceholder: minutePlaceholder,
        secondPlaceholder: secondPlaceholder
      };
      return _react["default"].createElement("div", {
        className: "".concat(baseClassName, "__wrapper")
      }, _react["default"].createElement(_TimeInput["default"], _extends({}, ariaLabelProps, placeholderProps, {
        autoFocus: autoFocus,
        className: "".concat(baseClassName, "__inputGroup"),
        clockClassName: clockClassName,
        clockProps: clockProps,
        disableClock: disableClock,
        disabled: disabled,
        focusedElement: focusedElement,
        format: format,
        isClockOpen: isOpen,
        locale: locale,
        maxDetail: maxDetail,
        maxTime: maxTime,
        minTime: minTime,
        name: name,
        onChange: this.onChange,
        placeholder: this.placeholder,
        required: required,
        value: valueFrom
      })), clearIcon !== null && _react["default"].createElement("button", {
        "aria-label": clearAriaLabel,
        className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onClick: this.clear,
        onFocus: this.stopPropagation,
        type: "button"
      }, clearIcon), clockIcon !== null && !disableClock && _react["default"].createElement("button", {
        "aria-label": clockAriaLabel,
        className: "".concat(baseClassName, "__clock-button ").concat(baseClassName, "__button"),
        disabled: disabled,
        onClick: this.toggleClock,
        onFocus: this.stopPropagation,
        type: "button"
      }, clockIcon));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          className = _this$props5.className,
          disabled = _this$props5.disabled;
      var isOpen = this.state.isOpen;
      return _react["default"].createElement("div", _extends({
        className: (0, _mergeClassNames["default"])(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? 'open' : 'closed'), "".concat(baseClassName, "--").concat(disabled ? 'disabled' : 'enabled'), className)
      }, this.eventProps, {
        onFocus: this.onFocus,
        ref: function ref(_ref) {
          if (!_ref) {
            return;
          }

          _this3.wrapper = _ref;
        }
      }), this.renderInputs());
    }
  }, {
    key: "eventProps",
    get: function get() {
      return (0, _makeEventProps["default"])(this.props);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isOpen !== prevState.isOpenProps) {
        return {
          isOpen: nextProps.isOpen,
          isOpenProps: nextProps.isOpen
        };
      }

      return null;
    }
  }]);

  return TimePicker;
}(_react.PureComponent);

exports["default"] = TimePicker;
var iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 19,
  height: 19,
  viewBox: '0 0 19 19',
  stroke: 'black',
  strokeWidth: 2
};

var ClockIcon = _react["default"].createElement("svg", _extends({}, iconProps, {
  className: "".concat(baseClassName, "__clock-button__icon ").concat(baseClassName, "__button__icon"),
  fill: "none"
}), _react["default"].createElement("circle", {
  cx: "9.5",
  cy: "9.5",
  r: "7.5"
}), _react["default"].createElement("path", {
  d: "M9.5 4.5 v5 h4"
}));

var ClearIcon = _react["default"].createElement("svg", _extends({}, iconProps, {
  className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon")
}), _react["default"].createElement("line", {
  x1: "4",
  x2: "15",
  y1: "4",
  y2: "15"
}), _react["default"].createElement("line", {
  x1: "15",
  x2: "4",
  y1: "4",
  y2: "15"
}));

TimePicker.defaultProps = {
  clearIcon: ClearIcon,
  clockIcon: ClockIcon,
  isOpen: null,
  maxDetail: 'minute'
};

var isValue = _propTypes["default"].oneOfType([_propTypes2.isTime, _propTypes["default"].instanceOf(Date)]);

TimePicker.propTypes = {
  amPmAriaLabel: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  clearAriaLabel: _propTypes["default"].string,
  clearIcon: _propTypes["default"].node,
  clockAriaLabel: _propTypes["default"].string,
  clockClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  clockIcon: _propTypes["default"].node,
  disableClock: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  format: _propTypes["default"].string,
  hourAriaLabel: _propTypes["default"].string,
  hourPlaceholder: _propTypes["default"].string,
  isOpen: _propTypes["default"].bool,
  locale: _propTypes["default"].string,
  maxDetail: _propTypes["default"].oneOf(allViews),
  maxTime: _propTypes2.isTime,
  minTime: _propTypes2.isTime,
  minuteAriaLabel: _propTypes["default"].string,
  minutePlaceholder: _propTypes["default"].string,
  name: _propTypes["default"].string,
  nativeInputAriaLabel: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onClockClose: _propTypes["default"].func,
  onClockOpen: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  required: _propTypes["default"].bool,
  secondAriaLabel: _propTypes["default"].string,
  secondPlaceholder: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([isValue, _propTypes["default"].arrayOf(isValue)])
};
(0, _reactLifecyclesCompat.polyfill)(TimePicker);