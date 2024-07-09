import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { getDaily } from "../../../api";
import { useAppDispatch } from "../../../store/hooks";
import { setMessage } from "../../../store/modules/SnackBarsSlice";

interface IDialogDailyProps {
  open: boolean;
  onClose: () => void;
}

const DialogDaily: React.FC<IDialogDailyProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState("");

  const CreateDailyWin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date || date === "") {
      return dispatch(
        setMessage({
          message: "Preencha o campo data!",
          status: "error",
        })
      );
    }

    const result = await getDaily(date);
    if (result.code === 201) {
      onClose();
      return dispatch(
        setMessage({
          message: `Os ganhadores do dia ${date} foram obtidos com sucesso!`,
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
          CreateDailyWin(event);
        },
      }}
      disableEscapeKeyDown
    >
      <DialogTitle>Selecione a data:</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <input
          className="input-create-competition input-date"
          type="date"
          name="final-date"
          onChange={(ev) => setDate(ev.target.value)}
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

export default DialogDaily;
