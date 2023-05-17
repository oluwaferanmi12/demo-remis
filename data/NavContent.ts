import voucher from "../public/ICONS/SVG/voucher.svg";
import role from "../public/ICONS/SVG/role.svg";
import user from "../public/ICONS/SVG/user.svg";
import merchant from "../public/ICONS/SVG/merchant.svg";
import billing from "../public/ICONS/SVG/wallet.svg";
import card from "../public/ICONS/SVG/card.svg";
import company_icon from "../public/ICONS/SVG/companyIcon.svg"

export const navContent = [
  
  { name: "Users", icon: user, url: "/users", alias: "user" },
  { name: "Kill switch", icon: merchant, url: "/admin/killswitch", alias: "killswitch" },
  { name: "Company", icon: company_icon, url: "/companies", alias: "company" },

  { name: "Billings", icon: billing, url: "/billings", alias: "billing" },
  {
    name: "Card",
    icon: card,
    url: "/cards",
    alias: "card",
    subContent: [
      {
        name: "Card Request",
        icon: "",
        url: "/card-request",
        alias: "card_request",
      },
      {
        name: "Card Management",
        icon: "",
        url: "/card-management",
        alias: "card_management",
      },
    ],
  },
  { name: "Vouchers", icon: voucher, url: "/vouchers", alias: "voucher" },
  { name: "Role Mapping", icon: role, url: "/roles_mapping", alias: "role" },
  { name: "Merchants", icon: merchant, url: "/merchants", alias: "merchant" },
 
];
