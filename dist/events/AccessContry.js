var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Chart from "../Chart.js";
import EventBase from "./EventBase.js";
var AccessContry = /** @class */ (function (_super) {
    __extends(AccessContry, _super);
    function AccessContry(chart_id, plataformToken) {
        var _this = _super.call(this, chart_id, plataformToken) || this;
        _this.callback = _this.callback.bind(_this);
        return _this;
    }
    AccessContry.prototype.createCookie = function () {
        var expire = new Date();
        expire.setTime(expire.getTime() + 24 * 60 * 60 * 1000);
        var expires = "expires=" + expire.toUTCString();
        document.cookie = "x08192=true;" + expires + ";path=/";
    };
    AccessContry.prototype.getCookie = function () {
        var name = "x08192=";
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return undefined;
    };
    AccessContry.prototype.contry = function (callback) {
        var ipinfoApiUrl = "https://api.country.is/";
        fetch(ipinfoApiUrl)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var country = data.country;
            callback(country);
        })
            .catch(function () { });
    };
    AccessContry.prototype.getInfos = function (chart, fragment, contry) {
        var access = chart.chart.graphic_values[fragment];
        var count = 1;
        if (access && access.length > 0) {
            access.forEach(function (value) {
                if (String(value[0]) === contry) {
                    count += Number(value[1]);
                }
            });
        }
        return count;
    };
    AccessContry.prototype.callback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.getCookie()) {
                    this.contry(function (contry) { return __awaiter(_this, void 0, void 0, function () {
                        var chart, date, year, fragment, count, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Chart.getChart(this.chart_id, this.plataformToken)];
                                case 1:
                                    chart = _a.sent();
                                    if (!chart) return [3 /*break*/, 3];
                                    date = new Date();
                                    year = date.getFullYear();
                                    fragment = "".concat(year);
                                    count = this.getInfos(chart, fragment, contry);
                                    data = [String(contry), String(count)];
                                    this.createCookie();
                                    return [4 /*yield*/, Chart.setChart(this.chart_id, this.plataformToken, data, fragment, "".concat(contry))];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    AccessContry.prototype.load = function () {
        window.addEventListener("load", this.callback);
    };
    AccessContry.prototype.unload = function () {
        window.removeEventListener("load", this.callback);
    };
    return AccessContry;
}(EventBase));
export default AccessContry;
