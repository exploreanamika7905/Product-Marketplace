import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

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
    image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=300&h=300&fit=crop',
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

export default function Home({ initialProducts, fetchError }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts || fallbackProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulate minor debounce/loading lag for client-side filtering visualization
    const delayDebounceFn = setTimeout(() => {
      const query = (searchTerm || '').trim().toLowerCase();

      if (!query) {
        setFilteredProducts(initialProducts || fallbackProducts);
        setLoading(false);
        return;
      }

      const filtered = (initialProducts || fallbackProducts).filter((product) => {
        const title = (product.title || '').toString().toLowerCase();
        const category = (product.category || '').toString().toLowerCase();
        const description = (product.description || '').toString().toLowerCase();

        return (
          title.includes(query) ||
          category.includes(query) ||
          description.includes(query)
        );
      });

      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, initialProducts]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">Product Marketplace</h1>
      {fetchError && (
        <div className="alert alert-warning text-center" role="alert">
          Unable to load live products from the API. Showing fallback sample products instead.
        </div>
      )}
      
      {/* Search Bar Container */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid Content */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center my-5">
          <h3 className="text-muted">No products matches your search.</h3>
        </div>
      )}
    </div>
  );
}

// Server-Side Rendering (SSR Requirement)
export async function getServerSideProps() {
  try {
    const res = await axios.get('https://fakestoreapi.com/products');
    return {
      props: {
        initialProducts: res.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data in SSR:', error?.message || error);
    return {
      props: {
        initialProducts: fallbackProducts,
        fetchError: error?.message || 'Failed to load products from API.',
      },
    };
  }
}