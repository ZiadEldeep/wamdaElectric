import {
  // IconAperture,
  // IconCopy,
  // IconMapPin,
  IconLayoutDashboard,
  IconLogin,
  // IconMoodHappy,
  // IconTypography,
  IconUserPlus,
  IconUsers,
  IconReceipt2,
  // IconStethoscope,
  // IconPill,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsers,
    href: "/dashboard/utilities/users",
  },

  // Added "Product" item
  {
    id: uniqueId(),
    title: "Product",
    icon: IconReceipt2, // You can choose any icon
    href: "/dashboard/utilities/products",
  },

  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },

  // Added "Users" item

];

export default Menuitems;
