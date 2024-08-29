'use strict';

/**
 * site-map service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-map.site-map');
