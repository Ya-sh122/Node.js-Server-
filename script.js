const API = "http://localhost:3000/players";

document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();

    const data = {
        name: name.value,
        age: age.value,
        photo: photo.value,
        career: career.value,
        fifties: fifties.value
    };

    const id = document.getElementById("id").value;

    if (id) {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    load();
};

// LOAD ALL
async function load() {
    const res = await fetch(API);
    const data = await res.json();
    show(data);
}

// SEARCH
async function search() {
    const name = document.getElementById("search").value;
    const res = await fetch(API + "/search?name=" + name);
    const data = await res.json();
    show(data);
}

// SHOW
function show(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(p => {
        list.innerHTML += `
            <div>
                <h3>${p.name}</h3>
                <img src="${p.photo}" width="100">
                <p>${p.age}</p>
                <p>${p.career}</p>
                <p>${p.fifties}</p>

                <button onclick="edit(${p.id})">Edit</button>
                <button onclick="del(${p.id})">Delete</button>
            </div>
        `;
    });
}

// EDIT
async function edit(id) {
    const res = await fetch(API);
    const data = await res.json();
    const p = data.find(x => x.id === id);

    document.getElementById("id").value = p.id;
    name.value = p.name;
    age.value = p.age;
    photo.value = p.photo;
    career.value = p.career;
    fifties.value = p.fifties;
}

// DELETE
async function del(id) {
    await fetch(API + "/" + id, { method: "DELETE" });
    load();
}

load();