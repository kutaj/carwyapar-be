"use strict";

/**
 * car-varinat-price controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::car-varinat-price.car-varinat-price",
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

      const city = ctx.query.cityname;

      const result = await strapi.entityService.findMany(
        "api::car-varinat-price.car-varinat-price",
        {
          filters: {
            $and: [
              { VarinatName: varinat },
              { VarinatShortName: varinatshortname },
            ],
          },
        }
      );

      result.map((item) => {
        if (item.Price) {
          const filteredNestedArray = item.Price.filter(
            (priceItem) => priceItem.CityName === city
          );
          item.Price = filteredNestedArray;
          return filteredNestedArray.length > 0;
        } else {
          return false;
        }
      });
      return { result, varinat, varinatshortname, city };
    },
  })
);
