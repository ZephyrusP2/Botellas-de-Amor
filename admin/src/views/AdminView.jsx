import React from "react";
import MyTable from "../components/MyTable";
import { useState, useEffect } from "react";

const AdminView = () => {
  return (
    <>
      <h1>Admin View</h1>
      <button>
        <a href="/admin/challenges">Challenges</a>
      </button>
    </>
  );
};

export default AdminView;
