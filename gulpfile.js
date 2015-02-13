require( 'require-dir' )( './tasks' );

/**
 * Main tasks
 * - serve-dev / build-dev
 * - serve-build / build
 * - serve-debug-build / build-debug
 * - serve-production / build-production
 * - build-standalone-html (*** experimental ***)
 * - build-gh-pages (debug-build for github pages deployment)
 * - test / autotest (frontend unit tests)
 * - bump
 *   --type=pre will bump the prerelease version *.*.*-x
 *   --type=patch or no flag will bump the patch version *.*.x
 *   --type=minor will bump the minor version *.x.*
 *   --type=major will bump the major version x.*.*
 *   --version=1.2.3 will bump to a specific version and ignore other flags
 */
