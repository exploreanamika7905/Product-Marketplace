import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const fallbackProducts = [
  {
    id: 1,
    title: 'Sample Product One',
    price: 29.99,
    category: 'electronics',
    description: 'This is a fallback sample product used when the live API cannot be reached.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: { rate: 4.2, count: 99 },
  },
  {
    id: 2,
    title: 'Sample Product Two',
    price: 59.99,
    category: 'jewelery',
    description: 'A sample fallback product that keeps the shop visible after deployment.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
    rating: { rate: 4.8, count: 212 },
  },
];

export default function ProductDetails({ product, error, fetchError }) {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user's rating from localStorage
    if (product?.id) {
      const savedRating = localStorage.getItem(`product-rating-${product.id}`);
      if (savedRating) {
        setUserRating(parseInt(savedRating, 10));
      }
    }
    setIsLoading(false);
  }, [product?.id]);

  const handleRatingSubmit = (rating) => {
    if (product?.id) {
      localStorage.setItem(`product-rating-${product.id}`, rating.toString());
      setUserRating(rating);
      setMessage('Thank you for rating!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (error || !product) {
    return (
      <div className="container text-center my-5">
        <h2 className="text-danger">Product Not Found</h2>
        <Link href="/" className="btn btn-primary mt-3">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link href="/" className="btn btn-secondary mb-4">← Back to Products</Link>
      <div className="row bg-white p-4 rounded shadow-sm align-items-center">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid" 
            style={{ maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>
        <div className="col-md-7">
          <span className="badge bg-info text-dark text-uppercase mb-2">{product.category}</span>
          <h1 className="fw-bold mb-3">{product.title}</h1>
          <h2 className="text-primary fw-bold mb-4">${product.price}</h2>
          
          {product.rating && (
            <div className="d-flex align-items-center mb-4">
              <span className="text-warning fs-4 me-2">★ {product.rating.rate}</span>
              <span className="text-muted">({product.rating.count} Customer Reviews)</span>
            </div>
          )}
          {fetchError && (
            <div className="alert alert-warning" role="alert">
              Unable to load this product from the live API. Showing fallback sample data.
            </div>
          )}

          {/* User Rating Section */}
          {!isLoading && (
            <div className="mb-4 p-3 border rounded bg-light">
              <h5 className="fw-semibold mb-3">Rate this product:</h5>
              <div className="d-flex align-items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="btn btn-sm"
                    onClick={() => handleRatingSubmit(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '5px',
                      fontSize: '28px',
                      color: (hoverRating || userRating) >= star ? '#FFC107' : '#E9ECEF',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    Your rating: <strong>{userRating} star{userRating !== 1 ? 's' : ''}</strong>
                  </small>
                </div>
              )}
              {message && (
                <div className="alert alert-success mt-2 mb-0">{message}</div>
              )}
            </div>
          )}
          
          <h4 className="fw-semibold">Description</h4>
          <p className="text-muted lh-base">{product.description}</p>
          
          <button className="btn btn-success btn-lg mt-4 w-100 w-md-auto px-5">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

// Fetch individual data server-side based on dynamic ID
export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    return {
      props: {
        product: res.data,
      },
    };
  } catch (error) {
    console.error('Error fetching product in SSR:', error?.message || error);
    const fallbackProduct = fallbackProducts.find((item) => item.id.toString() === params.id.toString()) || null;
    return {
      props: {
        product: fallbackProduct,
        error: !fallbackProduct,
        fetchError: error?.message || 'Failed to load product from API.',
      },
    };
  }
}