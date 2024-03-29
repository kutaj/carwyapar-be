module.exports = (plugin) => {
  // custom controller Update Me
  plugin.controllers.user.updateMe = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const UserData = {
      MobileNumber: ctx.request.body.MobileNumber,
      CityName: ctx.request.body.CityName,
    };

    await strapi
      .query("plugin::users-permissions.user")
      .update({
        where: { id: ctx.state.user.id },
        data: UserData,
      })
      .then((res) => {
        ctx.response.status = 200;
      });
  };

  // custom route
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  // custom controller Delete Me
  plugin.controllers.user.deleteMe = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }

    await strapi
      .query("plugin::users-permissions.user")
      .delete({
        where: { id: ctx.state.user.id }
      })
      .then((res) => {
        ctx.response.status = 200;
      });
  };

  plugin.routes["content-api"].routes.push({
    method: "DELETE",
    path: "/delete/me",
    handler: "user.deleteMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
