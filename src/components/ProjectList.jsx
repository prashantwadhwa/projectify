import React from "react";
import "./ProjectList.css";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects to show</p>}
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                    <Avatar src={user.photoURL}/>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
