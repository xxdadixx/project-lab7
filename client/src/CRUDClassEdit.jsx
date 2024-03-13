/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { readId } from "./function/CRUDClassFunc";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";

function CRUDClassEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    studentID: "",
    faculty: "",
    branch: "",
    year: "",
    invalidCheck: false,
  });

  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalVisible] = useState(true); // State to track modal visibility

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    return () => {
      // Close the modal when the component is unmounted
      const modal = document.getElementById("staticBackdrop");
      const modalInstance = Modal.getInstance(modal); // Use Modal from bootstrap namespace
      if (modalInstance) {
        modalInstance.hide();
      }
    };
  }, []);

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    try {
      const res = await readId(id);
      setData(res.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

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
      const res = await axios.put(
        "http://localhost:5000/api/crudclass/" + params.id,
        data
      );
      console.log(res);
      handleSubmitSuccess();
      navigate("/crudclass");
    } catch (error) {
      // Handle data insertion failure
      console.error("Error inserting data:", error);
      handleSubmitFail();
    }
  };

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

  const handleSubmitSuccess = () => {
    console.log("Update success!");
    showAlert("อัพเดตข้อมูลเรียบร้อยแล้ว!", "success");
  };

  const handleSubmitFail = () => {
    console.log("An error occurred while adding information.");
    showAlert("เกิดข้อผิดพลาดขณะเพิ่มข้อมูล", "error");
  };

  return (
    <>
      {modalVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="staticBackdropLabel"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  แก้ไขข้อมูลนักศึกษา
                </h1>
                <Link to={"/crudclass"} className="btn-close"></Link>
              </div>
              <div className="modal-body">
                <form
                  className="container"
                  id="validationForm"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <legend></legend>
                  <div className="mb-3">
                    <label htmlFor="validationFirstname" className="form-label">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationFirstname"
                      name="firstname"
                      value={data.firstname}
                      pattern="^[a-zA-Zก-๏\s]{3,}$"
                      placeholder=""
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      กรุณาใส่ชื่อที่ถูกต้อง
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="validationLastname" className="form-label">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={data.lastname}
                      pattern="^[a-zA-Zก-๏\s]{3,}$"
                      className="form-control"
                      id="validationLastname"
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      กรุณาใส่นามสกุลที่ถูกต้อง
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="validationStudentID" className="form-label">
                      รหัสนักศึกษา
                    </label>
                    <input
                      type="text"
                      name="studentID"
                      value={data.studentID}
                      pattern="^[0-9]{11}-[0-9]"
                      className="form-control"
                      id="validationStudentID"
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      กรุณาใส่รหัสนักศึกษาที่ถูกต้อง
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="validationFaculty" className="form-label">
                      คณะ
                    </label>
                    <select
                      className="form-select"
                      id="validationFaculty"
                      name="faculty"
                      onChange={handleChange}
                      value={data.faculty} // Use value prop to set the selected value
                      required
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
                    <label htmlFor="validationBranch" className="form-label">
                      สาขา
                    </label>
                    <select
                      className="form-select"
                      id="validationBranch"
                      name="branch"
                      onChange={handleChange}
                      value={data.branch} // Use value prop to set the selected value
                      required
                    >
                      <option disabled value="">
                        เลือกสาขา
                      </option>
                      <option disabled className="bg-secondary-subtle" value="">
                        บริหารธุรกิจและศิลปศาสตร์
                      </option>
                      <option>บธ.บ. ระบบสารสนเทศทางธุรกิจ</option>
                      <option>บธ.บ. การจัดการธุรกิจระหว่างประเทศ</option>
                      <option>บธ.บ. บริหารธุรกิจ</option>
                      <option>บธ.บ. การจัดการโลจิสติกส์และซัพพลายเชน</option>
                      <option>บช.บ. บัญชีบัณฑิต</option>
                      <option>ศศ.บ. ภาษาอังกฤษเพื่อการสื่อสารสากล</option>
                      <option>ศศ.บ. การท่องเที่ยวและการบริการ</option>
                      <option disabled className="bg-secondary-subtle" value="">
                        วิทยาศาสตร์และเทคโนโลยีการเกษตร
                      </option>
                      <option>วท.บ. เทคโนโลยีสารสนเทศ</option>
                      <option>วท.บ. วิทยาการคอมพิวเตอร์</option>
                      <option>วท.บ. วิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                      <option>วท.บ. เครื่องจักรกลเกษตร</option>
                      <option>วท.บ. ธุรกิจอาหารและโภชนาการ</option>
                      <option>วท.บ. เกษตรศาสตร์</option>
                      <option disabled className="bg-secondary-subtle" value="">
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
                      <option disabled className="bg-secondary-subtle" value="">
                        ศิลปกรรมและสถาปัตยกรรมศาสตร์
                      </option>
                      <option>ทล.บ. เซรามิก</option>
                      <option>ทล.บ. เทคโนโลยีการพิมพ์และบรรจุภัณฑ์</option>
                      <option>ศป.บ. ออกแบบสื่อสาร</option>
                      <option>ศป.บ. ออกแบบอุตสาหกรรม</option>
                      <option>ศป.บ. สิ่งทอและเครื่องประดับ</option>
                      <option>ศล.บ. ทัศนศิลป์</option>
                      <option>สถ.บ. สถาปัตยกรรม</option>
                      <option>สถ.บ. สถาปัตยกรรมภายใน</option>
                      <option disabled className="bg-secondary-subtle" value="">
                        วิทยาลัยเทคโนโลยีและสหวิทยาการ
                      </option>
                      <option>วศ.บ. การผลิตและนวัตกรรมอาหาร</option>
                      <option>วศ.บ. วิศวกรรมเมคคาทรอนิกส์</option>
                      <option>วศ.บ. วิศวกรรมและนวัตกรรมการผลิตอาหาร</option>
                    </select>
                    <div className="invalid-feedback">กรุณาเลือกสาขา</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="validationYear" className="form-label">
                      ชั้นปี
                    </label>
                    <select
                      className="form-select"
                      id="validationYear"
                      name="year"
                      onChange={handleChange}
                      value={data.year} // Use value prop to set the selected value
                      required
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
                      กรุณาเลือกชั้นปีที่ถูกต้อง
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
                      <div className="invalid-feedback">กรุณายืนยันข้อมูล</div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Link to={"/crudclass"} className="btn btn-secondary">
                      ปิด
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => {
                        const form = document.getElementById("validationForm");
                        form.classList.add("was-validated");
                        handleSubmit(e);
                      }}
                    >
                      แก้ไขข้อมูล
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CRUDClassEdit;
