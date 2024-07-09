import { Box } from "@mui/material";
import React from "react";

interface ILayoutProps {
  children: React.ReactNode;
}

export const BaseLayoutPage: React.FC<ILayoutProps> = ({ children }) => {
  return <Box sx={{ fontFamily: `'Sora', sans-serif` }}>{children}</Box>;
};
