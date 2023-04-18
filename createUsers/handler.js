// import aws SDK
const aws = require("aws-sdk");
const {randomUUID} = require("crypto")

// define parameters due the AWS enviroment. local or cloud
let dynamodbClientParams = {}
if (proccss.env.IS_ONLINE){
    dynamodbClientParams = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
        }
}
const dynamodb = new aws.DynamoDB.DocumentClient(dynamodbClientParams);

// lambda function - GET
const createUsers = async (event, context) => {

    const userId = randomUUID();
    let userBody = JOSN.parse(event.body)
    userBody.pk = userId
    
    // dynamo query parameters
    var params = {
        TableName: 'usersTable',
        Item: userBody
      };


    return dynamodb.put(params).promise().then(res=>{
        console.log(res)
        
        return {
            "statusCode": 200,
            "body": JSON.stringify({'user': params.Item})
        }
    })

    
}

module.exports = {
    createUsers
}
