import process from "process";
import module from "module";
import require from "require";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
} else {
  module.exports = require("./configureStore.dev");
}
