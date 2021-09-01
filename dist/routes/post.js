"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postController = require("../controllers/post.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import packages
// init()
var router = _express["default"].Router(); // setup routes


router.post("/new", _postController.postController);
var _default = router;
exports["default"] = _default;