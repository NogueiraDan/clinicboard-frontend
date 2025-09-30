import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  export default function SkeletonTable() {
    const skeletonRows = Array.from({ length: 5 });
  
    return (
      <Table className="cursor-pointer">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }