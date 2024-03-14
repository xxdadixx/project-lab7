/* eslint-disable no-unused-vars */
// CRUDClass.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { read, remove } from "../function/CRUDClassFunc";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../css/CRUDClass.css";

const CRUDClass = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    studentID: "",
    faculty: "",
    branch: "",
    year: "",
    invalidCheck: false,
  });

  // useState hook to manage form validation state
  const [validated, setValidated] = useState(false);

  // useState hook to manage checkbox state
  const [checked, setChecked] = useState(false);

  // Function to handle checkbox change event
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  // Function to load data from the backend
  const loadData = async () => {
    read()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // useEffect hook to load data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadData();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle form input change
  const handleChange = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  // Function to validate the format of form data
  const validateDataFormat = () => {
    const studentIDRegex = /^[0-9]{11}-[0-9]$/;
    const nameRegex = /^[a-zA-Zก-๏\s]{3,}$/;

    if (!data || typeof data !== "object") {
      console.log("Invalid data object");
      return false;
    }

    if (
      !data.firstname ||
      !data.lastname ||
      !nameRegex.test(data.firstname) ||
      !nameRegex.test(data.lastname)
    ) {
      console.log("Name format incorrect");
      return false;
    }

    if (!data.studentID || !studentIDRegex.test(data.studentID)) {
      console.log("Student ID format incorrect");
      return false;
    }

    if (
      data.faculty !== undefined &&
      (typeof data.faculty !== "string" || !data.faculty.trim())
    ) {
      console.log("Faculty cannot be blank");
      return false;
    }

    if (
      data.branch !== undefined &&
      (typeof data.branch !== "string" || !data.branch.trim())
    ) {
      console.log("Branch cannot be blank");
      return false;
    }

    if (
      data.year !== undefined &&
      (typeof data.year !== "string" || !data.year.trim())
    ) {
      console.log("Year cannot be blank");
      return false;
    }

    // Add more checks for other fields if needed

    console.log("All format checks passed");
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);

    // Additional validation using regular expressions
    const isValidFormat = validateDataFormat();

    if (!form.checkValidity() || !isValidFormat || !checked) {
      e.stopPropagation();
      // Display an error message or handle the incorrect format
      console.error("Invalid form or data format");
      return; // Stop form submission if validation fails
    }

    try {
      const res = await axios.post("http://localhost:5000/api/crudclass", data);
      console.log(res);
      handleSubmitSuccess();
      window.location.href = "/crudclass";
    } catch (error) {
      // Handle data insertion failure
      console.error("Error inserting data:", error);
      handleSubmitFail();
    }
  };

  // Function to handle deletion of data
  const handleRemove = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "คุณแน่ใจไหม?",
        text: "คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยืนยันที่จะลบ",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await remove(id);
            console.log(res);
            handleDeleteSuccess();
            loadData();
            swalWithBootstrapButtons.fire({
              title: "ลบข้อมูลสำเร็จ!",
              text: "ข้อมูลถูกลบเรียบร้อย",
              icon: "success",
            });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "เกิดข้อผิดพลาดขณะลบข้อมูล",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "ยกเลิก",
            text: "ข้อมูลของคุณจะไม่ถูกลบ)",
            icon: "error",
          });
        }
      });
  };

  // Function to display alert messages
  const showAlert = (message, type) => {
    Swal.fire({
      text: message,
      icon: type,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000, // Adjust the timer as needed
    });
  };

  // Function to handle successful form submission
  const handleSubmitSuccess = () => {
    console.log("Insert success!");
    showAlert("เพิ่มข้อมูลเรียบร้อยแล้ว!", "success");
  };

  // Function to handle failed form submission
  const handleSubmitFail = () => {
    console.log("An error occurred while adding information.");
    showAlert("เกิดข้อผิดพลาดขณะเพิ่มข้อมูล", "error");
  };

  // Function to handle successful delete
  const handleDeleteSuccess = () => {
    console.log("Delete success!");
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // useState hooks to manage table resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  // Function to handle mouse move event during table resizing
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = startWidth + (e.pageX - startX);
      if (newWidth > 0) {
        e.target.style.width = newWidth + "px";
      }
    }
  };

  // Function to handle mouse up event during table resizing
  const handleMouseUp = () => {
    setIsResizing(false);

    // Reset cursor to default when resizing is finished
    document.body.style.cursor = "auto";
  };

  // Function to handle mouse down event during table resizing
  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.pageX);
    setStartWidth(e.target.clientWidth);

    // Change cursor to "grabbing" while resizing
    document.body.style.cursor = "grabbing";
  };

  const [navDisabled, setNavDisabled] = useState(false);

  const handleAddDataButtonClick = () => {
    setNavDisabled(true); // Disable the Nav component when the button is pressed
  };

  return (
    <>
      {!navDisabled && <Nav />} {/* Render Nav component only if navDisabled is false */}
      <div id="page" className="">
        <section id="CRUDTable" className="section-with-overlay-crud">
          <div className="warpper">
            <div className="container">
              <h1 className="title pb-3">ข้อมูลนักศึกษาในชั้นเรียน</h1>
              <button
                type="button"
                className="btn btn-primary mb-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={handleAddDataButtonClick}
              >
                เพิ่มข้อมูลนักศึกษา
              </button>

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h2 className="modal-title fs-5" id="InsertFormLabel">
                        เพิ่มข้อมูลนักศึกษา
                      </h2>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          window.location.href = "/crudclass";
                        }}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        className="container needs-validation"
                        id="validationForm"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <legend></legend>
                        <div className="mb-3">
                          <label
                            htmlFor="validationFirstname"
                            className="form-label"
                          >
                            ชื่อ
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationFirstname"
                            name="firstname"
                            placeholder=""
                            pattern="^[a-zA-Zก-๏\s]{3,}$"
                            required
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            กรุณาใส่ชื่อที่ถูกต้อง
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="validationLastname"
                            className="form-label"
                          >
                            นามสกุล
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            className="form-control"
                            id="validationLastname"
                            pattern="^[a-zA-Zก-๏\s]{3,}$"
                            required
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            กรุณาใส่นามสกุลที่ถูกต้อง
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="validationStudentID"
                            className="form-label"
                          >
                            รหัสนักศึกษา
                          </label>
                          <input
                            type="text"
                            name="studentID"
                            className="form-control"
                            id="validationStudentID"
                            pattern="^[0-9]{11}-[0-9]$"
                            required
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">
                            กรุณาใส่รหัสนักศึกษาที่ถูกต้อง
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="validationFaculty"
                            className="form-label"
                          >
                            คณะ
                          </label>
                          <select
                            className="form-select"
                            id="validationFaculty"
                            name="faculty"
                            required
                            onChange={handleChange}
                            value={data.faculty}
                          >
                            <option disabled value="">
                              เลือกคณะ
                            </option>
                            <option>บริหารธุรกิจและศิลปศาสตร์</option>
                            <option>วิทยาศาสตร์และเทคโนโลยีการเกษตร</option>
                            <option>วิศวกรรมศาสตร์</option>
                            <option>ศิลปกรรมและสถาปัตยกรรมศาสตร์</option>
                            <option>วิทยาลัยเทคโนโลยีและสหวิทยาการ</option>
                          </select>
                          <div className="invalid-feedback">กรุณาเลือกคณะ</div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="validationBranch"
                            className="form-label"
                          >
                            สาขา
                          </label>
                          <select
                            className="form-select"
                            id="validationBranch"
                            name="branch"
                            required
                            onChange={handleChange}
                            value={data.branch}
                          >
                            <option disabled value="">
                              เลือกสาขา
                            </option>
                            <option disabled className="bg-secondary-subtle">
                              บริหารธุรกิจและศิลปศาสตร์
                            </option>
                            <option>บธ.บ. ระบบสารสนเทศทางธุรกิจ</option>
                            <option>บธ.บ. การจัดการธุรกิจระหว่างประเทศ</option>
                            <option>บธ.บ. บริหารธุรกิจ</option>
                            <option>
                              บธ.บ. การจัดการโลจิสติกส์และซัพพลายเชน
                            </option>
                            <option>บช.บ. บัญชีบัณฑิต</option>
                            <option>ศศ.บ. ภาษาอังกฤษเพื่อการสื่อสารสากล</option>
                            <option>ศศ.บ. การท่องเที่ยวและการบริการ</option>
                            <option disabled className="bg-secondary-subtle">
                              วิทยาศาสตร์และเทคโนโลยีการเกษตร
                            </option>
                            <option>วท.บ. เทคโนโลยีสารสนเทศ</option>
                            <option>วท.บ. วิทยาการคอมพิวเตอร์</option>
                            <option>
                              วท.บ. วิทยาศาสตร์และเทคโนโลยีการอาหาร
                            </option>
                            <option>วท.บ. เครื่องจักรกลเกษตร</option>
                            <option>วท.บ. ธุรกิจอาหารและโภชนาการ</option>
                            <option>วท.บ. เกษตรศาสตร์</option>
                            <option disabled className="bg-secondary-subtle">
                              วิศวกรรมศาสตร์
                            </option>
                            <option>วศ.บ. วิศวกรรมเครื่องกล</option>
                            <option>วศ.บ. วิศวกรรมเหมืองแร่</option>
                            <option>วศ.บ. วิศวกรรมเกษตรและชีวภาพ</option>
                            <option>วศ.บ. วิศวกรรมคอมพิวเตอร์</option>
                            <option>คอ.บ. วิศวกรรมคอมพิวเตอร์</option>
                            <option>วศ.บ. วิศวกรรมไฟฟ้า</option>
                            <option>
                              วศ.บ. วิศวกรรมอิเล็กทรอนิกส์และระบบควบคุมอัตโนมัติ
                            </option>
                            <option>วศ.บ. วิศวกรรมโยธา</option>
                            <option>วศ.บ. วิศวกรรมสิ่งแวดล้อม</option>
                            <option>วศ.บ. วิศวกรรมอุตสาหการ</option>
                            <option>วศ.บ. วิศวกรรมแม่พิมพ์</option>
                            <option disabled className="bg-secondary-subtle">
                              ศิลปกรรมและสถาปัตยกรรมศาสตร์
                            </option>
                            <option>ทล.บ. เซรามิก</option>
                            <option>
                              ทล.บ. เทคโนโลยีการพิมพ์และบรรจุภัณฑ์
                            </option>
                            <option>ศป.บ. ออกแบบสื่อสาร</option>
                            <option>ศป.บ. ออกแบบอุตสาหกรรม</option>
                            <option>ศป.บ. สิ่งทอและเครื่องประดับ</option>
                            <option>ศล.บ. ทัศนศิลป์</option>
                            <option>สถ.บ. สถาปัตยกรรม</option>
                            <option>สถ.บ. สถาปัตยกรรมภายใน</option>
                            <option disabled className="bg-secondary-subtle">
                              วิทยาลัยเทคโนโลยีและสหวิทยาการ
                            </option>
                            <option>วศ.บ. การผลิตและนวัตกรรมอาหาร</option>
                            <option>วศ.บ. วิศวกรรมเมคคาทรอนิกส์</option>
                            <option>
                              วศ.บ. วิศวกรรมและนวัตกรรมการผลิตอาหาร
                            </option>
                          </select>
                          <div className="invalid-feedback">กรุณาเลือกสาขา</div>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="validationYear"
                            className="form-label"
                          >
                            ชั้นปี
                          </label>
                          <select
                            className="form-select"
                            id="validationYear"
                            name="year"
                            required
                            onChange={handleChange}
                            value={data.year} // Use value prop to set the selected value
                          >
                            <option disabled value="">
                              เลือกชั้นปี
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                          <div className="invalid-feedback">
                            กรุณาเลือกชั้นปี
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="invalidCheck"
                              onChange={handleCheckboxChange}
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck"
                            >
                              ยืนยันข้อมูล
                            </label>
                            <div className="invalid-feedback">
                              กรุณายืนยันข้อมูล
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              window.location.reload();
                            }}
                            data-bs-dismiss="modal"
                          >
                            ปิด
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => {
                              const form =
                                document.getElementById("validationForm");
                              form.classList.add("was-validated");
                              handleSubmit(e);
                            }}
                          >
                            เพิ่มข้อมูล
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <table className="table table-striped table-bordered table-responsive bordered highlight centered hoverable z-depth-2">
                <thead className="thead-dark">
                  <tr>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      #
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      ชื่อ
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      นามสกุล
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      รหัสนักศึกษา
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      คณะ
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      สาขา
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      ชั้นปี
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      วันที่/เวลาที่เพิ่ม
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      วันที่/เวลาที่แก้ไข
                    </th>
                    <th
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.studentID}</td>
                        <td>{item.faculty}</td>
                        <td>{item.branch}</td>
                        <td>{item.year}</td>
                        <td>{formatTimestamp(item.createdAt)}</td>
                        <td>{formatTimestamp(item.updatedAt)}</td>
                        <td>
                          <Link
                            to={"/crudclassedit/" + item._id}
                            className="mx-1"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <FaEdit
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                          <FaTrashAlt
                            onClick={() => handleRemove(item._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CRUDClass;
