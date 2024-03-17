import React, { useState } from "react";
import { useSelector } from "react-redux";

const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);
  return <div>RequirementsField</div>;
};

export default RequirementsField;
