import React from "react";
import MyTable from "../components/MyTable";
import ChallengeService from "../services/challenge";

const IndexChallenge = () => {
  document.title = "Retos";
  const token = localStorage.getItem("token");

  return (
    <>
      <MyTable
        createPath={"create"}
        editPath={"/admin/challenges/edit/"}
        showPath={"/admin/challenges/"}
        deleteFunction={async (id) =>
          await ChallengeService.deleteChallenge(
            id,
            token
          )
        }
        fetchFunction={async () =>
          await ChallengeService.listChallenge(token)
        }
        leadingAttribute={"challenge"}
      />
    </>
  );
};

export default IndexChallenge;
