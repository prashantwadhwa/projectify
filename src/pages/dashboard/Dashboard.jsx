import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            if (
              document.assignedUsersList &&
              document.assignedUsersList.length > 0
            ) {
              document.assignedUsersList.forEach((u) => {
                if (user.uid === u.id) {
                  assignedToMe = true;
                }
              });
            }
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
