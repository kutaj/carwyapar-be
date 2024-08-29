'use strict';

/**
 * site-map router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::site-map.site-map');
