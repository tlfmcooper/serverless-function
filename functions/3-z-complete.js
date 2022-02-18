/* This single function was a merger between 3-airtable.js and 3-product.js
Therefore the reference to these single functions in the app.js function and product.js
function have been removed and replaced by 3-z-complete.js
 */

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