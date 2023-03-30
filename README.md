# self_help_app

## Run the app
1. npm i -> to download all dependencies
2. npx expo start

## resolve errors (might occur)
 ERROR : Invariant Violation: ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.
 ERROR  Invariant Violation: Failed to call into JavaScript module method AppRegistry.runApplication().

 ### how to resolve it
 open node modules -> react-native -> index.js

 change the lines :

 // Deprecated Prop Types  
get ColorPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ColorPropType;
},

get EdgeInsetsPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
},

get PointPropType(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').PointPropType;
},

get ViewPropTypes(): $FlowFixMe {
  return require('deprecated-react-native-prop-types').ViewPropTypes;
},
