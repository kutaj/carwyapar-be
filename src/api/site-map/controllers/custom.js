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
        changefreq: "weekly",
        // priority: determinePriority(index + 1, totalRows),
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
        // changefreq: determineChangefreq(post.updatedAt),
        changefreq: "daily",
        // priority: determinePriority(index + 1, totalRows),
      }));

      return sitemapData;
    },
    async comparecars(ctx) {
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

      // Generate an array of slugs
      const slugs = cleanedData.map((item) => item.slug);

      // Generate all unique pairs of slugs in the format "slug1-vs-slug2"
      const urls = slugs.flatMap((slug, index) =>
        slugs.slice(index + 1).map((otherSlug) => `${slug}-vs-${otherSlug}`)
      );

      // Get total rows for priority calculation
      const totalRows = cleanedData.length;

      // Create sitemap data for comparison URLs
      const sitemapData = urls.map((url, index) => ({
        loc: "/compare-cars/" + url, // Prepend the base path for comparison
        // lastmod: cleanedData[0]?.updatedAt || new Date().toISOString(), // Use the first item's updatedAt or current date
        lastmod: url.updatedAt,
        // changefreq: "monthly", // Set a default change frequency or use your function
        changefreq: "weekly",
        // priority: determinePriority(index + 1, totalRows),
      }));

      return sitemapData;
    },
    // async comparecarsvariant(ctx) {
    //   const {
    //     data: {
    //       attributes: { condition: siteMap },
    //     },
    //   } = await super.find(ctx);
    
    //   if (!siteMap) {
    //     return { sitemapData: [] };
    //   }
    
    //   const data = await strapi.entityService.findMany(
    //     "api::carcollection.carcollection",
    //     {
    //       publicationState: "preview",
    //       populate: {
    //         car_models: {
    //           fields: ["modelnameslug"],
    //           filters: {
    //             publishedAt: {
    //               $null: false,
    //             },
    //           },
    //         },
    //       },
    //       filters: {
    //         publishedAt: {
    //           $null: false,
    //         },
    //       },
    //       fields: ["slug", "updatedAt"],
    //       sort: { updatedAt: "desc" },
    //     }
    //   );
    
    //   const cleanedData = data.map((item) => {
    //     const { id, car_models, ...rest } = item;
    //     const cleanedCarModels = car_models.map(({ id, ...modelRest }) => modelRest);
    //     return { ...rest, car_models: cleanedCarModels };
    //   });
    
    //   function generateComparisonUrls(data) {
    //     return data.flatMap((car1, i) =>
    //       data.slice(i + 1).flatMap(car2 => {
    //         const car1Slug = car1.slug;
    //         const car2Slug = car2.slug;
    
    //         // Create comparison URLs for each combination of models
    //         return car1.car_models.flatMap(model1 =>
    //           car2.car_models.map(model2 => {
    //             const model1Slug = model1.modelnameslug;
    //             const model2Slug = model2.modelnameslug;
    
    //             // Construct and return the URL
    //             return `/compare-cars/${car1Slug}-vs-${car2Slug}/${model1Slug}-vs-${model2Slug}`;
    //           })
    //         );
    //       })
    //     );
    //   }
    
    //   // Generate comparison URLs based on the fetched data
    //   const comparisonUrls = generateComparisonUrls(cleanedData);
    
    //   // Create sitemapData
    //   const sitemapData = comparisonUrls.map(url => {
    //     const [_, carSlugs, modelSlugs] = url.split('/').slice(2); // Extract slugs from the URL
    //     const [car1Slug, car2Slug] = carSlugs.split('-vs-');
    //     const lastmod = cleanedData.find(car => car.slug === car1Slug || car.slug === car2Slug)?.updatedAt || new Date().toISOString();
    
    //     return {
    //       loc: url, // Use the URL directly
    //       lastmod: lastmod, // Use the last updated date
    //       changefreq: "weekly", // Set a default change frequency
    //       // priority: determinePriority(index + 1, totalRows), // Uncomment and implement if needed
    //     };
    //   });
    
    //   // Return the generated comparison URLs
    //   return { sitemapData };
    // }
    async newcarsftbrand(ctx) {
      const {
        data: {
          attributes: { condition: siteMap },
        },
      } = await super.find(ctx);
    
      if (!siteMap) {
        return { sitemapData: [] };
      }
    
      const data = await strapi.entityService.findMany("api::car-brand.car-brand", {
        publicationState: "preview",
        filters: {
          publishedAt: {
            $null: false,
          },
        },
        fields: ["brandname"],
        sort: { updatedAt: "desc" },
      });
    
      const cleanedData = data.map((item) => {
        const { id, ...rest } = item;
        return rest;
      });
    
      let filterValue = 3; 
    
      const generateUrl = (brands) =>
        `/new-cars-${brands
          .map((brand) => brand.toLowerCase().replace(/\s+/g, "-"))
          .join("-")}`;
    
      const generateCombinations = (arr, length) => {
        const result = [];
        const recurse = (start, combination) => {
          if (combination.length === length) {
            result.push(combination);
            return;
          }
          for (let i = start; i < arr.length; i++) {
            recurse(i + 1, [...combination, arr[i]]);
          }
        };
        recurse(0, []);
        return result;
      };
    
      const allUrls = Array.from({ length: filterValue }, (_, i) =>
        generateCombinations(cleanedData.map((item) => item.brandname), i + 1) 
          .map((combination) => generateUrl(combination))
      )
        .flat()
        .filter((url, index, self) => self.indexOf(url) === index); 
    
    
      const sitemapData = allUrls.map((url) => ({
        loc: url, 
        lastmod: new Date().toISOString(), 
        changefreq: "daily", 
      }));
    
      return sitemapData
    }
    
    
    
  })
);
