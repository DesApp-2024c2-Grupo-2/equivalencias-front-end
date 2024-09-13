const { addWebpackAlias, override } = require('customize-cra');

// eslint-disable-next-line no-undef
module.exports = override(
    addWebpackAlias({
        '@mui/styled-engine': '@mui/styled-engine-sc'
    })
);
