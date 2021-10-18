import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'Library API',
            version : '1.0.0',
            description : 'Air invites library api'
        },
        servers : [
            {
                url : 'http://localhost:3000'
            },
        ],
    },
    apis : ['./routes/*.js']
};
const specs = swaggerJsDoc(options);

export default specs;