import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Webtoon = (props) => (
  <tr>
    <td>{props.webtoon.title}</td>
    <td>{props.webtoon.score}</td>
    <td>{props.webtoon.progress}</td>
    <td>{props.webtoon.tags}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.webtoon._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteWebtoon(props.webtoon._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function WebtoonList() {
	const [webtoons, setWebtoons] = useState([]);

	// This method fetches the webtoons from the database.
	useEffect(() => {
	  async function getWebtoons() {
	    const response = await fetch(`http://localhost:5000/webtoon/`);

	    if (!response.ok) {
	      const message = `An error occured: ${response.statusText}`;
	      window.alert(message);
	      return;
	    }

      const webtoons = await response.json();
      setWebtoons(webtoons);
    }

    getWebtoons();

    return;
  }, [webtoons.length]);

  // This method will delete a webtoon
  async function deleteWebtoon(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newWebtoons = webtoons.filter((el) => el._id !== id);
    setWebtoons(newWebtoons);
  }

  // This method will map out the webtoons on the table
  function webtoonList() {
    return webtoons.map((webtoon) => {
      return (
        <Webtoon
          webtoon={webtoon}
          deleteWebtoon={() => deleteWebtoon(webtoon._id)}
          key={webtoon._id}
        />
      );
    });
  }

  // This following section will display the table with the webtoons of individuals.
  return (
    <div>
      <h3>Webtoon List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{webtoonList()}</tbody>
      </table>
    </div>
  );
}
