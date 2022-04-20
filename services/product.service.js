const boom = require('@hapi/boom');
const {Op} = require('sequelize')
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
  }

  async create(data) {
    const newProduct =  await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const {limit, offset} = query;
    const {price} = query;
    const {price_min, price_max} = query;


    if(limit&&offset){
      options.limit = limit;
      options.offset = offset;
    }

    if(price){
      options.where.price = price;
    }

    if(price_min&&price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const updateProduct = await this.findOne(id);
    const rta = await updateProduct.update(changes);
    return rta;
  }

  async delete(id) {
    const deleteProduct = await this.findOne(id);
    const rta = await deleteProduct.destroy();
    return rta;
  }

}

module.exports = ProductsService;
