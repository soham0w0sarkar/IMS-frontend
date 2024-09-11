import { useState, useEffect } from "react";
import { getUser } from "../utils/user";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import Search from "../components/Search";
import Document from "../components/Document";
import Footer from "../components/Footer";
import "../css/mainPage.css";

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // Manage active tab state

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser === null) {
        window.location.href = "/login";
      } else {
        setUser(fetchedUser);
      }
    };

    fetchUser();
  }, []);

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <Header user={user} />
      <NavBar onTabChange={handleTabChange} />
      {activeTab === "home" ? (
        <Home />
      ) : (
        <>
          <Search
            user={user}
            selectedDocument={selectedDocument}
            onSearchQueryChange={handleSearchQueryChange}
          />
          <Document
            onDocumentSelect={handleDocumentSelect}
            searchQuery={searchQuery}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default MainPage;
