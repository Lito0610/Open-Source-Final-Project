# Plant Grabber — Open Source Final Project

Lightweight, responsive storefront for plant lovers. The project uses plain HTML, CSS and JavaScript and is intended as a static front-end demo (no build step required).

This README has been updated to reflect the repository's current files.

## Quick start

1. Clone or download the repository and open the project folder.
2. Open any HTML file in a browser (e.g., `Home.html` or `Cart.html`). No build step required.

## Current file overview

The following files/folders are present in the project root (short descriptions):

- `Home.html` — Landing / hero section, site navigation and primary CTAs
- `Product.html` — Product listing / showcase (static product cards)
- `Cart.html` — Shopping cart page (reads `localStorage` `cart` key, lets user remove/select items)
- `BuyNow.html` — Checkout / order page (reads `buyNowProduct` from `localStorage`)
- `AboutUs.html`, `ContactUs.html`, `Account.html`, `SignUp.html` — Supporting pages
- `Home.css`, `Product.css`, `Cart.css`, `BuyNow.css`, `AboutUs.css`, `Account.css`, `ContactUs.css`, `SignUp.css` — Page-specific styles
- `images/` — Static image assets used across pages
- `js/cart.js` — Cart logic: add/remove items, update cart count, prepare checkout payload
- `js/buynow.js` — Populates `BuyNow.html` with selected product(s) and handles simple checkout UI

## Cart & checkout behavior

- Cart items are stored in `localStorage` under the `cart` key as an array of product objects (each object typically contains `name`, `price`, `image`, and `description`).
- On `Cart.html` you can select items for checkout. Clicking "Proceed to Checkout" stores the selected items in `localStorage` under the key `buyNowProduct` and navigates to `BuyNow.html`.
- If a single product is selected, `buyNowProduct` is stored as an object; if multiple are selected it is stored as an array.

## Empty cart UX

- The cart page uses `js/cart.js` to detect an empty cart and will inject a centered empty-state message into the `.cart-items` container (the script adds an `.empty` class so the CSS can center the message). See `Cart.css` for the styling rules.

## Accessibility & Responsiveness

- Images include `alt` attributes where applicable.
- Forms and interactive controls use native focus states; styles in the CSS files provide visible focus and hover cues.
- Mobile responsiveness is handled via media queries in the CSS files (`@media` rules) — e.g., cart items stack vertically on narrow screens.

## Development notes

- No package manager or build system is required.
- Edit the HTML/CSS/JS files directly and test by opening the pages in a browser.
- To add or change products, edit `Product.html` or extend `js/cart.js` to load a JSON data source.

## Contributing

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch (e.g., `feature/new-style`).
3. Make changes and test locally.
4. Open a Pull Request with a clear description and screenshots if applicable.

## License

This repository doesn't include a license file by default. If you want MIT (recommended for small demos), add a `LICENSE` file with the MIT template.

## Contact

Open an issue in the repository for questions or feature requests.
