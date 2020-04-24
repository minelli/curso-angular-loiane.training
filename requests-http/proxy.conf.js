const PROXY_CONFIG = [{
    context: ['/api'], // pega tudo que é ../api e transforma pelo target
    target: 'http://localhost:8000',
    secure: false, // https: true, http: false
    logLevel: 'debug',
    pathRewrite: { '^/api': '' } // substitui as urls tirando o api, e colocando vazio.
    /*
     * se não tiver o pathRewrite, a chamada vai ser localhost/api/upload, 
     * e no backend não existe esse path, ocasionando ero.
     * Então o rewrite substitui os /api, 
     */
}];

module.exports = PROXY_CONFIG;