const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const categorie = await models.Category.findByPk(id, {
      include:['products']
    });
    if(!categorie){
      throw boom.notFound('categorie not found');
    }
    return categorie;
  }

  async update(id, changes) {
    const updateCategorie = await this.findOne(id);
    const rta = await updateCategorie.update(changes);
    return rta;
  }

  async delete(id) {
    const deleteCategory = await this.findOne(id);
    const rta = await deleteCategory.destroy();
    return rta;
  }

}

module.exports = CategoryService;
