export const adminMenu = [
  {
    //Quản Lý Người Dùng
    name: "menu.admin.manager-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      {
        name: "menu.admin.manager-doctor",
        link: "/system/manger-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
        // ]
      },
      {
        //Quản Lý Kế Hoạch Khám Bênh
        name: "menu.doctor.manager-schedule",
        link: "/doctor/manager-schedule",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
      // {
      //   name: "menu.admin.manager-admin",
      //   link: "/system/user-admin",
      // },
      // {
      //   name: "menu.doctor.manager-schedule",
      //   link: "/system/user-manage",
      // },
    ],
  },
  {
    // quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },

  {
    // quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },

  {
    // quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const DoctorMenu = [
  {
    name: "menu.admin.manager-user",
    menus: [
      {
        //Quản Lý Kế Hoạch Khám Bênh
        name: "menu.doctor.manager-schedule",
        link: "/doctor/manager-schedule",
      },
    ],
  },
];
