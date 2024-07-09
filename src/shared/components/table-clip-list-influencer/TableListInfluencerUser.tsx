import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination, {
  LabelDisplayedRowsArgs,
} from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { listClipsOfCompetition } from "../../../api";
import "./style.css";

interface ITableListInfluencer {
  idCompetition: string;
}

interface Column {
  id: "rank" | "clipper" | "tiktok" | "instagram" | "youtube" | "views";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "rank", label: "Rank", minWidth: 170 },
  {
    id: "clipper",
    label: "Clipador",
    minWidth: 170,
    align: "center",
  },
  {
    id: "tiktok",
    label: "Tiktok",
    minWidth: 170,
    align: "center",
  },
  {
    id: "instagram",
    label: "Instagram",
    minWidth: 170,
    align: "center",
  },
  {
    id: "youtube",
    label: "Youtube",
    minWidth: 170,
    align: "center",
  },
  {
    id: "views",
    label: "Views",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  rank: number;
  clipper: string;
  tiktok: string;
  instagram: string;
  youtube: string;
  views: number;
}

const createData = (
  rank: number,
  clipper: string,
  tiktok: string,
  instagram: string,
  youtube: string,
  views: number
): Data => {
  return { rank, clipper, tiktok, instagram, youtube, views };
};

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #000;
    color: #fff;
    border: 0;
    text-align: center; // Centraliza o texto nas células do cabeçalho
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    text-align: center; // Centraliza o texto nas células do corpo da tabela
  }
`;

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: "#101010",
  "&:nth-of-type(odd)": {
    backgroundColor: "#202020",
  },
}));

const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  return `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`;
};

const TableListInfluencerUser: React.FC<ITableListInfluencer> = ({
  idCompetition,
}) => {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState<Data[]>([]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getDataTable(idCompetition);
  }, [idCompetition]);

  const getDataTable = async (idCompetition: string) => {
    const result = await listClipsOfCompetition(idCompetition);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedResult = result.data.map(
      (
        item: {
          user: string;
          tiktok: string;
          instagram: string;
          youtube: string;
          views: number;
        },
        index: number
      ) => {
        return createData(
          index,
          item.user,
          item.tiktok,
          item.instagram,
          item.youtube,
          item.views
        );
      }
    );
    setRows(mappedResult);
  };

  const formatNumber = (numero: number): string => {
    const partes = numero.toString().split(".");
    let parteInteira = partes[0];
    const parteDecimal = partes.length > 1 ? partes[1] : "";
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const numeroFormatado = parteDecimal
      ? `${parteInteira},${parteDecimal}`
      : parteInteira;
    return numeroFormatado;
  };

  return (
    <>
      <TableContainer id="table-list-clip-user">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="right">Clipador</StyledTableCell>
              <StyledTableCell align="right">Titkok</StyledTableCell>
              <StyledTableCell align="right">Instagram</StyledTableCell>
              <StyledTableCell align="right">Youtube</StyledTableCell>
              <StyledTableCell align="right">Visualizações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort((a, b) => b.views - a.views)
              .map((row, index) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          sx={{ color: "#fff", border: "none" }}
                          key={column.id}
                          align={column.align}
                        >
                          {typeof value === "number"
                            ? formatNumber(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        labelRowsPerPage="resultados por página"
        labelDisplayedRows={labelDisplayedRows}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#000" }}
      />
    </>
  );
};

export default TableListInfluencerUser;
