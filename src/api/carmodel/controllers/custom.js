"use strict";

/**
 * car-varinat-price controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::carmodel.carmodel",
  ({ strapi }) => ({
    // async find(ctx) {
    //   const { data, meta } = await super.find(ctx);
    //   const CityName = ctx.params["CityName"];
    //   const brand = ctx.query.brand;

    //   const filteredData = data.filter((item) => {
    //     if (item.attributes.Price) {
    //       const filteredNestedArray = item.attributes.Price.filter(
    //         (priceItem) =>
    //           priceItem.CityName === CityName &&
    //           item.attributes.VarinatName === "Maruti Alto 800"
    //       );
    //       item.attributes.Price = filteredNestedArray;
    //       return filteredNestedArray.length > 0;
    //     } else {
    //       return false;
    //     }
    //   });

    //   return { data: filteredData, meta, CityName, brand };
    // },
    async find(ctx) {
      const varinat = ctx.query.variantname;

      const varinatshortname = ctx.query.varinatshortname;

      const carname =  ctx.query.modelname

      const city = ctx.query.cityname;

      const fieldsFilter = ctx.query.fields

      const result = await strapi.entityService.findMany(
        "api::carmodel.carmodel",
        {
          //   populate: {
          //     car_collections: {
          //       filters: {
          //         CarName: "Maruti Swift",
          //       },
          //     },
          //   },
          filters: { car_collections: { slug: carname  } },
          fields : fieldsFilter
          //   filters: {
          //     $and: [{ BrandName: varinat }, { modelname: varinatshortname }],
          //   },
        }
      );

        result.map((item) => {
          if (item.price) {
            const filteredNestedArray = item.price.filter(
              (priceItem) => priceItem.CityName === city
            );
            item.price = filteredNestedArray;
            return filteredNestedArray.length > 0;
          } else {
            return false;
          }
        });
      return { result, varinat, varinatshortname,  carname ,city };
    },
  })
);
