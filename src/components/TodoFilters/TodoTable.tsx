import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Todo, User } from "../../types/types";
import { Loader } from "../Loader/Loader";

interface TodoTableProps {
  isLoading: boolean;
  data: { todos: Todo[]; users: User[] };
  visibleTodos: Todo[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({
  isLoading,
  data,
  visibleTodos,
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleTodos.map((todo: Todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>
                    {
                      data?.users?.find(
                        (user: User) => user?.id === todo?.userId
                      )?.username
                    }
                  </TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.completed.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TodoTable;
