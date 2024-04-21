const path = require('path');
const dotenv = require('dotenv');
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
dotenv.config({ path: path.join(__dirname, `.${process.env.NODE_ENV}.env`) });

const { cast } = require('./cast');

const config = {
  basic: {
    profile: cast('NODE_ENV', 'string')
  },
  notion: {
    apiKey: cast('NOTION_API_KEY', 'string'),
    databaseId: cast('NOTION_TARGET_DB_ID', 'string'),
  }
};

module.exports = config;