import React, { useEffect, useState } from "react";
import "./Create.css";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

const Create = () => {
  const navigate = useNavigate();

  
  const { addDocument, response } = useFirestore("projects");

  const { user } = useAuthContext();

  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please select at least one user");
      return;
    }
    if (dueDate < new Date().toISOString().split("T")[0]) {
      setFormError("Due date cannot be in the past");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    // Create a Firestore Timestamp from the JavaScript Date object
    const dueDateTimestamp = timestamp.fromDate(new Date(dueDate));

    const project = {
      name,
      details,
      category: category.value,
      dueDate: dueDateTimestamp,
      comments: [],
      createdBy,
      assignedUsersList,
      
    };

    await addDocument(project);
    if(!response.error){
      navigate("/");
    }
  };

  console.log(response);

  return (
    <div className="create-form">
      <h2 className="page-title">Create A New Project</h2>
      <form action="" onSubmit={handleSubmit}>
        <label>
          <span>Project Name: </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project Details: </span>
          <textarea
            type="text"
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          <span>Set Due Date: </span>
          <input
            type="date"
            name=""
            id=""
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Project Category: </span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assigned To: </span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti // This is the prop that makes it multi-select i.e. you can select multiple options
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <div className="error">{formError}</div>}
      </form>
    </div>
  );
};

export default Create;
