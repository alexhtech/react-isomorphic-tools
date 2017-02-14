'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setBaseUrl = exports.fetchData = exports.redux = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Auth = require('./Auth');

require('isomorphic-fetch');

require('es6-promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = void 0;

var Fetcher = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            params = _ref2.params,
            _ref2$type = _ref2.type,
            type = _ref2$type === undefined ? null : _ref2$type,
            _ref2$base_url = _ref2.base_url,
            base_url = _ref2$base_url === undefined ? BASE_URL : _ref2$base_url;

        var headers_data, body, i, query, name, headers, data, error, refreshToken, refresh, response, token, _refreshToken, _data, _response, _data2, _data3, _response2;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        headers_data = {};
                        body = {};

                        if (!(method == 'GET' || method == 'DELETE')) {
                            _context.next = 17;
                            break;
                        }

                        i = 0;
                        query = '';
                        _context.t0 = _regenerator2.default.keys(params);

                    case 6:
                        if ((_context.t1 = _context.t0()).done) {
                            _context.next = 15;
                            break;
                        }

                        name = _context.t1.value;

                        if (!params.hasOwnProperty(name)) {
                            _context.next = 13;
                            break;
                        }

                        if (params[name]) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt('continue', 6);

                    case 11:
                        query += '' + (i > 0 ? '&' : '?') + name + '=' + params[name];
                        i++;

                    case 13:
                        _context.next = 6;
                        break;

                    case 15:
                        url += query;
                        params = undefined;

                    case 17:
                        _context.t2 = type;
                        _context.next = _context.t2 === 'form-data' ? 20 : 22;
                        break;

                    case 20:
                        body = params;
                        return _context.abrupt('break', 24);

                    case 22:
                        headers_data = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        };
                        body = (0, _stringify2.default)(params);

                    case 24:
                        headers = new Headers(headers_data);


                        if (_Auth.Auth.isAuthenticated()) {
                            headers.append('Authorization', '' + (0, _Auth.getTokenPrefix)() + _Auth.Auth.getToken());
                        }

                        _context.prev = 26;
                        _context.next = 29;
                        return fetch('' + base_url + url, { method: method, headers: headers, body: body, mode: 'cors' });

                    case 29:
                        data = _context.sent;

                        if (!(data.status >= 400)) {
                            _context.next = 81;
                            break;
                        }

                        _context.next = 33;
                        return data.json();

                    case 33:
                        error = _context.sent;

                        if (!(data.status == 401 && _Auth.Auth.isAuthenticated())) {
                            _context.next = 80;
                            break;
                        }

                        refreshToken = _Auth.Auth.getRefreshToken();

                        if (!refreshToken) {
                            _context.next = 69;
                            break;
                        }

                        _context.next = 39;
                        return fetch(base_url + '/token/refresh', { method: 'POST', body: (0, _stringify2.default)({ refreshToken: _refreshToken }) });

                    case 39:
                        refresh = _context.sent;
                        _context.next = 42;
                        return refresh.json();

                    case 42:
                        response = _context.sent;
                        token = response.token, _refreshToken = response.refreshToken;

                        if (!(refresh.status == 401)) {
                            _context.next = 58;
                            break;
                        }

                        _Auth.Auth.logout();
                        headers.delete('Authorization');
                        _context.next = 49;
                        return fetch('' + base_url + url, { method: method, headers: headers, body: body, mode: 'cors' });

                    case 49:
                        _data = _context.sent;
                        _context.next = 52;
                        return _data.json();

                    case 52:
                        _response = _context.sent;

                        if (!(_data.status == 401)) {
                            _context.next = 55;
                            break;
                        }

                        throw _response;

                    case 55:
                        return _context.abrupt('return', _response);

                    case 58:
                        _Auth.Auth.setToken(token);
                        _Auth.Auth.setRefreshToken(_refreshToken);
                        headers.set('Authorization', 'Bearer ' + _Auth.Auth.getToken());
                        _context.next = 63;
                        return fetch('' + base_url + url, { method: method, headers: headers, body: body, mode: 'cors' });

                    case 63:
                        _data2 = _context.sent;
                        _context.next = 66;
                        return _data2.json();

                    case 66:
                        return _context.abrupt('return', _context.sent);

                    case 67:
                        _context.next = 80;
                        break;

                    case 69:
                        _Auth.Auth.logout();
                        headers.delete('Authorization');
                        _context.next = 73;
                        return fetch('' + base_url + url, { method: method, headers: headers, body: body, mode: 'cors' });

                    case 73:
                        _data3 = _context.sent;
                        _context.next = 76;
                        return _data3.json();

                    case 76:
                        _response2 = _context.sent;

                        if (!(_data3.status == 401)) {
                            _context.next = 79;
                            break;
                        }

                        throw _response2;

                    case 79:
                        return _context.abrupt('return', _response2);

                    case 80:
                        throw error;

                    case 81:
                        _context.next = 83;
                        return data.json();

                    case 83:
                        return _context.abrupt('return', _context.sent);

                    case 86:
                        _context.prev = 86;
                        _context.t3 = _context['catch'](26);

                        console.warn('apiCall [error] - ' + method + ' ' + base_url + url + ' -', _context.t3, '- params ' + params);
                        throw _context.t3;

                    case 90:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[26, 86]]);
    }));

    return function Fetcher(_x) {
        return _ref.apply(this, arguments);
    };
}();

var redux = exports.redux = function redux(url, key) {
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dispatch) {
            var response;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            dispatch({
                                type: '@FETCH_DATA/REQUEST',
                                payload: {
                                    key: key,
                                    data: {
                                        response: null,
                                        request: {
                                            url: url,
                                            method: method,
                                            options: params
                                        }
                                    }
                                }
                            });
                            _context2.next = 4;
                            return Fetcher(url, method, params);

                        case 4:
                            response = _context2.sent;

                            dispatch({
                                type: '@FETCH_DATA/SUCCESS',
                                payload: {
                                    key: key,
                                    data: {
                                        response: response,
                                        request: {
                                            url: url,
                                            method: method,
                                            options: params
                                        }
                                    }
                                }
                            });
                            return _context2.abrupt('return', response);

                        case 9:
                            _context2.prev = 9;
                            _context2.t0 = _context2['catch'](0);

                            dispatch({
                                type: '@FETCH_DATA/ERROR',
                                payload: {
                                    key: key,
                                    error: _context2.t0
                                }
                            });
                            throw _context2.t0;

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 9]]);
        }));

        return function (_x6) {
            return _ref3.apply(this, arguments);
        };
    }();
};

var fetchData = exports.fetchData = Fetcher;
var setBaseUrl = exports.setBaseUrl = function setBaseUrl(url) {
    BASE_URL = url;
};