import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import "./style.css";

interface IAppThemeProviderProps {
  title: string;
  subheader: string;
  initialDate: string;
  finalDate: string;
  indActive: boolean;
  tiktok: string | null;
  instagram: string | null;
  youtube: string | null;
  participants: number;
  views: number;
  winner: string | null;
  hashtag: string;
  handleEmphasis: () => void;
}

export const CompetitionsCard: React.FC<IAppThemeProviderProps> = ({
  title,
  subheader,
  initialDate,
  finalDate,
  indActive,
  tiktok,
  instagram,
  youtube,
  participants,
  views,
  winner,
  hashtag,
  handleEmphasis,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date: string) => {
    const dataString = date;
    const data = new Date(dataString);
    const dia = data.getUTCDate().toString().padStart(2, "0");
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <Card className="card-competitions">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-label="settings"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={formatDate(subheader)}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEmphasis}>Tornar principal</MenuItem>
      </Menu>
      <CardMedia
        component="img"
        height="194"
        image="https://media.licdn.com/dms/image/C4D03AQEgPJSzSRnY1g/profile-displayphoto-shrink_800_800/0/1544567585263?e=2147483647&v=beta&t=VDzYFjGttipZycxbRLZO8PF1z8yQ72AlqOoyaEv7lOY"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="light">
          Inicia em {formatDate(initialDate)}
        </Typography>
        <Typography variant="body2" color="light">
          finaliza em {formatDate(finalDate)}
        </Typography>
        <Typography variant="body2" color="light">
          status: {indActive ? "ativa" : "não ativa"}
        </Typography>
        <Typography variant="body2" color="light">
          hashtag: #{hashtag}
        </Typography>
        <Typography variant="body2" color="light">
          tiktok: @{tiktok}
        </Typography>
        <Typography variant="body2" color="light">
          youtube: @{youtube}
        </Typography>
        <Typography variant="body2" color="light">
          instagram: @{instagram}
        </Typography>
        <Typography variant="body2" color="light">
          Participantes: {participants}
        </Typography>
        <Typography variant="body2" color="light">
          Visualizações: {views}
        </Typography>
        <Typography variant="body2" color="light">
          Ganhador: {winner}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
