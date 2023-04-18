// import aws SDK
const aws = require("aws-sdk");

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
const updateUsers = async (event, context) => {

    let userId = events.pathParameters.id
    const body = JSON.parse(event.body)

    // TODO: refactor to edit any parameter.
    
    // dynamo query parameters
    var params = {
        TableName: 'usersTable',
        key: {pk:userId},
        UpdateExpression: 'set #name = :name',
        ExpressionAttributeNames: {'#name':'name'},
        ExpressionAttributeValues: {':name':body.name},
        KeyConditionExpression: 'pk = :pk',
        ReturnValues:'ALL_NEW'
      };

    return dynamodb.update(params).promise().then(res=>{
        console.log(res)
        
        return {
            "statusCode": 200,
            "body": JSON.stringify({'user': res.Attributes})
        }
    })

    
}

module.exports = {
    updateUsers
}
