
function exclude() {
  return null;
}

require('babel-core/register')({
  ignore: /node_modules\/(?!wag-common-ui)/
}); 

require.extensions['.css'] = exclude;