import { Config } from 'ontimize-web-ng2/ontimize';

import { SERVICE_CONFIG } from './shared/app.services.config';
import { CustomOntimizeService } from './shared';

export const CONFIG: Config = {
  // The base path of the URL used by app services.
  apiEndpoint: 'http://try.ontimize.com/QSAllComponents/rest',
  // apiEndpoint: 'http://10.7.0.137:9080/qsallcomponents-server-wsrest',

  //  Application identifier. Is the unique package identifier of the app. It is used when storing or managing temporal data related with the app. By default is set as 'ontimize-web-uuid'.
  uuid: 'com.ontimize.web.ng2.quickstart.map',

  // Title of the app
  title: 'Quickstart Map',

  //  Language of the application.
  locale: 'en',

  // The service type used (Ontimize REST standart, Ontimize REST JEE or custom implementation) in the whole application.
  serviceType: CustomOntimizeService,

  // Configuration parameters of application services.
  servicesConfiguration: SERVICE_CONFIG
};
