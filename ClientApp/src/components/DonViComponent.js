import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function DonVi() {
  const baseUrl = "https://localhost:5001/DonVi";
  const [data, setData] = useState([]);
  const [modalInserted, setModalInserted] = useState(false);
  const [modalEdited, setModalEdited] = useState(false);
  const [modalDeleted, setModalDeleted] = useState(false);
  const [donViSelected, setDonViSelected] = useState({
    donViId: "",
    tenDonVi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonViSelected({
      ...donViSelected,
      [name]: value,
    });
    console.log(donViSelected);
  };

  const addModalInserted = () => {
    setModalInserted(!modalInserted);
  };

  const addModalEdited = () => {
    setModalEdited(!modalEdited);
  };

  const addModalDeleted = () => {
    setModalDeleted(!modalDeleted);
  };

  const petitionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const petitionPost = async () => {
    delete donViSelected.donViId;
    await axios
      .post(baseUrl, donViSelected)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const petitionPut = async () => {
    await axios
      .put(baseUrl + "/" + donViSelected.donViId, donViSelected)
      .then((response) => {
        var request = response.data;
        data.map((donVi) => {
          if (donVi.donViId === donViSelected.donViId) {
            donVi.tenDonVi = request.tenDonVi;
          }
        });
        addModalEdited();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const petitionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + donViSelected.donViId)
      .then(response => {
        setData(data.filter(donVi=>donVi.donViId!==response.data));
        addModalDeleted();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectionDonVi = (donVi, cas) => {
    setDonViSelected(donVi);
    cas === "Edit" ? addModalEdited() : addModalDeleted();
  };

  useEffect(() => {
    petitionGet();
  }, []);
  return (
    <div className="container">
      <br />
      <button onClick={() => addModalInserted()} className="btn btn-success">
        Thêm Đơn Vị Mới
      </button>
      <Modal isOpen={modalInserted}>
        <ModalHeader>Thêm mới Đơn Vị</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Mã Đơn Vị</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="maDonVi"
              onChange={handleChange}
              readOnly
            />
            <br />
            <label>Tên Đơn Vị</label>
            <input
              type="text"
              className="form-control"
              name="tenDonVi"
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => petitionPost()}>
            Save
          </button>
          <button className="btn btn-danger" onClick={() => addModalInserted()}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdited}>
        <ModalHeader>Chỉnh Sửa Đơn Vị</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Mã Đơn Vị</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="maDonVi"
              readOnly
              value={donViSelected && donViSelected.donViId}
            />
            <br />
            <label>Tên Đơn Vị</label>
            <input
              type="text"
              className="form-control"
              name="tenDonVi"
              onChange={handleChange}
              value={donViSelected && donViSelected.tenDonVi}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => petitionPut()}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => addModalEdited()}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDeleted}>
        <ModalHeader>Xóa Đơn Vị</ModalHeader>
        <ModalBody>Bạn có muốn xóa đơn vị này hay không?</ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>petitionDelete()}>Yes</button>
          <button className="btn btn-danger" onClick={() => addModalDeleted()}>
            No
          </button>
        </ModalFooter>
      </Modal>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Mã Đơn Vị</th>
            <th>Tên Đơn Vị</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((donVi) => (
            <tr key={donVi.donViId}>
              <td>{donVi.donViId}</td>
              <td>{donVi.tenDonVi}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => selectionDonVi(donVi, "Edit")}
                >
                  Edit
                </button>{" "}
                &nbsp;
                <button className="btn btn-danger" onClick={()=>selectionDonVi(donVi, "Delete")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
