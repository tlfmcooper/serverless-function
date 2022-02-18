const Airtable = require('airtable-node');
require('dotenv');


const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY})
  .base('appVGucCe9it77CYV')
  .table('products');


exports.handler = async (event, context, cb) => {

    try {
        const {records} = await airtable.list();

        const products = records.map(product =>{
            const {id} = product;
            const {name, image, price} = product.fields;
            const url = image[0].url;
            return {id, name, url, price};
        });
        return {
        statusCode:200,

        body: JSON.stringify(products)};

    } catch (error) {

        return{
        statusCode: 500,
        body: "server error"};

}
};