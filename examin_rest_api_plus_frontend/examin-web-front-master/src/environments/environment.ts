// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  roles: {
    admin: 'ADMIN',
    student: 'STUDENT',
    moderator: 'MODERATOR'
  },
  keys: {
    RAZORPAY_KEY_EXAMIN: 'rzp_test_aHKh3O3GWiIy6M',
    RAZORPAY_KEY_MVSU: 'rzp_test_AMDHDNCb4ZgArr'
  },
  APP_BASE_URL: 'http://localhost:4200/',
  API_BASE_URL: 'http://localhost:3000/api/',
  FILES_BASE_URL: 'http://localhost:3000/'
  // API_BASE_URL: 'https://examin.co/api/',
  // FILES_BASE_URL: 'https://examin.co/'
};
