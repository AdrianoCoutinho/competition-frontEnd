import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearMessage } from "../../../store/modules/SnackBarsSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBars: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const SnackBarsRedux = useAppSelector((state) => state.SnackBarsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (SnackBarsRedux.message !== "" && SnackBarsRedux.status !== "") {
      setOpen(true);
    }
  }, [SnackBarsRedux]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    dispatch(clearMessage());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={SnackBarsRedux.status ? SnackBarsRedux.status : "info"}
          sx={{ width: "100%" }}
        >
          {SnackBarsRedux.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
