import { crudControllers }from '../../utils/crud.js';
import { Firma } from './firmy.models.js';

export default crudControllers(Firma, "firmaId");
