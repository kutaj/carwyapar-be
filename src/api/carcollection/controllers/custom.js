"use strict";
const {
  addPercentage,
  getFactor,
  getInsurancePercentage,
} = require("./pricelogic");
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
      const reqSelectedState = filterUrl
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
                    const priceA = a?.attributes?.ExShowRoomPrice;
                    const priceB = b?.attributes?.ExShowRoomPrice;
                    return priceA - priceB;
                  }),
                },
              },
            };

            updatedItem.attributes.car_models.data.forEach((model, index) => {
              const exShowRoomPrice = Number(
                model?.attributes?.ExShowRoomPrice
              );
              const fuelType = model?.attributes?.FuelType;
              const modelname = model?.attributes?.modelname;
              const displacement = model?.attributes?.Displacement;

              const roadTaxPercentage = getFactor(
                reqSelectedState,
                fuelType,
                exShowRoomPrice,
                displacement
              );
              const insurancePercentage =
                getInsurancePercentage(exShowRoomPrice);

              const RoadTaxPrice = addPercentage(
                exShowRoomPrice,
                roadTaxPercentage
              );
              const insurancePrice = addPercentage(
                exShowRoomPrice,
                insurancePercentage
              );
              const OtherPrice = addPercentage(exShowRoomPrice, 1);
              const onRoadPrice =
                exShowRoomPrice + RoadTaxPrice + insurancePrice + OtherPrice;

              model.attributes.price = [
                {
                  id: 70,
                  Emi: 9831,
                  RTO: RoadTaxPrice,
                  Others: OtherPrice,
                  CityName: "Ambala",
                  StateName: reqSelectedState,
                  Insurance: insurancePrice,
                  "On-Road Price": onRoadPrice,
                  "Ex-ShowRoom-Price": exShowRoomPrice,
                },
              ];
            });
            return updatedItem;
          })
        );
      }
      return { data, meta , reqSelectedState };
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
      // const reqSelectedState = filterUrl
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
      //             (price) => price?.CityName === reqSelectedState
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
