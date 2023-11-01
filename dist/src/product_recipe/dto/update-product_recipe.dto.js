"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductRecipeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_recipe_dto_1 = require("./create-product_recipe.dto");
class UpdateProductRecipeDto extends (0, swagger_1.PartialType)(create_product_recipe_dto_1.CreateProductRecipeDto) {
}
exports.UpdateProductRecipeDto = UpdateProductRecipeDto;
//# sourceMappingURL=update-product_recipe.dto.js.map