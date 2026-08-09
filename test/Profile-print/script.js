const profiles = [
  {
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Priya Verma",
    email: "priya.verma@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Rohan Patel",
    email: "rohan.patel@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Ananya Roy",
    email: "ananya.roy@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Meera Nair",
    email: "meera.nair@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Aditya Joshi",
    email: "aditya.joshi@example.com",
  },
  {
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Neha Kapoor",
    email: "neha.kapoor@example.com",
  },
];

const form = document.querySelector("form");
const img = document.querySelector("#image");
const naam = document.querySelector("#name");
const mail = document.querySelector("#email");
const submit = document.querySelector(".submit");
const prolist = document.querySelector(".profile");

const ui = () => {
  prolist.innerHTML = profiles
    .map(
      (pro, idx) => `<div class="card">
                <img src="${pro.image}" alt="">
                <h3>${pro.name}</h3>
                <h3>${pro.email}</h3>
                <div class="action">
                    <button class="edit">Edit</button>
                    <button onClick="DeleteCard(${idx})" class="del">Delete</button>
                </div>
            </div>`,
    )
    .join("");
};

ui();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const image = img.value;
  const name = naam.value;
  const email = mail.value;

  if (image.trim() === "" && name.trim() === "" && email.trim() === "") return;

  profiles.push({
    image,
    name,
    email,
  });

  ui();

  img.value = "";
  naam.value = "";
  mail.value = "";


});

function DeleteCard(id) {
  profiles.splice(id, 1);
  ui();
}
