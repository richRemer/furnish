var nano = require("nano"),
    prop = require("propertize");

/**
 * Furnish model and entity manager.
 * @param {object} opts
 * @param {string} opts.dbUrl
 * @constructor
 */
function Modeler(opts) {
    /**
     * @name Modeler#dbUrl
     * @type string
     */
    prop.readonly(this, "dbUrl", opts.dbUrl);

    /**
     * @name Modeler#db
     * @type object
     */
    prop.readonly(this, "db", nano(opts.dbUrl));
}

/**
 * Create a new modeler connected to the provided CouchDB database.
 * @param {string} dbUrl
 * @param {object} [opts]
 * @returns {Modeler}
 */
Modeler.create = function(dbUrl, opts) {
    opts = opts || {};
    opts.dbUrl = dbUrl || opts.dbUrl;
    return new Modeler(opts);
};

/** export Modeler class */
module.exports = Modeler;
