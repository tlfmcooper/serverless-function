const Airtable = require('airtable-node');
require('dotenv');


const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY})
  .base('appVGucCe9it77CYV')
  .table('products');


exports.handler = async (event, context, cb) => {
    const {id} = event.queryStringParameters;

    if (id){
        try {
            const product = await airtable.retrieve(id);
            if (product.error){
                return {
                statusCode:404,
                body: `No product with an id of ${id}`
                 };
            }
            return {
                statusCode:200,
                body: JSON.stringify(product)
            };
        } catch (error) {
             return {
                statusCode:500,
                body: "server error"
                 };
        }

    }
     return {
                statusCode:400,
                body: "Please provide a product ID"
                 };
};