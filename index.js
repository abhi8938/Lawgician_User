/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import bgMessaging from './src/bgMessaging';
import {name as appName} from './app.json';
import bgActions from './src/bgActions';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundNotificationAction', () => bgActions); 
console.disableYellowBox = true