/* ============================================
   Cart Module — localStorage-based cart
   ============================================ */

const CART_KEY = 'thakurji_cart';

// Get cart from localStorage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Add item to cart
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  showToast(`${item.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(id) {
  let cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
}

// Update quantity
function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty = Math.max(1, (item.qty || 1) + delta);
  }
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

// Get total
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
}

// Get item count
function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
}

// Update badge
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.setAttribute('data-count', count);
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Clear cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// Initialize badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
