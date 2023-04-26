// Create List items of Logos, info
logo_id = ["norths_logo", "reds_logo", "greens_logo",
    "crabs_logo", "winners_logo", "elders_logo","raiders_logo","angels_logo"]

logo_src = ["norths-logo.svg", "reds-logo.svg", "greens-logo.svg",
    "crabs-logo.svg", "winners-logo.svg", "elders-logo.svg","raiders-logo.svg","angels-logo.svg"]

info_id = ["location","phone_number","email"]
info_src = ["location.svg","phone.svg","email.svg"]
info_text = ["Μεσογείων 174, 151 25 Μαρούσι","+302310954050","info@ultraleague.gr"]

navbar_text =["Ομάδες", "Πρόγραμμα", "Βαθμολογία", "Επικοινωνία", "About"]

// Function to populate ul with logos
function create_logo_list(){
    for (i = 0; i < logo_id.length; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        li.className= "team"
        img.src = "svg/logos/" + logo_src[i];
        img.id = logo_id[i];
        li.appendChild(img);
        document.getElementById("teams-bar").appendChild(li);
    }
}
create_logo_list()

// Function to populate ul with info
function create_info_list(){
    for (i = 0; i < info_id.length; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        var span = document.createElement("span");
        li.className="info"
        img.src = "svg/info/" + info_src[i];
        img.id = info_id[i];
        span.className = "info_text"
        span.innerHTML = info_text[i];
        li.appendChild(img);
        li.appendChild(span);
        document.getElementById("info-bar").appendChild(li);
    }
}
create_info_list()

// Function to populate ul with navbar buttons
function create_navbar_list(){
    for (i = 0; i < navbar_text.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.className = "navbar-buttons"
        button.innerHTML = navbar_text[i];
        li.appendChild(button);
        document.getElementById("navbar-items").appendChild(li);
    }
}

create_navbar_list()