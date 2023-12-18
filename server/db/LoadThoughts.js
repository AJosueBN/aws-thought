const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'us-east-2',
  });
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
});
console.log('Importing thoughts into DynamoDB. Please wait.');

// Turns data gathered and turns it into an object in JSON format
const allUsers = JSON.parse(
  fs.readFileSync('./server/seed/users.json', 'utf8'),
);

// allows to iterate over each user gathered
allUsers.forEach(user => {
    const params = {
      TableName: "Thoughts",
      Item: {
        "username": user.username,
        "createdAt": user.createdAt,
        "thought": user.thought
      }
    }
    // Helps to insert new thought from a user
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2)); // Error occured if thought insertion failed
        } else {
          console.log("PutItem succeeded:", user.username);
        }
      });
});