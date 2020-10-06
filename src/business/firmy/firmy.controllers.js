const crudControllers = require('../../utils/crud');
const Firma = require('./firmy.models.js')

module.exports = crudControllers(Firma, "firmaId");
