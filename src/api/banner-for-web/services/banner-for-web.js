'use strict';

/**
 * banner-for-web service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::banner-for-web.banner-for-web');
