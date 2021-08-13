/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import onboardslidedata from './JSON/onboardslidedata'
import AppConfigure from './Components/AppConfigure';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
