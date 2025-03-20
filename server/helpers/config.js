'use strict';
require('dotenv').config({silent: true});

module.exports = {
    DEVELOPMENT:process.env.DEVELOPMENT,
    APP_PORT: process.env.APP_PORT,
    SSL_PORT: process.env.SSL_PORT,
    SITE_URL:process.env.SITE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
   
    netsuite_default_server:process.env.netsuite_default_server,
    //SB1 Server Setup
    base_url_rest_sb1:process.env.sb1_base_url_rest,
    base_url_sql_sb1:process.env.sb1_base_url_sql,
    realm_sb1:process.env.sb1_realm,
    netSuiteToken_sb1: {
        key: process.env.sb1_token_key,
        secret: process.env.sb1_token_secret
    },
    netSuiteConsumerToken_sb1: {
        key: process.env.sb1_consumer_key,
        secret: process.env.sb1_consumer_secret
    },

    //SB2 Server Setup
    base_url_rest_sb2:process.env.sb2_base_url_rest,
    base_url_sql_sb2:process.env.sb2_base_url_sql,
    realm_sb2:process.env.sb2_realm,
    netSuiteToken_sb2: {
        key: process.env.sb2_token_key,
        secret: process.env.sb2_token_secret
    },
    netSuiteConsumerToken_sb2: {
        key: process.env.sb2_consumer_key,
        secret: process.env.sb2_consumer_secret
    },

    //Production Server Setup
    base_url_rest_prod:process.env.prod_base_url_rest,
    base_url_sql_prod:process.env.prod_base_url_sql,
    realm_prod:process.env.prod_realm,
    netSuiteToken_prod: {
        key: process.env.prod_token_key,
        secret: process.env.prod_token_secret
    },
    netSuiteConsumerToken_prod: {
        key: process.env.prod_consumer_key,
        secret: process.env.prod_consumer_secret
    }
};
