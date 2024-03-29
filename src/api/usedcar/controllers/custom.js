// "use strict";

// /**
//  * usedcar controller
//  */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::usedcar.usedcar", ({ strapi }) => ({
//   async update(ctx) {
//     const { user } = ctx.state; // Get the logged-in user

//     // Check if the user is authenticated
//     if (!user) {
//       return ctx.unauthorized(
//         "You must be logged in to update the used car data."
//       );
//     }

//     // Check if the user has permission to update the used car
//     // Add your permission logic here based on your application requirements

//     // Proceed with the update logic
//     const response = await super.update(ctx);

//     // Return the response
//     return response;
//   },
// }));

"use strict";

/**
 * usedcar controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::usedcar.usedcar", ({ strapi }) => ({
//   //   async update(ctx) {
//   //     const { user } = ctx.state; // Get the logged-in user
//   //     const { id } = ctx.params; // Get the ID of the used car being updated
//   //     const { body } = ctx.request; // Get the request body

//   //     try {
//   //       const usedCar = await super.findOne(ctx);

//   //       //   const UserCarsUserEmail = usedCar.data.attributes.users_permissions_users.data[0].attributes;
//   //       //   UserCarsUserEmail.id === user.id
//   //       // Check if the email of the logged-in user matches the owner's email

//   //       if (
//   //         usedCar.data.attributes.users_permissions_users.data[0].attributes
//   //           .id === 3
//   //       ) {
//   //         // Proceed with the update operation
//   //         const response = await super.update(ctx);
//   //         return response;
//   //       } else {
//   //         // Return an unauthorized response if the emails do not match
//   //         return ctx.unauthorized(
//   //           "You are not authorized to update this used car."
//   //         );
//   //       }
//   //     } catch (err) {
//   //       ctx.badRequest(err.message);
//   //     }
//   //   },
// //   async update(ctx) {
// //     const { user } = ctx.state; // Get the logged-in user
// //     const { id } = ctx.params; // Get the ID of the used car being updated
// //     const { body } = ctx.request; // Get the request body
// //     const response = await super.update(ctx);

// //     const usedCar = await super.findOne(ctx);
// //     if (usedCar.data.attributes.users_permissions_users.data[0].attributes === 3) {
// //             return response;
// //     }

// //     // try {

// //     // //   else {
// //     // //     return ctx.unauthorized(
// //     // //       "You are not authorized to update this used car."
// //     // //     );
// //     // //   }
// //     // } catch (err) {
// //     //   ctx.badRequest(err.message);
// //     // }
// //   },
// async update(ctx) {

//   },
//   async findOne(ctx) {
//     const { user } = ctx.state;
//     const { id } = ctx.params; // Get the ID from the request parameters
//     try {
//       const usedCar = await super.findOne(ctx);
//       const UserCarsUser =
//         usedCar.data.attributes.users_permissions_users.data[0].attributes;
//       return { UserCarsUser, user, id };
//     } catch (err) {
//       // Handle errors
//       console.error("Error fetching used car:", err);
//       throw new Error("Failed to fetch used car data.");
//     }
//   },
// }));

module.exports = createCoreController("api::usedcar.usedcar", ({ strapi }) => ({
  async updateme(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const data = await strapi.entityService.findMany("api::usedcar.usedcar", {
      filters: { id: id },
      populate: {
        users: true,
      },
    });
    const userCarUser = data?.[0]?.users?.[0];

    if (
      userCarUser.email === user.email &&
      userCarUser.password === user.password &&
      userCarUser.username === user.username &&
      userCarUser.createdAt === user.createdAt &&
      userCarUser.updatedAt === user.updatedAt &&
      userCarUser.confirmed === user.confirmed
    ) {
      const response = await super.update(ctx);
      return response;
    }
  },

  async deleteme(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const data = await strapi.entityService.findMany("api::usedcar.usedcar", {
      filters: { id: id },
      populate: {
        users: true,
      },
    });
    const userCarUser = data?.[0]?.users?.[0];

    if (
      userCarUser.email === user.email &&
      userCarUser.password === user.password &&
      userCarUser.username === user.username &&
      userCarUser.createdAt === user.createdAt &&
      userCarUser.updatedAt === user.updatedAt &&
      userCarUser.confirmed === user.confirmed
    ) {
      const response = await super.delete(ctx);
      return response;
    }
  },
  //   async update(ctx) {
  //     const { user } = ctx.state; // Get the logged-in user
  //     const { id } = ctx.params; // Get the ID of the used car being updated
  //     const { body } = ctx.request; // Get the request body

  //     try {
  //       // Find the used car by ID
  //       const usedCar = await super.findOne(ctx);

  //       // Check if the used car exists
  //       if (!usedCar) {
  //         return ctx.notFound("Used car not found.");
  //       }

  //       // Check if the user associated with the used car has username "Raja"
  //       const usersData = usedCar.data?.attributes?.users?.data;
  //       if (usersData && usersData.length > 0) {
  //         const username = usersData[0]?.attributes?.username;
  //         if (username === "Raja") {
  //           // Proceed with the update operation
  //           const response = await super.update(ctx);
  //           return response;
  //         }
  //       }

  //       // Return an unauthorized response if the user does not have username "Raja"
  //       return ctx.unauthorized(
  //         "You are not authorized to update this used car."
  //       );
  //     } catch (err) {
  //       // Handle errors
  //       console.error("Error updating used car:", err);
  //       throw new Error("Failed to update used car.");
  //     }
  //   },
  //   async findOne(ctx) {
  //     const { user } = ctx.state;
  //     const { id } = ctx.params; // Get the ID from the request parameters
  //     const token = ctx.state.user.jwtToken;
  //     try {
  //       const data = await strapi.entityService.findMany("api::usedcar.usedcar", {
  //         filters: { id: id },
  //         populate: {
  //           users: true,
  //         },
  //       });
  //       //   const usedCar = await super.findOne(ctx);
  //       const UserCarsUser = data?.[0]?.users?.[0];
  //       const conditionUser =
  //         UserCarsUser.email === user.email &&
  //         UserCarsUser.password === user.password &&
  //         UserCarsUser.username === user.username &&
  //         UserCarsUser.createdAt === user.createdAt &&
  //         UserCarsUser.updatedAt === user.updatedAt &&
  //         UserCarsUser.confirmed === user.confirmed;
  //       return { UserCarsUser, user, id, conditionUser  , token };
  //     } catch (err) {
  //       // Handle errors
  //       console.error("Error fetching used car:", err);
  //       throw new Error("Failed to fetch used car data.");
  //     }
  //   },
}));

// usedCar?.data?.attributes?.users?.data?.[0]?.attributes?.brand === 'Mahindra'
