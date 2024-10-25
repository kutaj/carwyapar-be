"use strict";

/**
 * site-map controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { determineChangefreq, determinePriority } = require("./logic");
const { indexData } = require("./comman");

module.exports = createCoreController(
  "api::site-map.site-map",
  ({ strapi }) => ({
    async carwyapar(ctx) {
      return indexData;
    },
    async newcars(ctx) {
      const {
        data: {
          attributes: { condition: siteMap },
        },
      } = await super.find(ctx);

      if (!siteMap) {
        return { sitemapData: [] };
      }

      const data = await strapi.entityService.findMany(
        "api::carcollection.carcollection",
        {
          publicationState: "preview",
          filters: {
            publishedAt: {
              $null: false,
            },
          },
          fields: ["slug", "updatedAt"],
          sort: { updatedAt: "desc" },
        }
      );

      const cleanedData = data.map((item) => {
        const { id, ...rest } = item;
        return rest;
      });

      const totalRows = cleanedData.length;
      const sitemapData = cleanedData.map((post, index) => ({
        loc: "/new-car/" + post.slug,
        lastmod: post.updatedAt,
        changefreq: determineChangefreq(post.updatedAt),
        priority: determinePriority(index + 1, totalRows),
      }));

      return sitemapData;
    },
    async carnews(ctx) {
      const {
        data: {
          attributes: { condition: siteMap },
        },
      } = await super.find(ctx);

      if (!siteMap) {
        return { sitemapData: [] };
      }

      const data = await strapi.entityService.findMany(
        "api::car-news.car-news",
        {
          publicationState: "preview",
          filters: {
            publishedAt: {
              $null: false,
            },
          },
          fields: ["titleslug", "updatedAt", "uid"],
          sort: { updatedAt: "desc" },
        }
      );

      const cleanedData = data.map((item) => {
        const { id, ...rest } = item;
        return rest;
      });

      const totalRows = cleanedData.length;
      const sitemapData = cleanedData.map((post, index) => ({
        loc: "/news/india-car-news/" + post.titleslug + "-" + post.uid,
        lastmod: post.updatedAt,
        changefreq: determineChangefreq(post.updatedAt),
        priority: determinePriority(index + 1, totalRows),
      }));

      return sitemapData;
    },
  })
);
