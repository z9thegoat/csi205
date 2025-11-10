import { useEffect} from "react";

const Value = ({name, initial, type, value, setValue}) => {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     setValue(initial || 0);
//   }, [initial]);

  return (
    <div
      className="border border-black border-3 rounded-3 m-auto p-2 bg-secondary-subtle mt-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{ name || 'Value'}</h1>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button
          className="btn btn-danger"
          onClick={() => setValue((p) => p - 1)}
        >
          -
        </button>
        <div className="fs-3 fw-bold">{ type === 'real' ? value.toFixed(2):  Math.round(value)}</div>
        <button
          className="btn btn-success"
          onClick={() => setValue((p) => p + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Value;