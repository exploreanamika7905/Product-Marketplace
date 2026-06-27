import Link from 'next/link';

export default function ProductCard({ product }) {
  const { id, title, price, image, category, rating } = product;

  return (
    <div className="col-md-4 col-sm-6 col-12 mb-4 d-flex align-items-stretch">
      <div className="card w-100 shadow-sm border-0 rounded-3">
        <Link href={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center justify-content-center p-3" style={{ height: '220px', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <img 
              src={image} 
              alt={title} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
        </Link>
        <div className="card-body d-flex flex-column justify-content-between bg-light">
          <div>
            <span className="badge bg-secondary mb-2 text-uppercase">{category}</span>
            <h5 className="card-title text-truncate-2" style={{ height: '48px', overflow: 'hidden' }}>
              {title}
            </h5>
            <p className="card-text fw-bold text-primary fs-5">${price}</p>
          </div>
          
          <div className="mt-3">
            {rating && (
              <div className="d-flex align-items-center mb-3">
                <span className="text-warning me-1">★</span>
                <span className="small text-muted">{rating.rate} ({rating.count} reviews)</span>
              </div>
            )}
            {/* Dynamic Route Link (Bonus Requirement) */}
            <Link href={`/product/${id}`} className="btn btn-outline-primary w-100">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}