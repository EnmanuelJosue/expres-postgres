const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CustomerService {
  constructor(){
  }
  async create(data) {
    const newCustomer = await models.Customer.create(data,{
      include:['user']
    });
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const model = this.findOne(id);
    const updateCustomer = await model.update(changes);
    return updateCustomer;
  }

  async delete(id) {
    const model = this.findOne(id);
    const deleteCustomer = await model.destroy();
    return deleteCustomer;
  }

}

module.exports = CustomerService;
