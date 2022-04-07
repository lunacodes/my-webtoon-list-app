import React from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <h1>404 Not Found</h1>
        <p className='404-text' style={{ textAlign: 'center' }}>
          Sorry, we don't seem to have that page here. Try visiting our{' '}
          <Link to='/'>homepage</Link> instead
        </p>
      </div>
    );
  }
}
export default NotFoundPage;
