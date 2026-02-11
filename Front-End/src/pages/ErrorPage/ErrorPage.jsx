import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">Sorry, the page you're looking for doesn't exist.</p>
        <button className="error-button" onClick={() => navigate('/')}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
