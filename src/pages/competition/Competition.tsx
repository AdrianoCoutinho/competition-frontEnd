import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Verifyparticipate,
  getCompetition,
  getEmphasisCompetition,
  participate,
} from "../../api";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/SnackBarsSlice";
import "./style.css";

const apiUrl = import.meta.env.VITE_API_URL;

const Competition: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [participated, setParticipated] = useState("PARTICIPAR");
  const [emphasisCompetition, setEmphasisCompetition] = useState({
    id: "",
    name: "",
    desc: "",
    thumDesk: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    getEmphasis();
  }, []);

  const getEmphasis = async () => {
    const result = await getEmphasisCompetition();
    const competition = await getCompetition(result.data);
    const buttonParticipated = await Verifyparticipate();
    const toEmphasis = {
      id: competition.data.result._id,
      name: competition.data.result.name,
      desc: competition.data.result.description,
      thumDesk: `${apiUrl}/arquivos/${competition.data.result.thumbnailDesktop}`,
    };

    if (buttonParticipated.code != 200) {
      setIsDisabled(true);
      setParticipated("PARTICIPANDO");
    }

    setEmphasisCompetition(toEmphasis);
  };

  const participateComp = async () => {
    setIsDisabled(true);
    const result = await participate(emphasisCompetition.id);
    if (result.ok) {
      setParticipated("PARTICIPANDO");
      dispatch(
        setMessage({
          message: "Você esta participando da competição!",
          status: "success",
        })
      );
    }
    if (!result.ok) {
      setParticipated("PARTICIPANDO");
      dispatch(
        setMessage({
          message: result.message,
          status: "error",
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box id="competition-card">
            <Card sx={{ maxWidth: "100%", minHeight: "300px" }}>
              <img
                id="img-competition"
                src={emphasisCompetition.thumDesk}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {emphasisCompetition.name}
                </Typography>
                <Typography variant="body2" color="#fff">
                  {emphasisCompetition.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small" color="secondary">
                  Compartilhar
                </Button>
                <Button
                  variant="contained"
                  onClick={participateComp}
                  disabled={isDisabled}
                  size="small"
                  color="info"
                  sx={{
                    backgroundColor: isDisabled ? "grey.400" : "info.main",
                    color: isDisabled ? "grey.700" : "white",
                    "&:disabled": {
                      backgroundColor: "grey.400",
                      color: "grey.700",
                    },
                  }}
                >
                  {participated}
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Competition;
