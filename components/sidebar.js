import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";

const SidebarSemua = ({ className }) => {
  return (
    <aside
      className={`${className} w-64 bg-[#0a0a0a] text-white h-screen fixed md:relative z-50 md:z-0`}
    >
      <Typography variant="h4" className="mb-4 pt-7 px-4 text-white font-bold">
        NDARU FARM
      </Typography>
      <div className="border border-[#1a1a1a] mb-2" />
      <List>
        <ListItem className="bg-[#121212] hover:bg-[#1a1a1a] transition-colors duration-300 h-10">
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Beranda</Typography>
        </ListItem>
      </List>
      <div className="border border-[#1a1a1a] my-2" />
      <List>
        <ListItem className="bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors duration-300 h-10">
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Admin</Typography>
        </ListItem>
      </List>
    </aside>
  );
};

export default SidebarSemua;
