function create_item () {
    for (var j = 1; j < 3; i++) {

        for (var i = 0; i < 8; i++) {
            // Item Div
            item1 = document.createElement('div');
            item1.className = 'item';
            item1.style.backgroundColor = item_bg_colors[i];
            // Stad Img
            stad_img = document.createElement('img');
            stad_img.className = 'item-banner';
            stad_img.src = 'svg/stadiums-small/' + stad_name[i];
            stad_img.alt = 'Stadium';
            // Logo Img
            logo_img = document.createElement('img');
            logo_img.className = 'item-stad_img';
            logo_img.src = 'svg/logos-small/' + logo_id[i] + '.svg';
            logo_img.alt = logo_alt[i];
            // Item Info
            item_info = document.createElement('div');
            item_info.className = 'item-info';
            // Item Title
            item_title = document.createElement('span');
            item_title.className = 'item-info-title';
            item_title.innerHTML = item_title[i];
            item_info.appendChild(item_title);
            item1.appendChild(logo_img);
            item1.appendChild(item_info);
            item1.appendChild(stad_img);
        }
    }
}


    logo_alt = ["Norths Logo", "Reds Logo", "Greens Logo", "Crabs Logo", "Winners Logo", "Elders Logo", "Raiders Logo", "Angels Logo"];



