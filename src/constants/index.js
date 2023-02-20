import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaymentsIcon from "@mui/icons-material/Payments";
import SellIcon from "@mui/icons-material/Sell";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export const navlinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: DashboardIcon,
  },
  {
    name: "Campaign",
    link: "/create-campaign",
    icon: CampaignIcon,
  },
  {
    name: "Payment",
    link: "/payment",
    disabled: true,
    icon: PaymentsIcon,
  },
  {
    name: "Withdraw",
    link: "/withdraw",
    disabled: true,
    icon: SellIcon,
  },
  { flex: true },
  {
    name: "My Campaigns",
    link: "/profile",
    icon: AccountBoxIcon,
  },
  {
    name: "Logout",
    link: "/logout",
    disabled: true,
    icon: MeetingRoomIcon,
  },
];

export const drawerWidth = 80;
export const navbarHeight = 90;
