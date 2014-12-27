var prop = require("propertize");

/**
 * Furnish model definition.
 * @param {object}   opts
 * @param {function} opts.ctor
 * @param {Modeler}  opts.modeler
 * @param {string}   [opts.modelName]
 * @constructor
 */
function Model(opts) {
    opts = opts || {};

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
}

/** export Model class */
module.exports = Model;
