import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { createCompetition } from "../../../api";
import { useAppDispatch } from "../../../store/hooks";
import { setMessage } from "../../../store/modules/SnackBarsSlice";
import "./style.css";

interface ICreateDialogCompetitionProps {
  open: boolean;
  onClose: () => void;
}

interface NewCompetitionType {
  name: string;
  initialDate: string;
  finalDate: string;
  hashtag: string;
  description: string;
  tiktok: string;
  instagram: string;
  youtube: string;
  thumbnailDesktop?: File;
  thumbnailPhone?: File;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateDialogCompetition: React.FC<ICreateDialogCompetitionProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [newComp, setNewComp] = useState<NewCompetitionType>({
    name: "",
    initialDate: "",
    finalDate: "",
    hashtag: "",
    description: "",
    tiktok: "",
    instagram: "",
    youtube: "",
    thumbnailDesktop: undefined,
    thumbnailPhone: undefined,
  });

  const createNewCompetition = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!newComp.name || newComp.name === "" || newComp.name.length < 4) {
      return dispatch(
        setMessage({ message: "Preencha o campo nome!", status: "error" })
      );
    }

    if (
      !newComp.description ||
      newComp.description === "" ||
      newComp.description.length < 4
    ) {
      return dispatch(
        setMessage({ message: "Preencha o campo descrição!", status: "error" })
      );
    }

    if (!newComp.thumbnailDesktop) {
      return dispatch(
        setMessage({
          message: "Faça o envio da imagem para desktop!",
          status: "error",
        })
      );
    }

    if (!newComp.thumbnailPhone) {
      return dispatch(
        setMessage({
          message: "Faça o envio da imagem para celular!",
          status: "error",
        })
      );
    }

    if (
      !newComp.initialDate ||
      newComp.initialDate === "" ||
      newComp.initialDate.length < 4
    ) {
      return dispatch(
        setMessage({
          message: "Preencha o campo data inicial!",
          status: "error",
        })
      );
    }

    if (
      !newComp.finalDate ||
      newComp.finalDate === "" ||
      newComp.finalDate.length < 4
    ) {
      return dispatch(
        setMessage({ message: "Preencha o campo data final!", status: "error" })
      );
    }

    if (
      !newComp.hashtag ||
      newComp.hashtag === "" ||
      newComp.hashtag.length < 4
    ) {
      return dispatch(
        setMessage({ message: "Preencha o campo Hashtag!", status: "error" })
      );
    }

    if (!newComp.tiktok || newComp.tiktok === "" || newComp.tiktok.length < 3) {
      return dispatch(
        setMessage({ message: "Preencha o campo Tiktok!", status: "error" })
      );
    }

    if (
      !newComp.youtube ||
      newComp.youtube === "" ||
      newComp.youtube.length < 4
    ) {
      return dispatch(
        setMessage({ message: "Preencha o campo Youtube!", status: "error" })
      );
    }

    if (
      !newComp.instagram ||
      newComp.instagram === "" ||
      newComp.instagram.length < 4
    ) {
      return dispatch(
        setMessage({ message: "Preencha o campo Instagram!", status: "error" })
      );
    }

    const result = await createCompetition(newComp);
    if (result.code === 201) {
      onClose();
      return dispatch(
        setMessage({
          message: "A competição foi criada com sucesso!",
          status: "success",
        })
      );
    }
  };

  return (
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
      <DialogTitle>Criar competição</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Nome"
          color="secondary"
          value={newComp.name}
          onChange={(ev) => setNewComp({ ...newComp, name: ev.target.value })}
        />
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Descrição"
          color="secondary"
          value={newComp.description}
          onChange={(ev) =>
            setNewComp({ ...newComp, description: ev.target.value })
          }
          multiline
          rows={4}
        />
        <Button
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Enviar thumbnail desktop
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              if (e.target && e.target.files) {
                setNewComp({ ...newComp, thumbnailDesktop: e.target.files[0] });
              }
            }}
          />
        </Button>
        <Button
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Enviar thumbnail celular
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              if (e.target && e.target.files) {
                setNewComp({ ...newComp, thumbnailPhone: e.target.files[0] });
              }
            }}
          />
        </Button>
        <input
          className="input-create-competition input-date"
          type="date"
          name="initial-date"
          onChange={(ev) =>
            setNewComp({
              ...newComp,
              initialDate: formatDateForInput(new Date(ev.target.value)),
            })
          }
        />
        <input
          className="input-create-competition input-date"
          type="date"
          name="final-date"
          onChange={(ev) =>
            setNewComp({
              ...newComp,
              finalDate: formatDateForInput(new Date(ev.target.value)),
            })
          }
        />
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Hashtag"
          color="secondary"
          value={newComp.hashtag}
          onChange={(ev) =>
            setNewComp({ ...newComp, hashtag: ev.target.value })
          }
        />
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Tiktok"
          color="secondary"
          value={newComp.tiktok}
          onChange={(ev) => setNewComp({ ...newComp, tiktok: ev.target.value })}
        />
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Youtube"
          color="secondary"
          value={newComp.youtube}
          onChange={(ev) =>
            setNewComp({ ...newComp, youtube: ev.target.value })
          }
        />
        <TextField
          sx={{ backgroundColor: "#404040" }}
          className="input-create-competition"
          variant="filled"
          label="Instagram"
          color="secondary"
          value={newComp.instagram}
          onChange={(ev) =>
            setNewComp({ ...newComp, instagram: ev.target.value })
          }
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="success" type="submit">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialogCompetition;
