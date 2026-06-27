import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const fallbackProducts = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 79.99,
    category: 'electronics',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    rating: { rate: 4.5, count: 328 },
  },
  {
    id: 2,
    title: 'Crystal Necklace',
    price: 49.99,
    category: 'jewelery',
    description: 'Beautiful handcrafted necklace with genuine crystal pendant.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
    rating: { rate: 4.8, count: 212 },
  },
  {
    id: 3,
    title: 'Smart Watch Pro',
    price: 299.99,
    category: 'electronics',
    description: 'Advanced fitness tracking with heart rate monitor and GPS.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: { rate: 4.6, count: 445 },
  },
  {
    id: 4,
    title: 'Premium Backpack',
    price: 89.99,
    category: 'clothing',
    description: 'Durable and stylish travel backpack with laptop compartment.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    rating: { rate: 4.3, count: 156 },
  },
  {
    id: 5,
    title: 'Leather Wallet',
    price: 39.99,
    category: 'clothing',
    description: 'Genuine leather wallet with multiple card slots and RFID protection.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    rating: { rate: 4.4, count: 289 },
  },
  {
    id: 6,
    title: 'Ceramic Coffee Mug',
    price: 14.99,
    category: 'home',
    description: 'Handmade ceramic mug perfect for your morning coffee.',
    image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=300&h=300&fit=crop',
    rating: { rate: 4.7, count: 523 },
  },
  {
    id: 7,
    title: 'Yoga Mat Premium',
    price: 59.99,
    category: 'sports',
    description: 'Non-slip eco-friendly yoga mat with carrying strap.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop',
    rating: { rate: 4.6, count: 378 },
  },
  {
    id: 8,
    title: 'Vintage Book Collection',
    price: 34.99,
    category: 'books',
    description: 'Set of 3 classic vintage books in excellent condition.',
    image: 'https://images.unsplash.com/photo-1507842872343-583f20270319?w=300&h=300&fit=crop',
    rating: { rate: 4.9, count: 214 },
  },
  {
    id: 9,
    title: 'USB-C Charging Cable',
    price: 12.99,
    category: 'electronics',
    description: 'Fast charging cable with 2-meter length and durable design.',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop',
    rating: { rate: 4.5, count: 892 },
  },
  {
    id: 10,
    title: 'Sunglasses UV Protection',
    price: 59.99,
    category: 'clothing',
    description: 'Stylish sunglasses with 100% UV protection and polarized lenses.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    rating: { rate: 4.4, count: 567 },
  },
  {
    id: 11,
    title: 'Portable Phone Stand',
    price: 19.99,
    category: 'electronics',
    description: 'Adjustable stand compatible with all smartphones and tablets.',
    image: 'https://images.unsplash.com/photo-1609042240614-1867f5fccb1f?w=300&h=300&fit=crop',
    rating: { rate: 4.6, count: 734 },
  },
  {
    id: 12,
    title: 'Silk Pillowcase',
    price: 29.99,
    category: 'home',
    description: 'Luxurious 100% silk pillowcase for better sleep and skin health.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=300&h=300&fit=crop',
    rating: { rate: 4.8, count: 445 },
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