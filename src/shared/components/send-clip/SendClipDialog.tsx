import { Box, TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useState } from "react";
import { sendClipTiktok } from "../../../api";
import { useAppDispatch } from "../../../store/hooks";
import { setMessage } from "../../../store/modules/SnackBarsSlice";
import "./style.css";

interface ISendClipDialog {
  open: boolean;
  onClose: () => void;
  onChangeData: () => void;
}

const SendClipDialog: React.FC<ISendClipDialog> = ({
  open,
  onClose,
  onChangeData,
}) => {
  const dispatch = useAppDispatch();
  const [openLoad, setOpenLoad] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [platform, setPlatform] = React.useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform((event.target as HTMLInputElement).value);
  };

  const createNewCompetition = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!url || url === "" || url.length < 10) {
      return dispatch(
        setMessage({
          message: "Preencha o campo com a url do video corretamente!",
          status: "error",
        })
      );
    }

    setOpenLoad(true);

    const result = await sendClipTiktok({ url, platform });

    if (!result.ok) {
      setUrl("");
      setOpenLoad(false);
      return dispatch(
        setMessage({
          message: result.message,
          status: "error",
        })
      );
    }

    onChangeData();
    onClose();
    setOpenLoad(false);
    setUrl("");
    return dispatch(
      setMessage({
        message: "Seu Clip foi enviado para analise!",
        status: "success",
      })
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            createNewCompetition(event);
          },
        }}
        disableEscapeKeyDown
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoad}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Envie seu clip</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ pb: "10px" }} variant={"body2"}>
            Insira a url do video no campo abaixo, escolha a plataforma e
            aguarde a mensagem de retorno.
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          ></Box>
          <TextField
            fullWidth
            className="input-create-competition"
            variant="filled"
            label="url do video"
            color="secondary"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
          <FormControl>
            <FormLabel>Plataforma</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="tiktok"
                control={<Radio color="success" />}
                label="Tiktok"
              />
              <FormControlLabel
                value="instagram"
                control={<Radio color="success" />}
                label="Instagram"
              />
              <FormControlLabel
                value="youtube"
                control={<Radio color="success" />}
                label="Youtuube"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Button fullWidth variant="contained" color="success" type="submit">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendClipDialog;
