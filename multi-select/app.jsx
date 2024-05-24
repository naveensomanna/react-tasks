import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { useRef } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [val, setValue] = useState("");
  const ref = useRef();
  const [showLists, setLists] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setFilterData(result);
    };

    fetchData("https://jsonplaceholder.typicode.com/users");
  }, []);

  useEffect(() => {
    function listener(e) {
      console.log("called");
      if (!e.target.closest(".lists")) {
        setLists(false);
      }
    }

    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value.trim()) {
      setLists(true);
      const fileterSelectedData = filterData.filter(
        (item) => !selectedData.some((d) => d.id === item.id)
      );
      const res = fileterSelectedData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(res);
    } else {
      const fileterSelectedData = data.filter(
        (item) => !selectedData.some((d) => d.id === item.id)
      );
      setFilterData(fileterSelectedData);
    }
  };

  const handleAdd = ({ name, id }) => {
    setSelectedData([...selectedData, { name, id }]);
    setLists(false);
    setValue("");
  };

  const handleRemove = (id) => {
    const res = selectedData.filter((item) => item.id !== id);
    setSelectedData(res);
  };

  return (
    <section>
      <div className="container">
        <div className="selected-container">
          {selectedData.map((item) => (
            <div
              key={item.id}
              className="selected"
              onClick={() => handleRemove(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <input
          type="text"
          onChange={handleChange}
          value={val}
          placeholder="search by name"
        />
        {showLists &&
          (filterData.length > 0 ? (
            <ul className="lists" ref={ref}>
              {filterData.map(({ name, id }) => (
                <li key={id} onClick={() => handleAdd({ name, id })}>
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data found</p>
          ))}
      </div>
    </section>
  );
}
