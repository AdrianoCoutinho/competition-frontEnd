import InstagramIcon from "@mui/icons-material/Instagram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Tiktok from "../../assets/tiktok.png";

import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import React, { useCallback, useEffect, useState } from "react";
import {
  VerifyTiktokStatus,
  getUser,
  listClipsInstagramOfUser,
  listClipsTiktokOfUser,
  listClipsYoutubeOfUser,
} from "../../api";
import SendClipDialog from "../../shared/components/send-clip/SendClipDialog";
import { TableListClipperUser } from "../../shared/components/table-clip-list-clipper/TableListClipperUser";
import VerifyTiktokDialog from "../../shared/components/verify-tiktok-dialog/VerifyTiktokDialog";
import "./style.css";

const DashboardClipper: React.FC = () => {
  const [tiktokStatus, setTiktokStatus] = useState(true);
  const [openComp, setOpenComp] = useState(false);
  const [openClip, setOpenClip] = useState(false);
  const [user, setUser] = useState({
    totalValueOfTiktokClipsViews: 0,
    totalValueOfYoutubeClipsViews: 0,
    totalValueOfInstagramClipsViews: 0,
    totalValueOfclipsViews: 0,
    totalValueOfclips: 0,
    tiktok: "",
    instagram: "",
    youtube: "",
  });

  function formatNumber(numero: number): string {
    const partes = numero.toString().split(".");
    let parteInteira = partes[0];
    const parteDecimal = partes.length > 1 ? partes[1] : "";
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const numeroFormatado = parteDecimal
      ? `${parteInteira},${parteDecimal}`
      : parteInteira;
    return numeroFormatado;
  }

  useEffect(() => {
    verifyTiktok();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyTiktok = async () => {
    const result = await VerifyTiktokStatus();
    if (!result.ok) {
      return setTiktokStatus(true);
    }
    setTiktokStatus(false);
  };

  const getUserData = useCallback(async () => {
    const result = await getUser();
    const totalTiktok = await listClipsTiktokOfUser();
    const totalYoutube = await listClipsYoutubeOfUser();
    const totalInstagram = await listClipsInstagramOfUser();
    const userData = {
      totalValueOfTiktokClipsViews: totalTiktok.data,
      totalValueOfYoutubeClipsViews: totalYoutube.data,
      totalValueOfInstagramClipsViews: totalInstagram.data,
      totalValueOfclipsViews: result.data.totalViewsOfClips,
      totalValueOfclips: result.data.totalClipsValue,
      tiktok: result.data.user.tiktok,
      instagram: result.data.user.instagram,
      youtube: result.data.user.youtube,
    };
    setUser(userData);
  }, []);

  const handleCloseTiktokDialog = () => {
    getUserData();
    setOpenComp(false);
  };

  const handleCloseClipDialog = () => {
    setOpenClip(false);
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <Box component={"img"} sx={{ width: "50px" }} src={Tiktok} />
              <Typography className="separate-box-dashboard-title">
                Tiktok
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {user.tiktok}
              </Typography>
              {tiktokStatus && (
                <span
                  className="tiktok-verify"
                  onClick={() => setOpenComp(true)}
                >
                  Tiktok não verificado.
                  <br />
                  clique aqui para verificar
                </span>
              )}
              {user.totalValueOfTiktokClipsViews &&
                formatNumber(user.totalValueOfTiktokClipsViews)}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <InstagramIcon sx={{ fontSize: 60 }} />
              <Typography className="separate-box-dashboard-title">
                Instagram
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {user.instagram}
              </Typography>
              {user.totalValueOfInstagramClipsViews &&
                formatNumber(user.totalValueOfInstagramClipsViews)}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <YouTubeIcon sx={{ fontSize: 60 }} />
              <Typography className="separate-box-dashboard-title">
                Youtube
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {user.youtube}
              </Typography>
              {user.totalValueOfYoutubeClipsViews &&
                formatNumber(user.totalValueOfYoutubeClipsViews)}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <VisibilityIcon sx={{ fontSize: 60 }} />
              <Typography className="separate-box-dashboard-title">
                Total Views
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {formatNumber(user.totalValueOfclipsViews)}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableListClipperUser />
        </Grid>
      </Grid>
      <SendClipDialog
        open={openClip}
        onClose={handleCloseClipDialog}
        onChangeData={getUserData}
      />
      <VerifyTiktokDialog open={openComp} onClose={handleCloseTiktokDialog} />
      <Fab
        id="add-clip"
        onClick={() => setOpenClip(true)}
        color="success"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default DashboardClipper;
