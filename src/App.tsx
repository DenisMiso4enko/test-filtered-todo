import "./App.css";

import { useCallback, useEffect, useState } from "react";
import { Filters, Todo, User } from "./types/types";
import TodoFilters from "./components/TodoFilters/TodoFilters";

import Pagination from "./components/Pagination/Pagination";
import TodoTable from "./components/TodoFilters/TodoTable";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ todos: Todo[]; users: User[] }>({
    todos: [],
    users: [],
  });
  const [filters, setFilters] = useState<Filters>({
    title: "",
    status: "",
    sortBy: "",
    sortOrder: "",
    currentPage: 1,
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [todosResponse, usersResponse] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/todos"),
        fetch("https://jsonplaceholder.typicode.com/users"),
      ]);

      const todosData = await todosResponse.json();
      const usersData = await usersResponse.json();

      setIsLoading(false);
      setData({ todos: todosData, users: usersData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = useCallback(
    (field: keyof Filters, value: string | number) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: value,
        currentPage: 1,
      }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      currentPage: page,
    }));
  }, []);

  const applyFilters = () => {
    return data?.todos
      ?.filter((todo: Todo) => todo.title.includes(filters.title))
      .filter(
        (todo: Todo) =>
          filters.status === "" ||
          todo.completed === (filters.status === "true")
      )
      .sort((a: Todo, b: Todo) => {
        if (filters.sortBy === "id") {
          return filters.sortOrder === "asc" ? a.id - b.id : b.id - a.id;
        } else if (filters.sortBy === "title") {
          return filters.sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
  };

  const filteredTodos = applyFilters();
  const pageSize = 15;
  const totalPages = Math.ceil(filteredTodos.length / pageSize);
  const startIndex = (filters.currentPage - 1) * pageSize;
  const visibleTodos = filteredTodos.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container">
      <TodoFilters filters={filters} onFilterChange={handleFilterChange} />
      <TodoTable
        isLoading={isLoading}
        data={data}
        visibleTodos={visibleTodos}
        totalPages={totalPages}
        currentPage={filters.currentPage}
        onPageChange={handlePageChange}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={filters.currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
