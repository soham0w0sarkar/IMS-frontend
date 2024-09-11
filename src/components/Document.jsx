import { useState, useEffect } from "react";
import { IconDownload } from "@tabler/icons-react";
import PropTypes from "prop-types";
import "../css/document.css";
import { getDocuments } from "../utils/document";

const Document = ({ onDocumentSelect, searchQuery }) => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentDepartment, setCurrentDepartment] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocuments();
      if (response.status === "success") {
        setDocuments(response.data.documents);
        setFilteredDocuments(response.data.documents);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredDocs = documents.filter((doc) => {
        return (
          doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.docName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.standards.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.department.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredDocuments(filteredDocs);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDocumentClick = (document) => {
    if (currentDepartment === document.department) {
      setFilteredDocuments(documents);
      setCurrentDepartment(null);
    } else {
      const departmentDocs = documents.filter(
        (doc) => doc.department === document.department,
      );
      setFilteredDocuments(departmentDocs);
      setCurrentDepartment(document.department);
    }
    setSelectedDocumentId(null);
  };

  const handleCheckboxChange = (document, event) => {
    if (event.target.checked) {
      setSelectedDocumentId(document._id);
      onDocumentSelect(document);
    } else {
      setSelectedDocumentId(null);
      onDocumentSelect(null);
    }
  };

  return (
    <div className="document-list">
      <div className="document-header">
        <div className="header-item"></div>
        <div className="header-item">Number</div>
        <div className="header-item">Name</div>
        <div className="header-item">Description</div>
        <div className="header-item">Link</div>
        <div className="header-item">Version</div>
        <div className="header-item">Standard</div>
      </div>
      <div className="document-content">
        {currentDocuments.map((doc, index) => (
          <div
            key={index}
            className={`document-item ${
              selectedDocumentId === doc._id ? "selected" : ""
            }`}
            onClick={() => handleDocumentClick(doc)}
          >
            <div className="document-field">
              <input
                type="checkbox"
                checked={selectedDocumentId === doc._id}
                onChange={(event) => handleCheckboxChange(doc, event)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="document-field">{doc.docNumber}</div>
            <div className="document-field">{doc.docName}</div>
            <div className="document-field">{doc.description}</div>
            <div className="document-field">
              <a href={doc.downloadLink} target="_blank" download>
                <IconDownload size={20} />
              </a>
            </div>
            <div className="document-field">{doc.version}</div>
            <div className="document-field">{doc.standards}</div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <select
            className="items-per-page"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value={10}>10 items per page</option>
            <option value={20}>20 items per page</option>
            <option value={50}>50 items per page</option>
          </select>
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &laquo; Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

Document.propTypes = {
  onDocumentSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Document;
