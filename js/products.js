/* ============================================
   Products Module — Sample Data & Rendering
   ============================================ */

// Sample products data (will be replaced by Firebase later)
const SAMPLE_PRODUCTS = [
  {
    id: '1', name: 'Red Rose Premium Bouquet', category: 'bouquets',
    description: 'A stunning hand-crafted arrangement of 25 premium long-stem red roses, wrapped in luxury paper with satin ribbon. Perfect for anniversaries, birthdays, or expressing your deepest feelings.',
    mrp: 999, sellingPrice: 799, image: 'images/cat-bouquets.png', inStock: true
  },
  {
    id: '2', name: 'Mixed Orchid Bundle', category: 'flowers',
    description: 'An exotic collection of fresh dendrobium and phalaenopsis orchids in vibrant purple, pink and white. Long-lasting blooms that brighten any space for weeks.',
    mrp: 599, sellingPrice: 499, image: 'images/cat-flowers.png', inStock: true
  },
  {
    id: '3', name: 'Wedding Haar Set', category: 'wedding',
    description: 'Traditional bridal garland set featuring fresh white jasmine, red roses and marigold. Includes Jaimala pair for bride and groom. Made fresh on the day of your ceremony.',
    mrp: 2999, sellingPrice: 2499, image: 'images/cat-wedding.png', inStock: true
  },
  {
    id: '4', name: 'Car Decoration Package', category: 'onspot',
    description: 'Complete wedding car decoration with fresh red roses, white ribbons, heart-shaped arrangements and "Just Married" floral sign. On-spot service included.',
    mrp: 1999, sellingPrice: 1799, image: 'images/cat-onspot.png', inStock: true
  },
  {
    id: '5', name: 'Sunflower Joy Bouquet', category: 'bouquets',
    description: 'Brighten someone\'s day with this cheerful arrangement of 12 large sunflowers accented with baby\'s breath and greenery. Wrapped in craft paper.',
    mrp: 699, sellingPrice: 549, image: 'images/cat-flowers.png', inStock: true
  },
  {
    id: '6', name: 'Jasmine Garland (10 pcs)', category: 'flowers',
    description: 'Pack of 10 fresh mogra/jasmine garlands (gajra). Perfect for daily puja, hair decoration, or festive occasions. Sourced fresh every morning.',
    mrp: 250, sellingPrice: 199, image: 'images/cat-bouquets.png', inStock: true
  },
  {
    id: '7', name: 'Mandap Decoration Full', category: 'wedding',
    description: 'Complete wedding mandap/stage decoration package including marigold strings, rose arrangements, backdrop floral wall, entrance arch and aisle decoration.',
    mrp: 25000, sellingPrice: 19999, image: 'images/cat-wedding.png', inStock: true
  },
  {
    id: '8', name: 'Door Decoration', category: 'onspot',
    description: 'Beautiful toran-style door decoration with fresh marigold, mango leaves and rose accents. Perfect for housewarming, festivals, or special celebrations.',
    mrp: 499, sellingPrice: 399, image: 'images/cat-onspot.png', inStock: true
  },
  {
    id: '9', name: 'White Lily Elegance', category: 'bouquets',
    description: 'Elegant arrangement of 15 pristine white Asiatic lilies with eucalyptus greenery. Symbolizing purity and grace — ideal for sympathy, congratulations or corporate gifts.',
    mrp: 1299, sellingPrice: 999, image: 'images/cat-flowers.png', inStock: true
  },
  {
    id: '10', name: 'Home Decoration Package', category: 'onspot',
    description: 'Transform your home for festivals or celebrations. Includes rangoli arrangements, floral torans, table centerpieces and balcony decoration with fresh flowers.',
    mrp: 3500, sellingPrice: 2999, image: 'images/cat-onspot.png', inStock: true
  },
  {
    id: '11', name: 'Marigold Bulk (1 kg)', category: 'flowers',
    description: 'Fresh orange and yellow marigold flowers, sold loose by the kilogram. Ideal for puja, decoration strings, or wedding venue decoration.',
    mrp: 150, sellingPrice: 120, image: 'images/cat-bouquets.png', inStock: true
  },
  {
    id: '12', name: 'Reception Stage Décor', category: 'wedding',
    description: 'Luxurious wedding reception stage with floral backdrop wall, sofa area flower arrangement, carpet aisle and photo-booth corner with flower frames.',
    mrp: 35000, sellingPrice: 29999, image: 'images/cat-wedding.png', inStock: true
  }
];

function getProducts() {
  return SAMPLE_PRODUCTS;
}

function getProductById(id) {
  return SAMPLE_PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return SAMPLE_PRODUCTS;
  return SAMPLE_PRODUCTS.filter(p => p.category === cat);
}

// --- Render product card HTML ---
function productCardHTML(p) {
  const discount = p.mrp > p.sellingPrice ? Math.round(((p.mrp - p.sellingPrice) / p.mrp) * 100) : 0;
  const catLabels = { bouquets: 'Bouquets', flowers: 'Flowers', wedding: 'Wedding', onspot: 'On-Spot' };

  return `
    <div class="product-card reveal visible">
      <div class="card-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
      </div>
      <div class="card-body">
        <span class="product-category">${catLabels[p.category] || p.category}</span>
        <h4 class="product-name">${p.name}</h4>
        <div class="price-row">
          <span class="price-selling">${formatPrice(p.sellingPrice)}</span>
          ${p.mrp > p.sellingPrice ? `<span class="price-mrp">${formatPrice(p.mrp)}</span>` : ''}
        </div>
        <div class="card-actions">
          <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm">View</a>
          <button class="btn btn-primary btn-sm" onclick="addToCart({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.sellingPrice},image:'${p.image}'})">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// --- Catalog Page Logic ---
function initCatalog() {
  const grid = document.getElementById('catalogGrid');
  const tabs = document.getElementById('filterTabs');
  const empty = document.getElementById('emptyState');
  if (!grid || !tabs) return;

  // Read category from URL
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get('cat') || 'all';

  function render(cat) {
    activeCat = cat;
    const products = getProductsByCategory(cat);
    grid.innerHTML = products.map(productCardHTML).join('');
    empty.classList.toggle('hidden', products.length > 0);

    tabs.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.cat === cat);
    });
  }

  tabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (tab) render(tab.dataset.cat);
  });

  render(activeCat);
}

// --- Product Detail Page Logic ---
function initProductDetail() {
  const detail = document.getElementById('productDetail');
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProductById(id);

  if (!product) {
    detail.innerHTML = '<div class="empty-state"><div class="empty-icon">😕</div><h3>Product not found</h3><p><a href="catalog.html" class="btn btn-primary">Browse Catalog</a></p></div>';
    return;
  }

  document.title = `${product.name} — Thakurji Bouque Shop`;
  document.getElementById('breadcrumbName').textContent = product.name;
  document.getElementById('productImg').src = product.image;
  document.getElementById('productImg').alt = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productCat').textContent = { bouquets: 'Bouquets', flowers: 'Flowers', wedding: 'Wedding', onspot: 'On-Spot' }[product.category] || product.category;
  document.getElementById('productPrice').textContent = formatPrice(product.sellingPrice);
  document.getElementById('productMrp').textContent = formatPrice(product.mrp);
  document.getElementById('productSave').textContent = `Save ${formatPrice(product.mrp - product.sellingPrice)}`;
  document.getElementById('productDesc').textContent = product.description;

  document.getElementById('addToCartBtn').onclick = () => {
    addToCart({ id: product.id, name: product.name, price: product.sellingPrice, image: product.image });
  };

  // WhatsApp link with product name
  const waLink = detail.querySelector('a[href*="wa.me"]');
  if (waLink) {
    waLink.href = `https://wa.me/919623289818?text=Hi! I am interested in: ${encodeURIComponent(product.name)} (₹${product.sellingPrice})`;
  }

  // Related products
  const related = document.getElementById('relatedProducts');
  if (related) {
    const others = SAMPLE_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    related.innerHTML = others.map(productCardHTML).join('');
  }
}

// --- Initialize based on page ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('catalogGrid')) initCatalog();
  if (document.getElementById('productDetail')) initProductDetail();
});
