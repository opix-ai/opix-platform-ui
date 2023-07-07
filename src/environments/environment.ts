// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ENDPOINT: '/api',
  REQUESTS_ENDPOINT: '/requests-api',
  // INPUT_ENDPOINT: 'http://localhost:5000',
  INPUT_ENDPOINT: '/input',
  API_LOGIN: '/oauth2/authorization/opix',
  projectName: 'Opix',
  logoURL: 'https://www.opix.ai/images/Logos/opix%20logo%202.svg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
