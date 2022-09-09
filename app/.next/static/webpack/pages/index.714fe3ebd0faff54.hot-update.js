"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var _swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_to_consumable_array.mjs */ \"./node_modules/@swc/helpers/src/_to_consumable_array.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/Creation.module.css */ \"./styles/Creation.module.css\");\n/* harmony import */ var _styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/esm/Button/index.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.tsx\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_material_Radio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Radio */ \"./node_modules/@mui/material/esm/Radio/index.js\");\n/* harmony import */ var _mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/RadioGroup */ \"./node_modules/@mui/material/esm/RadioGroup/index.js\");\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/FormControlLabel */ \"./node_modules/@mui/material/esm/FormControlLabel/index.js\");\n/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/FormControl */ \"./node_modules/@mui/material/esm/FormControl/index.js\");\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction PollForm() {\n    var _this = this;\n    var handleChange = function handleChange(e) {\n        var name = +e.target.name;\n        poll[name] = e.target.value;\n        if (name == poll.length - 1) {\n            setPoll(function(prev) {\n                return (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(prev).concat([\n                    \"\"\n                ]);\n            });\n        }\n    };\n    var handleSubmit = function handleSubmit(e) {\n        e.preventDefault();\n        console.log(poll);\n        // clean data\n        var question = poll[0];\n        var options = poll.slice(1).map(function(element) {\n            return element.trim();\n        });\n        options = options.filter(function(value) {\n            return value !== \"\";\n        });\n        options = options.filter(function(value, index, self) {\n            return self.indexOf(value) === index;\n        });\n        var formString = \"question=\".concat(question, \"&options=\").concat(JSON.stringify(options), \"&duplication=\").concat(duplication.current);\n        console.log(formString);\n        axios__WEBPACK_IMPORTED_MODULE_4___default().post(\"http://localhost:8000/create_poll\", formString).then(function(response) {\n            console.log(\"statusCode: \".concat(response.status));\n            var id = response.data;\n            console.log(id);\n            router.push(\"/vote/\" + id);\n        }).catch(function(error) {\n            console.error(error);\n        });\n    };\n    var OptionInput = function OptionInput(param) {\n        var id = param.id;\n        // possibility of less rendering through memo, useCallback\n        // console.log(\"id: \" + id + \" rendered\");\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n            type: \"text\",\n            placeholder: \"Enter Option\",\n            className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().optionInput),\n            onChange: handleChange,\n            name: id,\n            defaultValue: poll[+id]\n        }, void 0, false, {\n            fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n            lineNumber: 63,\n            columnNumber: 7\n        }, this);\n    };\n    var QuestionInput = function QuestionInput() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n            autoFocus: true,\n            type: \"text\",\n            placeholder: \"Type your question here\",\n            className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().questionInput),\n            name: \"0\",\n            onChange: handleChange,\n            defaultValue: poll[0]\n        }, void 0, false, {\n            fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n            lineNumber: 76,\n            columnNumber: 7\n        }, this);\n    };\n    _s();\n    var ref = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(react__WEBPACK_IMPORTED_MODULE_2___default().useState([\n        \"\",\n        \"\",\n        \"\",\n        \"\"\n    ]), 2), poll = ref[0], setPoll = ref[1];\n    var duplication = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(\"none\");\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().poll),\n        autoComplete: \"off\",\n        onSubmit: handleSubmit,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().redMargin)\n            }, void 0, false, {\n                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                lineNumber: 89,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(QuestionInput, {}, void 0, false, {\n                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: poll.slice(1).map(function(value, index) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(OptionInput, {\n                        id: (index + 1).toString()\n                    }, index + 1, false, {\n                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                        lineNumber: 93,\n                        columnNumber: 11\n                    }, _this);\n                })\n            }, void 0, false, {\n                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().pollCreate),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                className: (_styles_Creation_module_css__WEBPACK_IMPORTED_MODULE_6___default().radioLabel),\n                                children: \"Duplication check\"\n                            }, void 0, false, {\n                                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                                lineNumber: 99,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                defaultValue: \"none\",\n                                onChange: function(e) {\n                                    return duplication.current = e.target.value;\n                                },\n                                name: \"radio-buttons-group\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                        value: \"none\",\n                                        control: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, void 0, void 0),\n                                        label: \"None\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                                        lineNumber: 105,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                        value: \"cookie\",\n                                        control: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, void 0, void 0),\n                                        label: \"Browser\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                                        lineNumber: 106,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                        value: \"ip\",\n                                        control: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, void 0, void 0),\n                                        label: \"IP Address\"\n                                    }, void 0, false, {\n                                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                                        lineNumber: 111,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                                lineNumber: 100,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                        lineNumber: 98,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                        variant: \"contained\",\n                        type: \"submit\",\n                        size: \"large\",\n                        children: \"Create Poll\"\n                    }, void 0, false, {\n                        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                        lineNumber: 118,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n                lineNumber: 97,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n        lineNumber: 88,\n        columnNumber: 5\n    }, this);\n}\n_s(PollForm, \"5a29LubN3j7d6mMD+6ODDeqFkX4=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = PollForm;\nvar Creation = function() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(PollForm, {}, void 0, false, {\n            fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n            lineNumber: 128,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/home/stpkey/Portfolio/PREFPOLL/prefpoll/app/pages/index.tsx\",\n        lineNumber: 127,\n        columnNumber: 5\n    }, _this);\n};\n_c1 = Creation;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Creation);\nvar _c, _c1;\n$RefreshReg$(_c, \"PollForm\");\n$RefreshReg$(_c1, \"Creation\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQUV3QztBQUVXO0FBQ3pCO0FBQ2dCO0FBQ0E7QUFDaEI7QUFDYztBQUNVO0FBQ1k7QUFDVjtBQUdwRCxTQUFTVSxRQUFRLEdBQUc7O1FBSVRDLFlBQVksR0FBckIsU0FBU0EsWUFBWSxDQUFDQyxDQUFzQyxFQUFFO1FBQzVELElBQU1DLElBQUksR0FBVyxDQUFDRCxDQUFDLENBQUNFLE1BQU0sQ0FBQ0QsSUFBSTtRQUNuQ0UsSUFBSSxDQUFDRixJQUFJLENBQUMsR0FBR0QsQ0FBQyxDQUFDRSxNQUFNLENBQUNFLEtBQUssQ0FBQztRQUM1QixJQUFJSCxJQUFJLElBQUlFLElBQUksQ0FBQ0UsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQkMsT0FBTyxDQUFDLFNBQUNDLElBQUk7dUJBQUsscUZBQUlBLElBQUksQ0FBSkEsUUFBSjtvQkFBVSxFQUFFO2lCQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7UUFFUUMsWUFBWSxHQUFyQixTQUFTQSxZQUFZLENBQUNSLENBQXFDLEVBQUU7UUFDM0RBLENBQUMsQ0FBQ1MsY0FBYyxFQUFFLENBQUM7UUFDbkJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUixJQUFJLENBQUMsQ0FBQztRQUNsQixhQUFhO1FBRWIsSUFBTVMsUUFBUSxHQUFHVCxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUlVLE9BQU8sR0FBR1YsSUFBSSxDQUFDVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxTQUFDQyxPQUFPO21CQUFLQSxPQUFPLENBQUNDLElBQUksRUFBRTtTQUFBLENBQUM7UUFDNURKLE9BQU8sR0FBR0EsT0FBTyxDQUFDSyxNQUFNLENBQUMsU0FBQ2QsS0FBSyxFQUFLO1lBQ2xDLE9BQU9BLEtBQUssS0FBSyxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO1FBRUhTLE9BQU8sR0FBR0EsT0FBTyxDQUFDSyxNQUFNLENBQUMsU0FBQ2QsS0FBSyxFQUFFZSxLQUFLLEVBQUVDLElBQUksRUFBSztZQUMvQyxPQUFPQSxJQUFJLENBQUNDLE9BQU8sQ0FBQ2pCLEtBQUssQ0FBQyxLQUFLZSxLQUFLLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsSUFBSUcsVUFBVSxHQUFHLFdBQVUsQ0FBc0JDLE1BRWhELENBRjRCWCxRQUFRLEVBQUMsV0FBUyxDQUU3QyxDQUFlWSxNQUFtQixDQUZhRCxJQUFJLENBQUNFLFNBQVMsQ0FDN0RaLE9BQU8sQ0FDUixFQUFDLGVBQWEsQ0FBc0IsUUFBcEJXLFdBQVcsQ0FBQ0UsT0FBTyxDQUFFO1FBQ3RDaEIsT0FBTyxDQUFDQyxHQUFHLENBQUNXLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCN0IsaURBQ08sQ0FBQyxtQ0FBbUMsRUFBRTZCLFVBQVUsQ0FBQyxDQUNyRE0sSUFBSSxDQUFDLFNBQUNDLFFBQVEsRUFBSztZQUNsQm5CLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGNBQWEsQ0FBa0IsT0FBaEJrQixRQUFRLENBQUNDLE1BQU0sQ0FBRSxDQUFDLENBQUM7WUFDOUMsSUFBSUMsRUFBRSxHQUFHRixRQUFRLENBQUNHLElBQUk7WUFDdEJ0QixPQUFPLENBQUNDLEdBQUcsQ0FBQ29CLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCRSxNQUFNLENBQUNDLElBQUksQ0FBQyxRQUFRLEdBQUdILEVBQUUsQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FDREksS0FBSyxDQUFDLFNBQUNDLEtBQUssRUFBSztZQUNoQjFCLE9BQU8sQ0FBQzBCLEtBQUssQ0FBQ0EsS0FBSyxDQUFDLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ047UUFDUUMsV0FBVyxHQUFwQixTQUFTQSxXQUFXLENBQUMsS0FBc0IsRUFBRTtZQUF4QixFQUFJLEdBQUosS0FBc0IsQ0FBcEJOLEVBQUU7UUFDdkIsMERBQTBEO1FBQzFELDBDQUEwQztRQUMxQyxxQkFDRSw4REFBQ08sT0FBSztZQUNKQyxJQUFJLEVBQUMsTUFBTTtZQUNYQyxXQUFXLEVBQUMsY0FBYztZQUMxQkMsU0FBUyxFQUFFcEQsZ0ZBQWtCO1lBQzdCc0QsUUFBUSxFQUFFNUMsWUFBWTtZQUN0QkUsSUFBSSxFQUFFOEIsRUFBRTtZQUNSYSxZQUFZLEVBQUV6QyxJQUFJLENBQUMsQ0FBQzRCLEVBQUUsQ0FBQzs7Ozs7Z0JBRXZCLENBQ0Y7S0FDSDtRQUNRYyxhQUFhLEdBQXRCLFNBQVNBLGFBQWEsR0FBRztRQUN2QixxQkFDRSw4REFBQ1AsT0FBSztZQUNKUSxTQUFTO1lBQ1RQLElBQUksRUFBQyxNQUFNO1lBQ1hDLFdBQVcsRUFBQyx5QkFBeUI7WUFDckNDLFNBQVMsRUFBRXBELGtGQUFvQjtZQUMvQlksSUFBSSxFQUFDLEdBQUc7WUFDUjBDLFFBQVEsRUFBRTVDLFlBQVk7WUFDdEI2QyxZQUFZLEVBQUV6QyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7OztnQkFDckIsQ0FDRjtLQUNIOztJQXJFRCxJQUF3QmIsR0FBZ0Msb0ZBQWhDQSxxREFBYyxDQUFDO1FBQUMsRUFBRTtRQUFFLEVBQUU7UUFBRSxFQUFFO1FBQUUsRUFBRTtLQUFDLENBQUMsTUFBakRhLElBQUksR0FBYWIsR0FBZ0MsR0FBN0MsRUFBRWdCLE9BQU8sR0FBSWhCLEdBQWdDLEdBQXBDO0lBQ3BCLElBQUlrQyxXQUFXLEdBQUdsQyxtREFBWSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxJQUFNMkMsTUFBTSxHQUFHN0Msc0RBQVMsRUFBRTtJQW9FMUIscUJBQ0UsOERBQUM4RCxNQUFJO1FBQUNULFNBQVMsRUFBRXBELHlFQUFXO1FBQUU4RCxZQUFZLEVBQUMsS0FBSztRQUFDQyxRQUFRLEVBQUU1QyxZQUFZOzswQkFDckUsOERBQUM2QyxLQUFHO2dCQUFDWixTQUFTLEVBQUVwRCw4RUFBZ0I7Ozs7O29CQUFROzBCQUN4Qyw4REFBQ3dELGFBQWE7Ozs7b0JBQUc7MEJBQ2pCLDhEQUFDUSxLQUFHOzBCQUNEbEQsSUFBSSxDQUFDVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxTQUFDWCxLQUFLLEVBQUVlLEtBQUs7eUNBQzlCLDhEQUFDa0IsV0FBVzt3QkFBaUJOLEVBQUUsRUFBRSxDQUFDWixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUNvQyxRQUFRLEVBQUU7dUJBQXJDcEMsS0FBSyxHQUFHLENBQUM7Ozs7NkJBQWdDO2lCQUM1RCxDQUFDOzs7OztvQkFDRTswQkFFTiw4REFBQ2tDLEtBQUc7Z0JBQUNaLFNBQVMsRUFBRXBELCtFQUFpQjs7a0NBQy9CLDhEQUFDUSxpRUFBVzs7MENBQ1YsOERBQUM0RCxPQUFLO2dDQUFDaEIsU0FBUyxFQUFFcEQsK0VBQWlCOzBDQUFFLG1CQUFpQjs7Ozs7b0NBQVE7MENBQzlELDhEQUFDTSxnRUFBVTtnQ0FDVGlELFlBQVksRUFBRSxNQUFNO2dDQUNwQkQsUUFBUSxFQUFFLFNBQUMzQyxDQUFDOzJDQUFNd0IsV0FBVyxDQUFDRSxPQUFPLEdBQUcxQixDQUFDLENBQUNFLE1BQU0sQ0FBQ0UsS0FBSztpQ0FBQztnQ0FDdkRILElBQUksRUFBQyxxQkFBcUI7O2tEQUUxQiw4REFBQ0wsdUVBQWdCO3dDQUFDUSxLQUFLLEVBQUMsTUFBTTt3Q0FBQ3VELE9BQU8sZ0JBQUUsOERBQUNqRSw0REFBSyxvQ0FBRzt3Q0FBRStELEtBQUssRUFBQyxNQUFNOzs7Ozs0Q0FBRztrREFDbEUsOERBQUM3RCx1RUFBZ0I7d0NBQ2ZRLEtBQUssRUFBQyxRQUFRO3dDQUNkdUQsT0FBTyxnQkFBRSw4REFBQ2pFLDREQUFLLG9DQUFHO3dDQUNsQitELEtBQUssRUFBQyxTQUFTOzs7Ozs0Q0FDZjtrREFDRiw4REFBQzdELHVFQUFnQjt3Q0FDZlEsS0FBSyxFQUFDLElBQUk7d0NBQ1Z1RCxPQUFPLGdCQUFFLDhEQUFDakUsNERBQUssb0NBQUc7d0NBQ2xCK0QsS0FBSyxFQUFDLFlBQVk7Ozs7OzRDQUNsQjs7Ozs7O29DQUNTOzs7Ozs7NEJBQ0Q7a0NBQ2QsOERBQUNsRSw2REFBTTt3QkFBQ3FFLE9BQU8sRUFBQyxXQUFXO3dCQUFDckIsSUFBSSxFQUFDLFFBQVE7d0JBQUNzQixJQUFJLEVBQUMsT0FBTztrQ0FBQyxhQUV2RDs7Ozs7NEJBQVM7Ozs7OztvQkFDTDs7Ozs7O1lBQ0QsQ0FDUDtDQUNIO0dBNUdRL0QsUUFBUTs7UUFHQVYsa0RBQVM7OztBQUhqQlUsS0FBQUEsUUFBUTtBQTZHakIsSUFBTWdFLFFBQVEsR0FBYSxXQUFNO0lBQy9CLHFCQUNFLDhEQUFDdEUsMERBQU07a0JBQ0wsNEVBQUNNLFFBQVE7Ozs7aUJBQUc7Ozs7O2FBQ0wsQ0FDVDtDQUNIO0FBTktnRSxNQUFBQSxRQUFRO0FBUWQsK0RBQWVBLFFBQVEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC50c3g/MDdmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvQ3JlYXRpb24ubW9kdWxlLmNzc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEJ1dHRvbiBmcm9tIFwiQG11aS9tYXRlcmlhbC9CdXR0b25cIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvbGF5b3V0XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgUmFkaW8gZnJvbSBcIkBtdWkvbWF0ZXJpYWwvUmFkaW9cIjtcbmltcG9ydCBSYWRpb0dyb3VwIGZyb20gXCJAbXVpL21hdGVyaWFsL1JhZGlvR3JvdXBcIjtcbmltcG9ydCBGb3JtQ29udHJvbExhYmVsIGZyb20gXCJAbXVpL21hdGVyaWFsL0Zvcm1Db250cm9sTGFiZWxcIjtcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tIFwiQG11aS9tYXRlcmlhbC9Gb3JtQ29udHJvbFwiO1xuaW1wb3J0IEZvcm1MYWJlbCBmcm9tIFwiQG11aS9tYXRlcmlhbC9Gb3JtTGFiZWxcIjtcblxuZnVuY3Rpb24gUG9sbEZvcm0oKSB7XG4gIGNvbnN0IFtwb2xsLCBzZXRQb2xsXSA9IFJlYWN0LnVzZVN0YXRlKFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSk7XG4gIGxldCBkdXBsaWNhdGlvbiA9IFJlYWN0LnVzZVJlZihcIm5vbmVcIik7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcbiAgICBjb25zdCBuYW1lOiBudW1iZXIgPSArZS50YXJnZXQubmFtZTtcbiAgICBwb2xsW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgaWYgKG5hbWUgPT0gcG9sbC5sZW5ndGggLSAxKSB7XG4gICAgICBzZXRQb2xsKChwcmV2KSA9PiBbLi4ucHJldiwgXCJcIl0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKHBvbGwpO1xuICAgIC8vIGNsZWFuIGRhdGFcblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gcG9sbFswXTtcbiAgICBsZXQgb3B0aW9ucyA9IHBvbGwuc2xpY2UoMSkubWFwKChlbGVtZW50KSA9PiBlbGVtZW50LnRyaW0oKSk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlICE9PSBcIlwiO1xuICAgIH0pO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICB9KTtcblxuICAgIGxldCBmb3JtU3RyaW5nID0gYHF1ZXN0aW9uPSR7cXVlc3Rpb259Jm9wdGlvbnM9JHtKU09OLnN0cmluZ2lmeShcbiAgICAgIG9wdGlvbnNcbiAgICApfSZkdXBsaWNhdGlvbj0ke2R1cGxpY2F0aW9uLmN1cnJlbnR9YDtcbiAgICBjb25zb2xlLmxvZyhmb3JtU3RyaW5nKTtcbiAgICBheGlvc1xuICAgICAgLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvY3JlYXRlX3BvbGxcIiwgZm9ybVN0cmluZylcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgc3RhdHVzQ29kZTogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgIGxldCBpZCA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICAgICAgcm91dGVyLnB1c2goXCIvdm90ZS9cIiArIGlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gT3B0aW9uSW5wdXQoeyBpZCB9OiB7IGlkOiBzdHJpbmcgfSkge1xuICAgIC8vIHBvc3NpYmlsaXR5IG9mIGxlc3MgcmVuZGVyaW5nIHRocm91Z2ggbWVtbywgdXNlQ2FsbGJhY2tcbiAgICAvLyBjb25zb2xlLmxvZyhcImlkOiBcIiArIGlkICsgXCIgcmVuZGVyZWRcIik7XG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgT3B0aW9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMub3B0aW9uSW5wdXR9XG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgIG5hbWU9e2lkfVxuICAgICAgICBkZWZhdWx0VmFsdWU9e3BvbGxbK2lkXX1cbiAgICAgICAgLy8gYXV0b0ZvY3VzPXsraWQgPT0gcG9sbC5sZW5ndGggLSAyICYmIHBvbGxbMF0ubGVuZ3RoICE9IDB9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbiAgZnVuY3Rpb24gUXVlc3Rpb25JbnB1dCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVHlwZSB5b3VyIHF1ZXN0aW9uIGhlcmVcIlxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5xdWVzdGlvbklucHV0fVxuICAgICAgICBuYW1lPVwiMFwiXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2V9XG4gICAgICAgIGRlZmF1bHRWYWx1ZT17cG9sbFswXX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxmb3JtIGNsYXNzTmFtZT17c3R5bGVzLnBvbGx9IGF1dG9Db21wbGV0ZT1cIm9mZlwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5yZWRNYXJnaW59PjwvZGl2PlxuICAgICAgPFF1ZXN0aW9uSW5wdXQgLz5cbiAgICAgIDxkaXY+XG4gICAgICAgIHtwb2xsLnNsaWNlKDEpLm1hcCgodmFsdWUsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPE9wdGlvbklucHV0IGtleT17aW5kZXggKyAxfSBpZD17KGluZGV4ICsgMSkudG9TdHJpbmcoKX0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5wb2xsQ3JlYXRlfT5cbiAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e3N0eWxlcy5yYWRpb0xhYmVsfT5EdXBsaWNhdGlvbiBjaGVjazwvbGFiZWw+XG4gICAgICAgICAgPFJhZGlvR3JvdXBcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17XCJub25lXCJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IChkdXBsaWNhdGlvbi5jdXJyZW50ID0gZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgbmFtZT1cInJhZGlvLWJ1dHRvbnMtZ3JvdXBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsIHZhbHVlPVwibm9uZVwiIGNvbnRyb2w9ezxSYWRpbyAvPn0gbGFiZWw9XCJOb25lXCIgLz5cbiAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsXG4gICAgICAgICAgICAgIHZhbHVlPVwiY29va2llXCJcbiAgICAgICAgICAgICAgY29udHJvbD17PFJhZGlvIC8+fVxuICAgICAgICAgICAgICBsYWJlbD1cIkJyb3dzZXJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGb3JtQ29udHJvbExhYmVsXG4gICAgICAgICAgICAgIHZhbHVlPVwiaXBcIlxuICAgICAgICAgICAgICBjb250cm9sPXs8UmFkaW8gLz59XG4gICAgICAgICAgICAgIGxhYmVsPVwiSVAgQWRkcmVzc1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvUmFkaW9Hcm91cD5cbiAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwiY29udGFpbmVkXCIgdHlwZT1cInN1Ym1pdFwiIHNpemU9XCJsYXJnZVwiPlxuICAgICAgICAgIENyZWF0ZSBQb2xsXG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuICApO1xufVxuY29uc3QgQ3JlYXRpb246IE5leHRQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxMYXlvdXQ+XG4gICAgICA8UG9sbEZvcm0gLz5cbiAgICA8L0xheW91dD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0aW9uO1xuIl0sIm5hbWVzIjpbInVzZVJvdXRlciIsInN0eWxlcyIsIlJlYWN0IiwiQnV0dG9uIiwiTGF5b3V0IiwiYXhpb3MiLCJSYWRpbyIsIlJhZGlvR3JvdXAiLCJGb3JtQ29udHJvbExhYmVsIiwiRm9ybUNvbnRyb2wiLCJQb2xsRm9ybSIsImhhbmRsZUNoYW5nZSIsImUiLCJuYW1lIiwidGFyZ2V0IiwicG9sbCIsInZhbHVlIiwibGVuZ3RoIiwic2V0UG9sbCIsInByZXYiLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJxdWVzdGlvbiIsIm9wdGlvbnMiLCJzbGljZSIsIm1hcCIsImVsZW1lbnQiLCJ0cmltIiwiZmlsdGVyIiwiaW5kZXgiLCJzZWxmIiwiaW5kZXhPZiIsImZvcm1TdHJpbmciLCJKU09OIiwiZHVwbGljYXRpb24iLCJzdHJpbmdpZnkiLCJjdXJyZW50IiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsInN0YXR1cyIsImlkIiwiZGF0YSIsInJvdXRlciIsInB1c2giLCJjYXRjaCIsImVycm9yIiwiT3B0aW9uSW5wdXQiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsImNsYXNzTmFtZSIsIm9wdGlvbklucHV0Iiwib25DaGFuZ2UiLCJkZWZhdWx0VmFsdWUiLCJRdWVzdGlvbklucHV0IiwiYXV0b0ZvY3VzIiwicXVlc3Rpb25JbnB1dCIsInVzZVN0YXRlIiwidXNlUmVmIiwiZm9ybSIsImF1dG9Db21wbGV0ZSIsIm9uU3VibWl0IiwiZGl2IiwicmVkTWFyZ2luIiwidG9TdHJpbmciLCJwb2xsQ3JlYXRlIiwibGFiZWwiLCJyYWRpb0xhYmVsIiwiY29udHJvbCIsInZhcmlhbnQiLCJzaXplIiwiQ3JlYXRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n"));

/***/ })

});