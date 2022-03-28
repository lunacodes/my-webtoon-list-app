import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebtoonListHeading from '../WebtoonListHeading';

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

export default function UserWebtoonList() {
	const [webtoons, setWebtoons] = useState([]);

	// This method fetches the webtoons from the database.
	useEffect(() => {
	  async function getWebtoons() {
	    const response = await fetch(`http://localhost:3001/webtoon/`);

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
    await fetch(`http://localhost:3001/${id}`, {
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
    <div className="webtoon-list-title-bar">
    	<WebtoonListHeading heading="Webtoon List" />
    	<a className="add-webtoon" href="/add">Add Webtoon</a>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Score</th>
            <th>Progress</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{webtoonList()}</tbody>
      </table>
    </div>
  );
}
