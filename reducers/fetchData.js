'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case '@FETCH_DATA/REQUEST':
            return (0, _extends6.default)({}, state, (0, _defineProperty3.default)({}, action.payload.key, (0, _extends6.default)({}, state[action.payload.key], {
                _request: action.payload.data.request,
                isFetching: true,
                isFetched: false,
                error: false
            })));
        case '@FETCH_DATA/SUCCESS':
            return (0, _extends6.default)({}, state, (0, _defineProperty3.default)({}, action.payload.key, (0, _extends6.default)({}, action.payload.data, {
                isFetched: true,
                isFetching: false,
                error: false,
                _request: undefined
            })));
        case '@FETCH_DATA/ERROR':
            return (0, _extends6.default)({}, state, (0, _defineProperty3.default)({}, action.payload.key, (0, _extends6.default)({}, state[action.payload.key], {
                error: action.payload.error,
                isFetching: false,
                isFetched: false
            })));
        default:
            return state;
    }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];