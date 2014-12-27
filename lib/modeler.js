/**
 * Furnish model and entity manager.
 * @param {object} opts
 * @param {string} opts.databaseUrl
 * @constructor
 */
function Modeler(opts) {
    this.databaseUrl = opts.databaseUrl;
}

/**
 * Create a new modeler connected to the provided CouchDB database.
 * @param {string} databaseUrl
 * @param {object} [opts]
 * @returns {Modeler}
 */
Modeler.create = function(databaseUrl, opts) {
    opts = opts || {};
    opts.databaseUrl = databaseUrl || opts.databaseUrl;
    return new Modeler(opts);
};

/** export Modeler class */
module.exports = Modeler;
