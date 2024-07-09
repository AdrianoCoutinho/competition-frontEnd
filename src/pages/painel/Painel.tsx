import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import React, { useEffect, useState } from "react";
import { listCompetitions, setemphasiscompetition } from "../../api";
import { CompetitionsCard } from "../../shared/components";
import CreateDialogCompetition from "../../shared/components/create-competition-dialog/CreateDialogCompetition";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/SnackBarsSlice";
import "./style.css";

const Painel: React.FC = () => {
  const dispatch = useAppDispatch();

  const [openComp, setOpenComp] = useState(false);
  const [competition, setCompetition] = useState([
    {
      dthrRegister: "",
      finalDate: "",
      hashtag: "",
      id: "",
      idUser: "",
      indActive: true,
      initialDate: "",
      instagram: null,
      name: "",
      participants: 0,
      tiktok: null,
      views: 0,
      winner: null,
      youtube: null,
    },
  ]);

  const handleCloseDialog = () => {
    setOpenComp(false);
  };

  const setEmphasisCompetition = async (CompetitionId: string) => {
    const result = await setemphasiscompetition(CompetitionId);
    if (result.ok) {
      return dispatch(
        setMessage({ message: result.message, status: "success" })
      );
    }

    if (!result.ok) {
      return dispatch(setMessage({ message: result.message, status: "error" }));
    }
  };

  useEffect(() => {
    const getCompetition = async () => {
      const result = await listCompetitions();
      setCompetition(result.data);
    };
    getCompetition();
  }, []);
  return (
    <React.Fragment>
      <Grid container spacing={0.5}>
        {competition.map((item, index) => (
          <Grid key={index} item xs={12} md={4} lg={3}>
            <CompetitionsCard
              title={item.name}
              subheader={item.dthrRegister}
              initialDate={item.initialDate}
              finalDate={item.finalDate}
              indActive={item.indActive}
              tiktok={item.tiktok}
              instagram={item.instagram}
              youtube={item.youtube}
              participants={item.participants}
              views={item.views}
              winner={item.winner}
              hashtag={item.hashtag}
              handleEmphasis={() => setEmphasisCompetition(item.id)}
            />
          </Grid>
        ))}
      </Grid>
      <CreateDialogCompetition open={openComp} onClose={handleCloseDialog} />
      <Fab
        id="add-competition"
        onClick={() => setOpenComp(true)}
        color="success"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default Painel;
