import { Form, Table, Badge, Button, Modal } from "react-bootstrap";

import { useEffect, useState, useRef } from "react";

import { fetchTodos } from "../data/todos";
import { data } from "react-router-dom";

const Todo = () => {
  const newTitleRef = useRef();
  const newIdRef = useRef();
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPages] = useState(1);

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  useEffect(() => {
    const calNumPages = Math.ceil(todosRaw.length / itemsPerPage);
    setNumPages(calNumPages);
    const i = (curPage - 1) * itemsPerPage;
    const showTodos = todosRaw.slice(i, i + itemsPerPage);
    setTodos(showTodos);
  }, [todosRaw, itemsPerPage, curPage]);

  useEffect(() => {
    if (onlyWaiting) {
      const dataFilter = todosRaw.filter(
        (todoRaw) => todoRaw.completed === false
      );
      setTodos(dataFilter);
    } else {
      setTodos(todosRaw);
    }
    console.log(onlyWaiting);
  }, [onlyWaiting]);

  const waitingClicked = (id) => {
    console.log(id);
    const foundTodo = todos.find((todo) => {
      return todo.id === id;
    });
    foundTodo.completed = true;
    setTodosRaw([...todosRaw]);
  };

  const deleteClicked = (id) => {
    const remainTodoRaw = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(remainTodoRaw);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClicked = (id, title) => {
    console.log(id, title);
    if (title.trim() !== "") {
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false,
      };
      setTodosRaw([...todosRaw, newTodo]);
    }
    handleClose();
  };

  return (
    <div className="mt-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce((prev, todo) => {
                    return todo.id > prev ? todo.id : prev;
                  }, 0) + 1
                }
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="new todo"
                ref={newTitleRef}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveClicked(
                Number(newIdRef.current.value),
                newTitleRef.current.value
              );
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Form>
        <div className="d-flex justify-content-between align-item-center">
          <div className="d-flex">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              onChange={(e) => {
                setOnlyWaiting(e.target.checked);
              }}
            />
            Show only &nbsp;<Button variant="warning">Waitings</Button>
          </div>

          <Form.Select
            aria-label="Default select example"
            className="w-25"
            onChange={(e) => {
              setitemsPerPage(e.target.value);
            }}
          >
            <option value={5}>5 items per page </option>
            <option value={10}>10 items per page </option>
            <option value={50}>50 items per page </option>
            <option value={100}>100 items per page </option>
          </Form.Select>
        </div>
      </Form>

      <div>
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-center">TITLE</th>
              <th className="text-end" style={{ width: "12rem" }}>
                COMPLETED
                <button className="btn btn-primary ms-3" onClick={handleShow}>
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">
                    <Badge bg="secondary">{todo.id}</Badge>
                  </td>
                  <td>{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success">
                        done
                        <i className="bi bi-check"></i>
                      </Badge>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => waitingClicked(todo.id)}
                      >
                        waiting<i className="bi bi-clock"></i>
                      </Button>
                    )}
                      <Button className="ms-3"
                        variant="danger"
                        onClick={() => deleteClicked(todo.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurPages(1)}
          disabled={curPage === 1}
        >
          {" "}
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPages((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage} &nbsp;/&nbsp;{numPages}{" "}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPages((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPages(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
        &nbsp;
      </div>
    </div>
  );
};
export default Todo;
