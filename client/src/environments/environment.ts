// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCV8Hfn17CnDW_jRVdk2JMflwQ8-wB96QI',
    authDomain: 'foodme-7a008.firebaseapp.com',
    databaseURL: 'https://foodme-7a008.firebaseio.com',
    projectId: 'foodme-7a008',
    storageBucket: 'foodme-7a008.appspot.com',
    messagingSenderId: '985688919588'
  },
  apiBaseUrl: 'http://localhost:3000/'
};
