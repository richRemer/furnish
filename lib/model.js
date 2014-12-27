var prop = require("propertize"),
    extend = require("objektify").extend;

/**
 * Furnish model definition.
 * @param {object}   opts
 * @param {function} opts.ctor
 * @param {Modeler}  opts.modeler
 * @param {string}   [opts.modelName]
 * @param {object}   [opts.proto]
 * @constructor
 */
function Model(opts) {
    opts = opts || {};

    var proto = opts.proto || opts.ctor.prototype;

    /**
     * @name Model#ctor
     * @type function
     * @readonly
     */
    prop.readonly(this, "ctor", opts.ctor);

    /**
     * @name Model#modeler
     * @type Modeler
     * @readonly
     */
    prop.readonly(this, "modeler", opts.modeler);

    /**
     * @name Model#modelName
     * @type string
     * @readonly
     */
    prop.readonly(this, "modelName", opts.modelName || "");
    
    /**
     * @name Model#proto
     * @type object
     * @readonly
     */
    prop.internal(this, "proto", extend(proto, {}));
}

/**
 * Create a new model instance.
 * @param {object} [opts]
 */
Model.prototype.create = function(opts) {
    var instance = Object.create(this.proto);
    
    opts = opts || {};
    this.ctor.call(instance);

    return instance;
};

/** export Model class */
module.exports = Model;
