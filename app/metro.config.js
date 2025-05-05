const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './src/styles/global.css' })

// const { getDefaultConfig } = require('metro-config');

// module.exports = async () => {
//   const defaultConfig = await getDefaultConfig();

//   return withNativeWind({
//     ...defaultConfig,
//     resolver: {
//       ...defaultConfig.resolver,
//       sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
//     },
//   });
// };
