import React from 'react';

const UserWebtoonEntryForm = (props) => {
  const select_options = [
    { label: '', value: '' },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
  ];

  return (
    <form onSubmit={props.onSubmit}>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          className='form-control'
          id='name'
          value={props.form.title}
          onChange={(e) => props.updateForm({ title: e.target.value })}
        />
      </div>
      {/* <div className="form-group"> */}
      {/* 	<label htmlFor="score">Score</label> */}
      {/* 	<input */}
      {/* 		type="text" */}
      {/* 		className="form-control" */}
      {/* 		id="score" */}
      {/* 		value={props.form.score} */}
      {/* 		onChange={(e) => props.updateForm({ score: e.target.value })} */}
      {/* 	/> */}
      {/* </div> */}
      <div>
        <label htmlFor='score'>Score</label>
        <select
          name='score'
          id='score'
          className='form-control'
          value={props.form.score}
          onChange={(e) => props.updateForm({ score: e.target.value })}
        >
          {select_options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='progress'>Progress</label>
        <input
          type='text'
          className='form-control'
          id='progress'
          value={props.form.progress}
          onChange={(e) => props.updateForm({ progress: e.target.value })}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='tags'>Tags</label>
        <input
          type='text'
          className='form-control'
          id='tags'
          value={props.form.tags}
          onChange={(e) => props.updateForm({ tags: e.target.value })}
        />
      </div>
      <div className='form-group' style={{ margin: '20px 0' }}>
        <input
          type='submit'
          value={props.submitText}
          className='btn btn-primary'
        />
      </div>
    </form>
  );
};

export default UserWebtoonEntryForm;
