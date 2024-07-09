import InstagramIcon from "@mui/icons-material/Instagram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Tiktok from "../../assets/tiktok.png";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCompetition, listCompetitions } from "../../api";
import { DashboarAdmButton } from "../../shared/components/dashboard-adm-button/DashboardAdmButton";
import "./style.css";

const Dashboard: React.FC = () => {
  // const apiUrl = import.meta.env.VITE_API_URL;

  const [competitions, setCompetitions] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  // const [firstCompetition, setFirstCompetition] = useState({
  //   id: "",
  //   name: "",
  //   initialDate: "",
  //   finalDate: "",
  //   hashtag: "",
  //   user: "",
  //   winner: "",
  //   participants: 0,
  //   indActive: true,
  //   clips: 0,
  //   views: 0,
  //   tiktok: "",
  //   youtube: "",
  //   instagram: "",
  // });

  // const [listdays, setListDays] = useState([
  //   {
  //     profilePicture: "",
  //     user: "",
  //     views: 0,
  //     date: "",
  //     email: "",
  //   },
  // ]);

  // const formatDate = (date: Date) => {
  //   const dataString = date;
  //   const data = new Date(dataString);
  //   const dia = data.getUTCDate().toString().padStart(2, "0");
  //   const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
  //   const ano = data.getUTCFullYear();
  //   return `${dia}-${mes}-${ano}`;
  // };

  // function formatNumber(numero: number): string {
  //   const partes = numero.toString().split(".");
  //   let parteInteira = partes[0];
  //   const parteDecimal = partes.length > 1 ? partes[1] : "";
  //   parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //   const numeroFormatado = parteDecimal
  //     ? `${parteInteira},${parteDecimal}`
  //     : parteInteira;
  //   return numeroFormatado;
  // }

  useEffect(() => {
    listAllCompetitions();
    // listDailiesWin();
  }, []);

  const listAllCompetitions = async () => {
    const result = await listCompetitions();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedCompetitions = result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    setCompetitions(mappedCompetitions);
  };

  const getViewCompetition = async (id: string) => {
    const result = await getCompetition(id);
    const response = result.data.result;
    console.log(response);
    // const competitionView = {
    //   id: response._id,
    //   name: response.name,
    //   initialDate: formatDate(response.initialDate),
    //   finalDate: formatDate(response.finalDate),
    //   hashtag: response.hashtag,
    //   user: response.user.name,
    //   winner: response.winner,
    //   participants: response.participants,
    //   indActive: response.indActive,
    //   clips: result.data.numberOfCompetitions,
    //   views: result.data.numberOfViewsTotal,
    //   tiktok: response.tiktok,
    //   youtube: response.youtube,
    //   instagram: response.instagram,
    // };

    // setFirstCompetition(competitionView);
  };

  const handleChangeCompetition = (event: SelectChangeEvent) => {
    getViewCompetition(event.target.value);
  };

  // const listDailiesWin = async () => {
  //   const result = await listDailies();
  //   const toMap = result.data.length;
  //   setListDays(result.data[toMap - 1].data);
  // };

  return (
    <React.Fragment>
      <DashboarAdmButton />
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="demo-simple-select-standard-label">
              {/* {firstCompetition.name || "selecione"} */}
            </InputLabel>
            <Select
              // value={firstCompetition.id}
              onChange={handleChangeCompetition}
            >
              {competitions.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
              >
                <circle
                  cx="28"
                  cy="18.6666"
                  r="8.33333"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M34.4705 18C35.2662 16.6219 36.5767 15.6163 38.1138 15.2044C39.6508 14.7926 41.2886 15.0082 42.6667 15.8038C44.0448 16.5995 45.0504 17.91 45.4622 19.4471C45.8741 20.9842 45.6585 22.6219 44.8628 24C44.0672 25.3781 42.7567 26.3837 41.2196 26.7956C39.6825 27.2074 38.0448 26.9918 36.6667 26.1962C35.2886 25.4005 34.283 24.09 33.8711 22.5529C33.4593 21.0158 33.6749 19.3781 34.4705 18L34.4705 18Z"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M11.1372 18C11.9328 16.6219 13.2433 15.6163 14.7804 15.2044C16.3175 14.7926 17.9552 15.0082 19.3333 15.8038C20.7114 16.5995 21.717 17.91 22.1289 19.4471C22.5407 20.9842 22.3251 22.6219 21.5295 24C20.7338 25.3781 19.4233 26.3837 17.8862 26.7956C16.3492 27.2074 14.7114 26.9918 13.3333 26.1962C11.9552 25.4005 10.9496 24.09 10.5378 22.5529C10.1259 21.0158 10.3415 19.3781 11.1372 18L11.1372 18Z"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M39.3905 42.0001L38.4101 42.1975L38.5718 43.0001H39.3905V42.0001ZM48.7802 40.8911L49.7515 40.6533L49.7515 40.6533L48.7802 40.8911ZM34.4886 34.3247L33.8837 33.5283L32.7272 34.4068L33.9605 35.1738L34.4886 34.3247ZM47.8672 41.0001H39.3905V43.0001H47.8672V41.0001ZM47.8089 41.1289C47.8066 41.1198 47.8047 41.0996 47.8107 41.0749C47.8163 41.0518 47.8265 41.0343 47.8361 41.0228C47.8554 40.9997 47.8724 41.0001 47.8672 41.0001V43.0001C49.0482 43.0001 50.0648 41.933 49.7515 40.6533L47.8089 41.1289ZM39.6667 33.6667C42.521 33.6667 44.3767 34.9269 45.6204 36.4772C46.8916 38.0619 47.5222 39.9579 47.8089 41.1289L49.7515 40.6533C49.4327 39.3512 48.7119 37.135 47.1804 35.2258C45.6214 33.2822 43.2232 31.6667 39.6667 31.6667V33.6667ZM35.0934 35.121C36.2188 34.2663 37.6954 33.6667 39.6667 33.6667V31.6667C37.2515 31.6667 35.3514 32.4136 33.8837 33.5283L35.0934 35.121ZM33.9605 35.1738C36.8447 36.9676 37.9745 40.0343 38.4101 42.1975L40.3708 41.8026C39.8914 39.4223 38.5903 35.698 35.0167 33.4755L33.9605 35.1738Z"
                  fill="white"
                />
                <path
                  d="M21.5114 34.3246L22.0395 35.1738L23.2729 34.4068L22.1163 33.5283L21.5114 34.3246ZM7.21981 40.8911L6.2485 40.6533L6.2485 40.6533L7.21981 40.8911ZM16.6095 42.0001V43.0001H17.4282L17.5898 42.1975L16.6095 42.0001ZM16.3334 33.6667C18.3047 33.6667 19.7813 34.2662 20.9066 35.121L22.1163 33.5283C20.6486 32.4135 18.7485 31.6667 16.3334 31.6667V33.6667ZM8.19112 41.1289C8.47784 39.9579 9.10848 38.0619 10.3797 36.4772C11.6233 34.9269 13.4791 33.6667 16.3334 33.6667V31.6667C12.7769 31.6667 10.3787 33.2822 8.81961 35.2258C7.2881 37.1349 6.56731 39.3512 6.2485 40.6533L8.19112 41.1289ZM8.13279 41.0001C8.12765 41.0001 8.14458 40.9997 8.1639 41.0228C8.17353 41.0343 8.18369 41.0518 8.18929 41.0749C8.19529 41.0996 8.19337 41.1198 8.19112 41.1289L6.2485 40.6533C5.93519 41.933 6.95182 43.0001 8.13279 43.0001V41.0001ZM16.6095 41.0001H8.13279V43.0001H16.6095V41.0001ZM17.5898 42.1975C18.0255 40.0343 19.1553 36.9676 22.0395 35.1738L20.9833 33.4755C17.4097 35.698 16.1086 39.4223 15.6292 41.8026L17.5898 42.1975Z"
                  fill="white"
                />
                <path
                  d="M28 32.6667C37.5722 32.6667 39.2906 40.5205 39.5992 43.3404C39.6592 43.8894 39.2189 44.3334 38.6667 44.3334H17.3333C16.781 44.3334 16.3408 43.8894 16.4008 43.3404C16.7093 40.5205 18.4278 32.6667 28 32.6667Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>{" "}
              <Typography className="separate-box-dashboard-title">
                Participantes
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {/* {formatNumber(firstCompetition.participants)} */}
              </Typography>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={3} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
              >
                <circle cx="28" cy="28" r="21" fill="white" />
                <path
                  d="M37.8778 27.1057L22.7366 19.5351C21.9388 19.1361 21 19.7163 21 20.6084V35.3918C21 36.2838 21.9388 36.864 22.7366 36.4651L37.8778 28.8945C38.6149 28.526 38.6149 27.4742 37.8778 27.1057Z"
                  fill="#5E5A5A"
                />
              </svg>{" "}
              <Typography className="separate-box-dashboard-title">
                Cortes
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {/* {formatNumber(firstCompetition.clips)} */}
              </Typography>
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
                {/* {formatNumber(firstCompetition.views)} */}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid></Grid>
        <Grid item xs={12}>
          {/* <TableListInfluencerUser idCompetition={firstCompetition.id} /> */}
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <Box component={"img"} sx={{ width: "50px" }} src={Tiktok} />
              <Typography className="separate-box-dashboard-title">
                Tiktok Views
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {/* {formatNumber(firstCompetition.views)} */}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <InstagramIcon sx={{ fontSize: 60 }} />
              <Typography className="separate-box-dashboard-title">
                Instagram Views
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {/* @{firstCompetition.instagram} */}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Box className="box-dashboard">
            <div className="separate-box-dashboard">
              <YouTubeIcon sx={{ fontSize: 60 }} />
              <Typography className="separate-box-dashboard-title">
                Shorts Views
              </Typography>
              <Typography className="separate-box-dashboard-value">
                {/* @{firstCompetition.youtube} */}
              </Typography>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <Typography variant="h6" align="center">
            Ganhadores diários
          </Typography>
        </Grid>
        {/* {listdays.map((item, index) => {
          return (
            <Grid key={index} item xs={12} md={3}>
              <Card>
                <Box>
                  <img
                    className="img-trophy"
                    src={`${apiUrl}/arquivos/${item.profilePicture}`}
                    alt="Ganhadores"
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.user}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    Visualizações: {item.views}
                    <br />
                    Data: {item.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })} */}
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
