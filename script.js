const API = "http://localhost:3000/players";

// LOAD ALL ON START
window.onload = load;

// ADD / UPDATE PLAYER
document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        photo: document.getElementById("photo").value,
        career: document.getElementById("career").value,
        fifties: document.getElementById("fifties").value
    };

    try {
        const res = await fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("STATUS:", res.status);

        if (!res.ok) {
            const err = await res.text();
            console.log("ERROR RESPONSE:", err);
            alert("Backend error: " + err);
            return;
        }

        alert("Player saved successfully!");
        load();

    } catch (err) {
        console.log("FETCH FAILED:", err);
        alert("Request failed. Check console.");
    }
};

// LOAD ALL PLAYERS
async function load() {
    const res = await fetch(API);
    const data = await res.json();
    show(data);
}

// SEARCH PLAYER
async function search() {
    const name = document.getElementById("search").value;

    const res = await fetch(`${API}/search?name=${name}`);
    const data = await res.json();

    show(data);
}

// SHOW PLAYERS
function show(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(p => {
        list.innerHTML += `
            <div style="border:1px solid black; padding:10px; margin:10px;">
                <h3>${p.name}</h3>
                <img src="${p.photo}" width="100"
     onerror="this.src='https://via.placeholder.com/100'"><br>
                <p>Age: ${p.age}</p>
                <p>Career: ${p.career}</p>
                <p>Fifties: ${p.fifties}</p>

                <button onclick="editPlayer(${p.id})">Edit</button>
                <button onclick="deletePlayer(${p.id})">Delete</button>
            </div>
        `;
    });
}

// EDIT PLAYER
async function editPlayer(id) {
    const res = await fetch(API);
    const data = await res.json();

    const p = data.find(x => x.id == id); // FIXED (== not ===)

    document.getElementById("id").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("age").value = p.age;
    document.getElementById("photo").value = p.photo;
    document.getElementById("career").value = p.career;
    document.getElementById("fifties").value = p.fifties;
}

// DELETE PLAYER
async function deletePlayer(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    load();
}

// RESET FORM
function resetForm() {
    document.getElementById("form").reset();
    document.getElementById("id").value = "";
}
