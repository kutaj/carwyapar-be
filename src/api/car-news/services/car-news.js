'use strict';

/**
 * car-news service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::car-news.car-news');
