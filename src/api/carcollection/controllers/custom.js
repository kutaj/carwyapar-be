"use strict";

/**
 * car-varinat-price controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::carcollection.carcollection",
  ({ strapi }) => ({
    async find(ctx, next) {
      const { data, meta } = await super.find(ctx);
      const req = ctx.request.URL.search;
      const filterUrl = decodeURIComponent(req.toString())?.split("&");
      const parameterContainingPriceCIty = filterUrl
        .find((param) => param.includes("price:"))
        ?.split(":")
        .slice(-1)
        .pop();

      if (data) {
        await Promise.all(
          data.map(async (item) => {
            const filteredCarModels = item?.attributes?.car_models?.data;
            const updatedItem = {
              ...item,
              attributes: {
                ...item.attributes,
                car_models: {
                  data: filteredCarModels?.sort((a, b) => {
                    const priceA =
                      a?.attributes?.price?.[0]?.["Ex-ShowRoom-Price"] || 0;
                    const priceB =
                      b?.attributes?.price?.[0]?.["Ex-ShowRoom-Price"] || 0;
                    return priceA - priceB;
                  }),
                },
              },
            };

            const AllVarinatPrice = await Promise.all(
              filteredCarModels?.map(async (variant) => {
                const prices = (await variant?.attributes?.price) || [];
                return prices?.filter(
                  (price) => price?.CityName === parameterContainingPriceCIty
                );
              })
            );
            if (
              AllVarinatPrice &&
              AllVarinatPrice.length > 0 &&
              updatedItem.attributes?.car_models?.data
            ) {
              updatedItem.attributes.car_models.data.forEach((model, index) => {
                const variantPrice = AllVarinatPrice[index];
                if (variantPrice.length > 0) {
                  model.attributes.price = variantPrice;
                }
              });
            }

            return updatedItem;
          })
        );
      }

      // if (data) {
      //   await Promise.all(
      //     data.map(async (item) => {
      //       const filteredCarModels = item?.attributes?.car_models?.data;
      //       const updatedItem = {
      //         ...item,
      //         attributes: {
      //           ...item.attributes,
      //           car_models: { data: filteredCarModels },
      //         },
      //       };

      //       const AllVarinatPrice = await Promise.all(
      //         filteredCarModels?.map(async (variant) => {
      //           const prices = (await variant?.attributes?.price) || [];
      //           return prices?.filter(
      //             (price) => price?.CityName === parameterContainingPriceCIty
      //           );
      //         })
      //       );
      //       if (
      //         AllVarinatPrice &&
      //         AllVarinatPrice.length > 0 &&
      //         updatedItem.attributes?.car_models?.data
      //       ) {
      //         updatedItem.attributes.car_models.data.forEach((model, index) => {
      //           const variantPrice = AllVarinatPrice[index];
      //           if (variantPrice.length > 0) {
      //             model.attributes.price = variantPrice;
      //           }
      //         });
      //       }

      //       return updatedItem;
      //     })
      //   );
      // }

      // if (data) {
      //         await Promise.all(
      //           data?.value?.data.map(async (item) => {
      //             const filteredCarModels = item?.attributes?.car_models?.data;
      //             const updatedItem = {
      //               ...item,
      //               attributes: {
      //                 ...item.attributes,
      //                 car_models: { data: filteredCarModels },
      //               },
      //             };

      //             const AllVarinatPrice = await Promise.all(
      //               filteredCarModels?.map(async (variant) => {
      //                 const prices = (await variant?.attributes?.price) || [];
      //                 return prices?.filter(
      //                   (price) => price?.CityName === 'Patna'
      //                 );
      //               })
      //             );
      //             if (
      //               AllVarinatPrice &&
      //               AllVarinatPrice.length > 0 &&
      //               updatedItem.attributes?.car_models?.data
      //             ) {
      //               updatedItem.attributes.car_models.data.forEach((model, index) => {
      //                 const variantPrice = AllVarinatPrice[index];
      //                 if (variantPrice.length > 0) {
      //                   model.attributes.price = variantPrice;
      //                 }
      //               });
      //             }

      //             return updatedItem;
      //           })
      //         );
      //       }

      // if (data) {
      //   await Promise.all(
      //     data.value.data.map(async (item) => {
      //       const filteredCarModels = item.attributes.car_models.data;
      //       const updatedItem = {
      //         ...item,
      //         attributes: {
      //           ...item.attributes,
      //           car_models: { data: filteredCarModels },
      //         },
      //       };

      //       const AllVariantPrice = await Promise.all(
      //         filteredCarModels.map(async (variant) => {
      //           const prices = (await variant.attributes.price) || [];
      //           const filteredPrices = prices.filter((price) => price.CityName === 'Patna');
      //           // Sorting prices by Ex-ShowRoom-Price
      //           // filteredPrices.sort((a, b) => a["Ex-ShowRoom-Price"] - b["Ex-ShowRoom-Price"]);
      //           console.log(filteredPrices.sort((a, b) => a?.[0]?.["Ex-ShowRoom-Price"] - b?.[0]?.["Ex-ShowRoom-Price"]))
      //           return filteredPrices;
      //         })
      //       );

      //       if (AllVariantPrice && AllVariantPrice.length > 0 && updatedItem.attributes.car_models.data) {
      //         updatedItem.attributes.car_models.data.forEach((model, index) => {
      //           const variantPrice = AllVariantPrice[index];
      //           if (variantPrice.length > 0) {
      //             model.attributes.price = variantPrice;
      //           }
      //         });
      //       }

      //       return updatedItem;
      //     })
      //   );
      // }

      return { data, meta };
    },

    async comparecars(ctx, next) {
      const { data, meta } = await super.find(ctx);

      // const { slugUrl } = ctx.params;
      // const { data, meta } = await super.find(ctx);

      // // const data = await strapi.entityService.findMany(
      // //   "api::carcollection.carcollection",
      // //   {
      // //     filters: { slug: "maruti-jimny" },
      // //   }
      // // );
      // const req = ctx.request.URL.search;
      // const filterUrl = decodeURIComponent(req.toString())?.split("&");
      // const parameterContainingPriceCIty = filterUrl
      //   .find((param) => param.includes("price:"))
      //   ?.split(":")
      //   .slice(-1)
      //   .pop();

      // if (data) {
      //   await Promise.all(
      //     data.map(async (item) => {
      //       const filteredCarModels = item?.attributes?.car_models?.data;
      //       const updatedItem = {
      //         ...item,
      //         attributes: {
      //           ...item.attributes,
      //           car_models: { data: filteredCarModels },
      //         },
      //       };

      //       const AllVarinatPrice = await Promise.all(
      //         filteredCarModels?.map(async (variant) => {
      //           const prices = (await variant?.attributes?.price) || [];
      //           return prices?.filter(
      //             (price) => price?.CityName === parameterContainingPriceCIty
      //           );
      //         })
      //       );
      //       if (
      //         AllVarinatPrice &&
      //         AllVarinatPrice.length > 0 &&
      //         updatedItem.attributes?.car_models?.data
      //       ) {
      //         updatedItem.attributes.car_models.data.forEach((model, index) => {
      //           const variantPrice = AllVarinatPrice[index];
      //           if (variantPrice.length > 0) {
      //             model.attributes.price = variantPrice;
      //           }
      //         });
      //       }

      //       return updatedItem;
      //     })
      //   );
      // }

      // if (data) {
      //   await Promise.all(
      //     data.map(async (item) => {
      //       const filteredCarModels = item?.attributes?.car_models?.data;
      //       const updatedItem = {
      //         ...item,
      //         attributes: {
      //           ...item.attributes,
      //           car_models: {
      //             data: filteredCarModels?.sort((a, b) => {
      //               const priceA = a?.attributes?.price?.[0]?.["Ex-ShowRoom-Price"] || 0;
      //               const priceB = b?.attributes?.price?.[0]?.["Ex-ShowRoom-Price"] || 0;
      //               return priceA - priceB;
      //             }),
      //           },
      //         },
      //       };

      //       const AllVarinatPrice = await Promise.all(
      //         filteredCarModels?.map(async (variant) => {
      //           const prices = (await variant?.attributes?.price) || [];
      //           return prices?.filter(
      //             (price) => price?.CityName === 'Patna'
      //           );
      //         })
      //       );
      //       if (
      //         AllVarinatPrice &&
      //         AllVarinatPrice.length > 0 &&
      //         updatedItem.attributes?.car_models?.data
      //       ) {
      //         updatedItem.attributes.car_models.data.forEach((model, index) => {
      //           const variantPrice = AllVarinatPrice[index];
      //           if (variantPrice.length > 0) {
      //             model.attributes.price = variantPrice;
      //           }
      //         });
      //       }

      //       return updatedItem;
      //     })
      //   );
      // }

      return { data, meta };
    },
  })
);
