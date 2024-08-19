document.addEventListener('DOMContentLoaded', () => {
    const app = {
        blogPosts: [
            { id: 1, title: '5 Conseils pour Entretenir Votre Moto', content: 'Découvrez nos conseils pour garder votre moto en parfait état et prolonger sa durée de vie.' },
            { id: 2, title: 'Comment Choisir les Meilleurs Accessoires pour Moto', content: 'Explorez les critères importants pour choisir les accessoires qui amélioreront votre expérience de conduite.' },
            { id: 3, title: 'Les Dernières Tendances en Pièces de Rechange pour Moto', content: 'Restez à jour avec les dernières innovations et tendances en matière de pièces de rechange pour votre moto.' }
        ],

        featuredProducts: [
            { id: 1, name: 'bougie de prechauffage', price: 20, image: 'changer-moto-bougie-1-2048x1364.jpg', brand: 'ktm ', series: ' hohajou', vin: 'VIZ4544343NY455', reference: '3464436544' },
            { id: 2, name: 'Article 2', price: 35, image: 'image_article2.jpg', brand: 'Marque B', series: 'Série Y', vin: 'VIN456', reference: 'REF002' }

        ],

        productList: [
            { id: 3, name: 'Article 3', price: 50, image: 'image_article3.jpg', brand: 'Marque C', series: 'Série Z', vin: 'VIN789', reference: 'REF003' },
            { id: 4, name: 'Article 4', price: 45, image: 'image_article4.jpg', brand: 'Marque D', series: 'Série W', vin: 'VIN012', reference: 'REF004' }
        ],

        cart: [],

        showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = page.id === pageId ? 'block' : 'none';
            });

            if (pageId === 'home') {
                this.displayFeaturedProducts();
            } else if (pageId === 'products') {
                this.displayProducts();
            } else if (pageId === 'blog') {
                this.displayBlogPosts();
            }
        },

        displayFeaturedProducts() {
            const featuredProductsDiv = document.getElementById('featured-products');
            featuredProductsDiv.innerHTML = this.featuredProducts.map(product => `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>Prix: ${product.price}€</p>
                    <p>Marque: ${product.brand}</p>
                    <p>Série: ${product.series}</p>
                    <p>VIN: ${product.vin}</p>
                    <p>Référence: ${product.reference}</p>
                    <button onclick="app.addToCart(${product.id})">Ajouter au Panier</button>
                </div>
            `).join('');
        },

        displayProducts() {
            const productListDiv = document.getElementById('product-list');
            productListDiv.innerHTML = this.productList.map(product => `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>Prix: ${product.price}€</p>
                    <p>Marque: ${product.brand}</p>
                    <p>Série: ${product.series}</p>
                    <p>VIN: ${product.vin}</p>
                    <p>Référence: ${product.reference}</p>
                    <button onclick="app.addToCart(${product.id})">Ajouter au Panier</button>
                </div>
            `).join('');
        },

        displayBlogPosts() {
            const blogPostsDiv = document.getElementById('blog-posts');
            blogPostsDiv.innerHTML = this.blogPosts.map(post => `
                <div class="blog-post">
                    <h4>${post.title}</h4>
                    <p>${post.content}</p>
                </div>
            `).join('');
        },

        addToCart(productId) {
            const product = [...this.featuredProducts, ...this.productList].find(p => p.id === productId);
            if (product) {
                this.cart.push(product);
                this.updateCart();
                this.showNotification(`L'article "${product.name}" a été ajouté au panier.`);
            }
        },

        updateCart() {
            const cartItemsDiv = document.getElementById('cart-items');
            const totalPriceSpan = document.getElementById('total-price');

            cartItemsDiv.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <h4>${item.name}</h4>
                    <p>Prix: ${item.price}€</p>
                </div>
            `).join('');

            const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
            totalPriceSpan.textContent = `${totalPrice}€`;
        },

        checkout() {
            alert('Fonctionnalité de paiement non implémentée.');
        },

        searchByVIN() {
            const searchQuery = document.getElementById('search-vin').value.toLowerCase();
            const filteredProducts = [...this.featuredProducts, ...this.productList].filter(product => product.vin.toLowerCase().includes(searchQuery));
            this.displayProducts(filteredProducts);
        },

        showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.display = 'block';
            setTimeout(() => notification.style.display = 'none', 3000);
        }
    };

    app.showPage('home');
    window.app = app; // Expose the app object to the global scope for use in HTML onclick attributes
});
