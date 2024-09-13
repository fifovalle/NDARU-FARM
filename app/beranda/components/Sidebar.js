import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";

const SidebarBeranda = () => {
  return (
    <aside className="w-64 bg-[#0a0a0a] text-white">
      <Typography variant="h4" className="mb-4 pt-5 px-4 text-white font-bold">
        NDARU FARM
      </Typography>
      <div className="border" />
      <List>
        <ListItem className="bg-[#121212] hover:bg-[#1a1a1a] transition-colors duration-300">
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Beranda</Typography>
        </ListItem>
      </List>
    </aside>
  );
};

export default SidebarBeranda;
