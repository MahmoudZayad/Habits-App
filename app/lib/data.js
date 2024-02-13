"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
exports.getHabitResults = exports.getHabits = exports.getUser = void 0;
var postgres_1 = require("@vercel/postgres");
var cache_1 = require("next/cache");
// Use user email to grab the user return user row
function getUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM users WHERE email = ", ""], ["SELECT * FROM users WHERE email = ", ""])), email)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user.rows[0]];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch user.', error_1);
                    throw new Error('Failed to fetch user.');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
// Use user id to grab all habits for that user
function getHabits(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, habits, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, cache_1.unstable_noStore)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, postgres_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT * FROM habits WHERE user_id = ", ""], ["SELECT * FROM habits WHERE user_id = ", ""])), userId)];
                case 2:
                    data = _a.sent();
                    habits = data.rows;
                    return [2 /*return*/, habits];
                case 3:
                    error_2 = _a.sent();
                    console.error('Database error, failed fetching habits.', error_2);
                    throw new Error('Failed to fetch habits.');
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getHabits = getHabits;
// Use habit_ids to grab all habit results for each habit
function getHabitResults(habits) {
    return __awaiter(this, void 0, void 0, function () {
        var data, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, cache_1.unstable_noStore)();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(habits.map(function (habitId) { return __awaiter(_this, void 0, void 0, function () {
                            var habitResults;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, postgres_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                SELECT * FROM habit_results WHERE habit_id = ", "\n              "], ["\n                SELECT * FROM habit_results WHERE habit_id = ", "\n              "])), habitId)];
                                    case 1:
                                        habitResults = _a.sent();
                                        return [2 /*return*/, habitResults.rows];
                                }
                            });
                        }); }))];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_3 = _a.sent();
                    console.error('Database error, failed fetching habit results.', error_3);
                    throw new Error('Failed to fetch habit results.');
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getHabitResults = getHabitResults;
function printUserHabitsAndResults(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, habits, habitResults, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getUser(userId)];
                case 1:
                    user = _a.sent();
                    console.log('User:', user);
                    return [4 /*yield*/, getHabits(userId)];
                case 2:
                    habits = _a.sent();
                    console.log('Habits:', habits);
                    return [4 /*yield*/, getHabitResults(habits.map(function (habit) { return habit.id; }))];
                case 3:
                    habitResults = _a.sent();
                    console.log('Habit Results:', habitResults);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = printUserHabitsAndResults;
var templateObject_1, templateObject_2, templateObject_3;
