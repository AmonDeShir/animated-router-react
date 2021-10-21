"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var navigation_context_1 = __importDefault(require("./reducer/context/navigation-context"));
var route_404_1 = __importDefault(require("./route-404/route-404"));
var Navigation = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(navigation_context_1.default, { children: [(0, jsx_runtime_1.jsx)(route_404_1.default, {}, void 0), children] }, void 0));
};
exports.default = Navigation;
