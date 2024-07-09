import AddIcon from "@mui/icons-material/Add";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";
import { getAllViews } from "../../../api";
import DialogDaily from "../dialog-daily/dialog-daily";
import "./style.css";

export const DashboarAdmButton = () => {
  const [openComp, setOpenComp] = useState(false);

  const handleOpenDialog = () => {
    setOpenComp(true);
  };

  const handleCloseDialog = () => {
    setOpenComp(false);
  };

  return (
    <>
      <SpeedDial
        id="dashboard-adm-button"
        ariaLabel="Botão ADM"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<AddIcon />}
      >
        <SpeedDialAction
          icon={<AutoGraphIcon sx={{ color: "white" }} />}
          tooltipTitle={"Varrer diário"}
          onClick={handleOpenDialog}
        />
        <SpeedDialAction
          icon={<QueryStatsIcon sx={{ color: "white" }} />}
          tooltipTitle={"Varrer total"}
          onClick={getAllViews}
        />
      </SpeedDial>
      <DialogDaily open={openComp} onClose={handleCloseDialog} />
    </>
  );
};
