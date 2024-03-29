module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/usedcarsupdateme/:id",
      handler: "custom.updateme",
    },
    {
      method: "DELETE",
      path: "/usedcarsdeleteme/:id",
      handler: "custom.deleteme",
    },
    {
      method: "GET",
      path: "/usedcarsfind/:id",
      handler: "custom.findOne",
    },
  ],
};
