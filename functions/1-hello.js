//syntax: domain/.netlify/functions/<function_name>
//const person = {"name":"cooper"};
exports.handler = async (event, context, cb) => {
    return {
        statusCode:200,
        //body: ` The random number is : ${Math.floor(Math.random()*100)}`
        body: "Our first Netlify Example"
    };
};