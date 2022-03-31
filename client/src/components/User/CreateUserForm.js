const CreateUserForm = (props) => {
	return(
		<form onSubmit={props.onSubmit}>
			<div className="form-group">
				<label htmlFor="title">First Name</label>
				<input
					type="text"
					className="form-control"
					id="name_first"
					value={props.form.name_first}
					onChange={(e) => props.updateForm({ name_first: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="score">Last Name</label>
				<input
					type="text"
					className="form-control"
					id="name_last"
					value={props.form.name_last}
					onChange={(e) => props.updateForm({ name_last: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="score">Password</label>
				<input
					type="text"
					className="form-control"
					id="password"
					value={props.form.password}
					onChange={(e) => props.updateForm({ password: e.target.value })}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="score">Password (confirm)</label>
				<input
					type="text"
					className="form-control"
					id="password_confirm"
					value={props.form.password_confirm}
					onChange={(e) => props.updateForm({ password_confirm: e.target.value })}
				/>
			</div>
			<div className="form-group" style={{ margin: '20px 0' }}>
				<input
					type="submit"
					value="Create User"
					className="btn btn-primary"
				/>
			</div>
		</form>
	);
};

export default CreateUserForm;
