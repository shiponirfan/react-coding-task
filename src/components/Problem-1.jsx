import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formStatus, setFormStatus] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formStatus")) || [];
    setFormStatus(storedData);
    setOriginalData(storedData);
  }, []);

  const handleClick = (val) => {
    setShow(val);
    const filteredAndSortedData = filterByStatus(val);
    setFormStatus(filteredAndSortedData);
  };

  const handleFormStatus = (e) => {
    e.preventDefault();
    const status = {
      name: e.target.name.value,
      status: e.target.status.value,
    };
    setFormStatus([...formStatus, status]);
    setOriginalData([...originalData, status]);
    localStorage.setItem(
      "formStatus",
      JSON.stringify([...originalData, status])
    );
  };

  const filterByStatus = (val) => {
    switch (val) {
      case "active":
        return originalData.filter((status) => status.status === "Active");
      case "completed":
        return originalData.filter((status) => status.status === "Completed");
      case "all":
        return originalData.slice().sort((a, b) => {
          if (a.status === "Active" && b.status !== "Active") return -1;
          if (a.status === "Completed" && b.status !== "Completed") return 1;
          return 0;
        });
      default:
        return formStatus;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleFormStatus}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {formStatus.map((status, index) => (
                <tr key={index}>
                  <td>{status.name}</td>
                  <td>{status.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
