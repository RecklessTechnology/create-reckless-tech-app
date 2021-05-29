const webpack = require('webpack');

module.exports = {
  // ... your webpack configuration ...
  plugins: [
    new webpack.ContextReplacementPlugin(
      /^\.$/,
      (context) => {
          if (/\/node_modules\/peerjs\/dist/.test(context.context)) {//ensure we're only doing this for modules we know about
              context.regExp = /this_should_never_exist/
              for (const d of context.dependencies) {
                  if (d.critical) d.critical = false;
              }
          }
      }
  ),
  ]
}