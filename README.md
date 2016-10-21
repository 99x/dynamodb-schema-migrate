# Migrate DynamoDB Schema across regions

[![npm](https://img.shields.io/npm/v/npm.svg)]() [![dynamodb](https://img.shields.io/badge/DynamoDB-migrate-blue.svg)]()


Easily Migrate a Existing Schema(Tables) from one Region to another Region

This is a Node Command Line tool to easily migrate your existing DynamoDB tables from one region to another with zero configuration.

``` javascript
Required parameters,

--from  :Provide your AWS region the tables exists
--to :Provide the AWS region you want to create the tables with the same schema
--profile :Provide the AWS CLI profile (default will be used if not set)
--tables Customer,Product,Login :Table Names you want the schema to be migrated

```

Required Functionalities,

- [X] Pass from AWS Region
- [ ] Pass to AWS Region
- [X] Set default Profile to "default"
- [ ] Retrieve table schema for one table
- [X] Remove unwanted parameters to migrate
- [ ] Retrieve for multiple Tables and Store
- [ ] Implement the Core JS file and then implement a CLI 
- [ ] capture input parameters from CLI 
- [ ] handle output in CLI
- [ ] add tests


