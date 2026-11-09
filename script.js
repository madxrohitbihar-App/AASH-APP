// Load Favorites state on start
(function() {
    loadFavoritesState();
})();

function switchTab(tabName, btnElement) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active-tab'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    btnElement.classList.add('active');

    const label = document.getElementById('section-label');
    const countLabel = document.getElementById('active-count');

    if (tabName === 'active') {
        document.getElementById('tab-active').classList.add('active-tab');
        label.innerText = "All Active App";
        countLabel.innerText = "1 Available";
    } else if (tabName === 'shayari') {
        document.getElementById('tab-shayari').classList.add('active-tab');
        label.innerText = "Shaheed Bhagat Singh";
        countLabel.innerText = "Tribute";
    } else if (tabName === 'favorites') {
        document.getElementById('tab-favorites').classList.add('active-tab');
        label.innerText = "All Saved Favorite";
        countLabel.innerText = "Saved";
        renderFavorites();
    }
}

function toggleFavorite(btn, appName) {
    btn.classList.toggle('active');
    let favorites = JSON.parse(localStorage.getItem('app_favorites') || "[]");
    
    const card = btn.closest('.app-card');
    const appData = {
        name: appName,
        html: card.outerHTML
    };

    const index = favorites.findIndex(item => item.name === appName);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(appData);
    }
    localStorage.setItem('app_favorites', JSON.stringify(favorites));
}

function loadFavoritesState() {
    let favorites = JSON.parse(localStorage.getItem('app_favorites') || "[]");
    const favNames = favorites.map(f => f.name);

    document.querySelectorAll('.app-card').forEach(card => {
        const nameEl = card.querySelector('.app-name');
        if (nameEl && favNames.includes(nameEl.innerText.trim())) {
            const favBtn = card.querySelector('.fav-btn');
            if(favBtn) favBtn.classList.add('active');
        }
    });
}

function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('app_favorites') || "[]");
    const container = document.getElementById('favorites-container');
    const msg = document.getElementById('no-favorites-msg');

    container.innerHTML = "";
    if (favorites.length === 0) {
        msg.style.display = 'block';
    } else {
        msg.style.display = 'none';
        favorites.forEach(fav => {
            container.innerHTML += fav.html;
        });
    }
}

function filterApps() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const activeTab = document.querySelector('.tab-content.active-tab');
    activeTab.querySelectorAll('.app-card').forEach(card => {
        const name = card.getAttribute('data-name');
        card.style.display = (!name || name.includes(query)) ? 'flex' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash-screen");
    
    if (!sessionStorage.getItem('splashShown')) {
        setTimeout(() => {
            splash.classList.add("hide-splash");
            sessionStorage.setItem('splashShown', 'true');
        }, 1200);
    } else {
        splash.style.display = 'none';
    }

    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            document.getElementById('popupModal').style.display = 'flex';
        }, 2000);
    }
});

function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
    sessionStorage.setItem('popupShown', 'true');
}
