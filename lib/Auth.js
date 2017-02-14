'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTokenPrefix = exports.setTokenPrefix = exports.setRefreshTokenName = exports.setTokenName = exports.Check = exports.Auth = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _redux = require('react-isomorphic-render/redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenName = 'token';
var refreshTokenName = 'refreshToken';
var tokenPrefix = 'Bearer ';

var Auth = exports.Auth = {
    setToken: function setToken(token) {
        _reactCookie2.default.save(tokenName, token);
    },
    setRefreshToken: function setRefreshToken(refreshToken) {
        _reactCookie2.default.save(refreshTokenName, refreshToken);
    },
    getToken: function getToken() {
        return _reactCookie2.default.load(tokenName);
    },
    getRefreshToken: function getRefreshToken() {
        return _reactCookie2.default.load(refreshTokenName) || false;
    },
    isAuthenticated: function isAuthenticated() {
        return this.getToken() ? true : false;
    },
    logout: function logout() {
        _reactCookie2.default.remove(tokenName);
        _reactCookie2.default.remove(refreshTokenName);
    }
};

var Check = exports.Check = function Check(_ref) {
    var _ref$roles = _ref.roles,
        roles = _ref$roles === undefined ? [] : _ref$roles,
        _ref$denyRoles = _ref.denyRoles,
        denyRoles = _ref$denyRoles === undefined ? [] : _ref$denyRoles,
        cb = _ref.cb,
        _ref$anon = _ref.anon,
        anon = _ref$anon === undefined ? false : _ref$anon;
    return function (Component) {
        return (0, _redux.onEnter)(function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3, redirect) {
                var getState = _ref3.getState;

                var _getState, user, hasRole, i, role, _i, _i2;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _getState = getState(), user = _getState.authentication.user;

                                if (!(Auth.isAuthenticated() && user)) {
                                    _context.next = 32;
                                    break;
                                }

                                hasRole = false;
                                _context.t0 = _regenerator2.default.keys(user.roles);

                            case 4:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 23;
                                    break;
                                }

                                i = _context.t1.value;
                                role = user.roles[i];
                                _context.t2 = _regenerator2.default.keys(denyRoles);

                            case 8:
                                if ((_context.t3 = _context.t2()).done) {
                                    _context.next = 20;
                                    break;
                                }

                                _i = _context.t3.value;

                                if (!(denyRoles.hasOwnProperty(_i) && role == denyRoles[_i])) {
                                    _context.next = 18;
                                    break;
                                }

                                if (!cb) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.next = 14;
                                return cb({ getState: getState, redirect: redirect });

                            case 14:
                                _context.next = 17;
                                break;

                            case 16:
                                redirect('/');

                            case 17:
                                return _context.abrupt('return');

                            case 18:
                                _context.next = 8;
                                break;

                            case 20:
                                for (_i2 in roles) {
                                    if (roles.hasOwnProperty(_i2) && role == roles[_i2]) {
                                        hasRole = true;
                                    }
                                }
                                _context.next = 4;
                                break;

                            case 23:
                                if (hasRole) {
                                    _context.next = 30;
                                    break;
                                }

                                if (!cb) {
                                    _context.next = 29;
                                    break;
                                }

                                _context.next = 27;
                                return cb({ getState: getState, redirect: redirect });

                            case 27:
                                _context.next = 30;
                                break;

                            case 29:
                                redirect('/');

                            case 30:
                                _context.next = 39;
                                break;

                            case 32:
                                if (anon) {
                                    _context.next = 39;
                                    break;
                                }

                                if (!cb) {
                                    _context.next = 38;
                                    break;
                                }

                                _context.next = 36;
                                return cb({ getState: getState, redirect: redirect });

                            case 36:
                                _context.next = 39;
                                break;

                            case 38:
                                redirect('/');

                            case 39:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x, _x2) {
                return _ref2.apply(this, arguments);
            };
        }())(Component);
    };
};

var setTokenName = exports.setTokenName = function setTokenName(name) {
    tokenName = name;
};
var setRefreshTokenName = exports.setRefreshTokenName = function setRefreshTokenName(name) {
    refreshTokenName = name;
};
var setTokenPrefix = exports.setTokenPrefix = function setTokenPrefix(prefix) {
    tokenPrefix = prefix;
};
var getTokenPrefix = exports.getTokenPrefix = function getTokenPrefix() {
    return tokenPrefix;
};