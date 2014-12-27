var nano = require("nano"),
    prop = require("propertize"),
    Model = require("./model");

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

    /**
     * @name Modeler#models
     * @type object
     * @readonly
     */
    prop.readonly(this, "models", {});
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

/**
 * Define a model.
 * @param {string} [name]
 * @param {function} ctor
 * @param {object} [opts]
 * @returns {Model}
 */
Modeler.prototype.model = function(name, ctor, modelOpts) {
    var model;
    
    if (typeof name === "function") modelOpts = ctor, ctor = name, name = "";
    modelOpts = modelOpts || {};
    name = name || modelOpts.modelName || ctor.name;

    if (name in this.models) throw new Error(name + " model already defined");

    modelOpts.modeler = this;
    modelOpts.ctor = ctor;
    modelOpts.modelName = name;

    model = new Model(modelOpts);
    if (name) this.models[name] = model;
    return model;
};

/** export Modeler class */
module.exports = Modeler;
