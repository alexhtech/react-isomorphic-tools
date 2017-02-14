'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return (0, _extends3.default)({}, state, { user: action.payload });
        case 'LOGOUT_SUCCESS':
            return (0, _extends3.default)({}, state, { user: null });
        case 'ACCOUNT_SUCCESS':
            return (0, _extends3.default)({}, state, { user: action.payload });
        default:
            return state;
    }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];