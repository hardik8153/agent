export default {
  apiurl:
    import.meta.env.VITE_API_KEY === "production"
      ? "https://cs-backend-int-staging.powerpush.ai/"
      : "https://cs-backend-int-staging.powerpush.ai/",


  apis: {
    // login
    login: "api/v1/auth/login",
    forgot_password: "api/v1/auth/forgot-password",
    reset_password: "api/v1/auth/reset-password",

    checkin: "api/v1/users/checkin",
    checkout: "api/v1/users/checkout",

    flows: `api/v1/flows`,
    addflows: `api/v1/flows`,
    idflows: `api/v1/flows`,
    postflows: `api/v1/flows`,

    putflows: `api/v1/flows`,
    activateflows: `api/v1/flows`,
    deleteflows: `api/v1/flows`,

    // ticket
    ticket: "api/v1/ticket",
    ticketsfiltar:"api/v1/ticket/filter/tickets",
    customerDetails:"api/v1/customer/contactinfo/customerDetails",



    // messages
    sortOptions:"api/v1/messages/filter/sortOptions",
    conversationalFilters:"api/v1/messages/filter/conversationalFilters",
    messages:"api/v1/messages",

    // trigger
    trigger: "api/v1/trigger",
    idtrigger: "api/v1/trigger",

    // opstions
    postoptionBlock: "api/v1/optionBlock",
    idpostoptionBlock: "api/v1/optionBlock",

    // eachOption
    posteachOption: "api/v1/eachOption",
    optionsid: "api/v1/options",

    // responseBlock
    responseBlock: "api/v1/responseBlock",
    responseBlockid: "api/v1/responseBlock",

    // endBlock
    endBlock: "api/v1/endBlock",
    endBlockid: "api/v1/endBlock",


    // role
    roles: "api/v1/roles",
    addroles: "api/v1/roles",
    deleteroles: "api/v1/roles",


    assignusers: "api/v1/roles/assign-users",

    // customer
    customer: "api/v1/customer",
    customerbyid: "api/v1/customer",



    //  user api
    users: "api/v1/users",
    usersid: "api/v1/users",
    userupadatestatus: "api/v1/users",

    postusers: "api/v1/users",
    getManagers: "api/v1/users/managers/getManagers",


    // permissions
    managePermission1: "api/v1/permissions",
    managePermissionid: "api/v1/permissions/roles",
    managePermissionupdate: "api/v1/permissions/roles"

  },
};
