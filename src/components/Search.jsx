import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../css/search.css";
import { IconSearch } from "@tabler/icons-react";
import Modal from "../components/Modal.jsx";
import {
  addDocument,
  editDocument,
  deleteDocument,
} from "../utils/document.js";
import { addUser, release } from "../utils/user.js";

const Search = ({ user, selectedDocument, onSearchQueryChange }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isManageUsersModalOpen, setManageUsersModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    docNumber: "",
    docName: "",
    description: "",
    version: "",
    standards: "",
    department: "",
    file: null,
    releaseDate: "",
  });

  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    role: "User",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedDocument && isEditModalOpen) {
      setDocumentForm({
        docNumber: selectedDocument.docNumber,
        docName: selectedDocument.docName,
        description: selectedDocument.description,
        version: selectedDocument.version,
        standards: selectedDocument.standards,
        department: selectedDocument.department,
        file: null,
        releaseDate: selectedDocument.releaseDate || "",
      });
    }
  }, [selectedDocument, isEditModalOpen]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleDocumentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setDocumentForm({ ...documentForm, [name]: files[0] });
    } else {
      setDocumentForm({ ...documentForm, [name]: value });
    }
  };

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleAddDocument = async () => {
    const formData = new FormData();
    for (const key in documentForm) {
      formData.append(key, documentForm[key]);
    }

    const response = await addDocument(formData);
    if (response.status === "success") {
      setAddModalOpen(false);
    }
  };

  const handleEditDocument = async () => {
    const formData = new FormData();
    for (const key in documentForm) {
      formData.append(key, documentForm[key]);
    }

    const response = await editDocument(selectedDocument._id, formData);
    if (response.status === "success") {
      setEditModalOpen(false);
    }
  };

  const handleDeleteDocument = async () => {
    const response = await deleteDocument(selectedDocument._id);
    if (response.status === "success") {
      setDeleteConfirmModalOpen(false);
    }
  };

  const handleReleaseDocument = async () => {
    const response = await release(selectedDocument._id);
    if (response.status === "success") {
      alert("Document released successfully");
    } else {
      alert("Failed to release document");
    }
  };

  const handleManageUsers = async () => {
    setErrorMessage("");
    const formData = {
      fullName: userForm.fullName,
      email: userForm.email,
      password: userForm.password,
      department: userForm.department,
      role: userForm.role,
    };
    const response = await addUser(formData);
    if (response) {
      setManageUsersModalOpen(false);
    } else {
      setErrorMessage(
        "Failed to add user. Please check the details and try again.",
      );
    }
  };

  const handleSearchChange = (event) => {
    onSearchQueryChange(event.target.value);
  };

  return (
    <div className="search-container">
      <IconSearch className="search-icon" onClick={toggleSearchBar} />
      <div className={`search-bar-container ${showSearchBar ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Search based on Name, Title, Department, Date..."
          className="search-bar"
          onChange={handleSearchChange}
        />
      </div>
      <div className="search-actions">
        {user && user.role === "Admin" && (
          <>
            <button
              className="action-button add-button"
              onClick={() => setAddModalOpen(true)}
            >
              Add Document
            </button>
            {selectedDocument && (
              <>
                <button
                  className="action-button edit-button"
                  onClick={() => setEditModalOpen(true)}
                >
                  Edit Document
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => setDeleteConfirmModalOpen(true)}
                >
                  Delete Document
                </button>
                <button
                  className="action-button release-button"
                  onClick={handleReleaseDocument}
                >
                  Release Document
                </button>
              </>
            )}
            <button
              className="action-button user-button"
              onClick={() => setManageUsersModalOpen(true)}
            >
              Manage Users
            </button>
          </>
        )}
      </div>

      <Modal
        title="Add Document"
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      >
        <form>
          <div className="modal-form-group">
            <input
              type="text"
              name="docNumber"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.docNumber}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Document Number</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="docName"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.docName}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Document Name</label>
          </div>
          <div className="modal-form-group">
            <textarea
              name="description"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.description}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Description</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="version"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.version}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Version</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="standards"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.standards}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Standards</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="department"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.department}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Department</label>
          </div>
          <div className="modal-form-group">
            <input
              type="date"
              name="releaseDate"
              className="modal-form-control"
              value={documentForm.releaseDate}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Release Date</label>
          </div>
          <div className="modal-form-group">
            <input
              type="file"
              name="file"
              className="modal-form-control"
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">File</label>
          </div>
          <button
            type="button"
            className="modal-submit-button"
            onClick={handleAddDocument}
          >
            Add Document
          </button>
        </form>
      </Modal>

      <Modal
        title="Edit Document"
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <form>
          <div className="modal-form-group">
            <input
              type="text"
              name="docNumber"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.docNumber}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Document Number</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="docName"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.docName}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Document Name</label>
          </div>
          <div className="modal-form-group">
            <textarea
              name="description"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.description}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Description</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="version"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.version}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Version</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="standards"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.standards}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Standards</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="department"
              className="modal-form-control"
              placeholder=" "
              value={documentForm.department}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Department</label>
          </div>
          <div className="modal-form-group">
            <input
              type="date"
              name="releaseDate"
              className="modal-form-control"
              value={documentForm.releaseDate}
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">Release Date</label>
          </div>
          <div className="modal-form-group">
            <input
              type="file"
              name="file"
              className="modal-form-control"
              onChange={handleDocumentChange}
            />
            <label className="modal-form-label">File</label>
          </div>
          <button
            type="button"
            className="modal-submit-button"
            onClick={handleEditDocument}
          >
            Edit Document
          </button>
        </form>
      </Modal>

      <Modal
        title="Confirm Delete"
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setDeleteConfirmModalOpen(false)}
      >
        <p>Are you sure you want to delete this document?</p>
        <button
          type="button"
          className="modal-submit-button"
          onClick={handleDeleteDocument}
        >
          Confirm Delete
        </button>
      </Modal>

      <Modal
        title="Manage Users"
        isOpen={isManageUsersModalOpen}
        onClose={() => setManageUsersModalOpen(false)}
      >
        <form>
          <div className="modal-form-group">
            <input
              type="text"
              name="fullName"
              className="modal-form-control"
              placeholder=" "
              value={userForm.fullName}
              onChange={handleUserChange}
            />
            <label className="modal-form-label">Full Name</label>
          </div>
          <div className="modal-form-group">
            <input
              type="email"
              name="email"
              className="modal-form-control"
              placeholder=" "
              value={userForm.email}
              onChange={handleUserChange}
            />
            <label className="modal-form-label">Email</label>
          </div>
          <div className="modal-form-group">
            <input
              type="password"
              name="password"
              className="modal-form-control"
              placeholder=" "
              value={userForm.password}
              onChange={handleUserChange}
            />
            <label className="modal-form-label">Password</label>
          </div>
          <div className="modal-form-group">
            <input
              type="text"
              name="department"
              className="modal-form-control"
              placeholder=" "
              value={userForm.department}
              onChange={handleUserChange}
            />
            <label className="modal-form-label">Department</label>
          </div>
          <div className="modal-form-group">
            <select
              name="role"
              className="modal-form-control"
              value={userForm.role}
              onChange={handleUserChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <label className="modal-form-label">Role</label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="button"
            className="modal-submit-button"
            onClick={handleManageUsers}
          >
            Add User
          </button>
        </form>
      </Modal>
    </div>
  );
};

Search.propTypes = {
  user: PropTypes.object,
  selectedDocument: PropTypes.object,
  onSearchQueryChange: PropTypes.func.isRequired,
};

export default Search;
