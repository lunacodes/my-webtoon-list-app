import React from 'react';

const UserWebtoonEntryForm = (props) => {
	return(
		<form onSubmit={props.onSubmit}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					className="form-control"
					id="name"
					value={props.form.title}
					onChange={(e) => props.updateForm({ title: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="score">Score</label>
				<input
					type="text"
					className="form-control"
					id="score"
					value={props.form.score}
					onChange={(e) => props.updateForm({ score: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="progress">Progress</label>
				<input
					type="text"
					className="form-control"
					id="progress"
					value={props.form.progress}
					onChange={(e) => props.updateForm({ progress: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="tags">Tags</label>
				<input
					type="text"
					className="form-control"
					id="tags"
					value={props.form.tags}
					onChange={(e) => props.updateForm({ tags: e.target.value })}
				/>
			</div>
			<div className="form-group" style={{ margin: '20px 0' }}>
				<input
					type="submit"
					value="Add Webtoon"
					className="btn btn-primary"
				/>
			</div>
		</form>
	);
};

export default UserWebtoonEntryForm;
