import { Box, TextField, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { getCodeTiktok, validateTiktokUser } from "../../../api";
import { useAppDispatch } from "../../../store/hooks";
import { setMessage } from "../../../store/modules/SnackBarsSlice";
import "./style.css";

interface IVerifyTiktokDialog {
  open: boolean;
  onClose: () => void;
}

const VerifyTiktokDialog: React.FC<IVerifyTiktokDialog> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [openLoad, setOpenLoad] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [url, setUrl] = useState<string>("");

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
    const result = await validateTiktokUser(url);

    if (!result.ok) {
      setOpenLoad(false);
      return dispatch(
        setMessage({
          message:
            "A hashtag não foi encontrada, para ser aceita é necessário que a hashtag seja clicavel na postagem do vídeo.",
          status: "error",
        })
      );
    }
    onClose();
    setOpenLoad(false);
    return dispatch(
      setMessage({
        message: "Seu usuário do tiktok foi confirmado com sucesso!",
        status: "success",
      })
    );
  };

  useEffect(() => {
    if (open) {
      GetCodeTiktok();
    }
  }, [open]);

  const GetCodeTiktok = async () => {
    const result = await getCodeTiktok();
    setCode(result.data);
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
        <DialogTitle>Verificação do tiktok</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ pb: "10px" }} variant={"body2"}>
            Crie um video no tiktok que contenha a hashtag com o código
            fornecido abaixo. Após a publicação do video, pegue a url do video e
            cole no campo "url" que se encontra abaixo, clique em confirmar e
            aguarde a mensagem de confirmação.
          </Typography>
          <Typography
            color={"error"}
            sx={{ pb: "10px", textAlign: "center" }}
            variant={"body2"}
          >
            Você tem 15 minutos para completar esta ação.
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Alert sx={{ width: "130px" }} severity="info">
              {code}
            </Alert>
          </Box>
          <TextField
            fullWidth
            className="input-create-competition"
            variant="filled"
            label="url do video"
            color="secondary"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
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

export default VerifyTiktokDialog;
