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
import { listClipsOfUser } from "../../../api";
import "./style.css";

interface Column {
  id: "url" | "date" | "link" | "views";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "url", label: "url", minWidth: 170 },
  {
    id: "date",
    label: "Data",
    minWidth: 170,
    align: "center",
  },
  {
    id: "link",
    label: "Link",
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
  url: string;
  date: string;
  link: string;
  views: number;
}

function createData(
  url: string,
  date: string,
  link: string,
  views: number
): Data {
  return { url, date, link, views };
}

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

export const TableListClipperUser = () => {
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
    getDataTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataTable = async () => {
    const result = await listClipsOfUser();
    const mappedResult = result.data.map(
      (item: {
        videoDate: string;
        videoUrl: string;
        views: number;
        description: string;
      }) => {
        return createData(
          item.description,
          formatDate(item.videoDate),
          item.videoUrl,
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

  const formatDate = (date: string) => {
    const dataString = date;
    const data = new Date(dataString);
    const dia = data.getUTCDate().toString().padStart(2, "0");
    const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <>
      {rows.length > 0 && (
        <>
          <TableContainer id="table-list-clip-user">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Descrição do video</StyledTableCell>
                  <StyledTableCell align="right">Data</StyledTableCell>
                  <StyledTableCell align="right">Link</StyledTableCell>
                  <StyledTableCell align="right">Views</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
      )}
    </>
  );
};
