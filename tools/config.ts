import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';

// --------------
// Configuration.

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const ENV                  = getEnvironment();
export const DEBUG                = argv['debug']       || false;
export const PORT                 = argv['port']        || 5555;
export const LIVE_RELOAD_PORT     = argv['reload-port'] || 4002;
export const DOCS_PORT            = argv['docs-port']   || 4003;
export const APP_BASE             = argv['base']        || '/';

export const ENABLE_HOT_LOADING   = !!argv['hot-loader'];
export const HOT_LOADER_PORT      = 5578;

export const BOOTSTRAP_MODULE     = 'o-map';

export const APP_TITLE            = 'ontimize-web-ng2-map';

export const APP_SRC              = 'src';
export const ASSETS_SRC           = `${APP_SRC}`;

export const TOOLS_DIR            = 'tools';
export const TMP_DIR              = 'tmp';
export const OUT_DIR              = 'out';
export const APP_DEST             = `dist`;
export const ASSETS_DEST          = `${APP_DEST}/assets`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const JS_DEST              = `${APP_DEST}/js`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : '${APP_BASE}';
export const VERSION              = appVersion();

export const CSS_PROD_BUNDLE      = 'o-map.css';
export const JS_PROD_SHIMS_BUNDLE = 'shims.js';
export const JS_PROD_APP_BUNDLE   = 'o-map.js';

export const VERSION_NPM          = '2.14.2';
export const VERSION_NODE         = '4.0.0';

interface InjectableDependency {
  src: string;
  inject: string | boolean;
  dest?: string;
}

// --------------
// Private.

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}
