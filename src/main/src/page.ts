/**
 * Path (URL) to the index page.
 */
export const pageUrl = import.meta.env.DEV
        ? 'http://localhost:3000'
        : new URL('../renderer/index.html', `file://${__dirname}`).toString();
