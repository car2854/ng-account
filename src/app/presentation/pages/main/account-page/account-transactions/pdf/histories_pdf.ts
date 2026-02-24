import { Table, TableCell } from './../../../../../../../../node_modules/@types/pdfmake/interfaces.d';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AccountModel } from '../../../../../../core/models/account-model';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { TableInterface } from '../../../../../../shared/components/table-component/table.component';
pdfMake.vfs = pdfFonts.vfs;

interface Props {
  account: AccountModel;
  table: TableInterface;
}

export const generateHistoriesPdf = ({account, table}: Props) => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: `Historial de la cuenta ${account.title}`, style: 'header' },
      { text: account.description },
      { text: formatDateTime(account.createdAt) },

      {
        table: {
          widths: table.headers.map((_) => '*'),

          body: [table.headers, ...getBody(table.body)],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('example.pdf');
};

const getBody = (body = [] as unknown[][]): TableCell[][] => {
  return body.map((b) => b) as TableCell[][];
};


const formatDateTime = (time: Date | string | number): string => {
  const date = new Date(time);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
