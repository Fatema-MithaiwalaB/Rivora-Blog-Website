const usersData = [
  {
    id: 1,
    username: "Fatema ezzey",
    email: "ezzeyfatema@gmail.com",
    password: "fatema@123",
  },
];

const blogsData = [
  {
    id: 1,
    title: "The Rise of Artificial Intelligence in Everyday Life",
    image: "ai2.png",
    content:
      "From virtual assistants to personalized recommendations, AI is reshaping how we interact with technology and the world around us.",
    comments: [
      {
        username: "Alice",
        content: "AI is both exciting and a little scary. Great read!",
      },
    ],
  },
  {
    id: 2,
    title: "Sustainable Fashion: The Future of Clothing",
    image: "fashion.jpg",
    content:
      "As climate awareness grows, fashion brands are turning to eco-friendly materials and ethical production methods.",
    comments: [
      {
        username: "Nina",
        content: "Happy to see more attention on sustainability!",
      },
    ],
  },
  {
    id: 3,
    title: "Space Tourism: A New Frontier",
    image: "space.jpg",
    content:
      "Private companies are making space travel a reality for civilians. Are we ready for this next big leap?",
    comments: [
      { username: "Leo", content: "Space tourism is going to be huge!" },
    ],
  },
  {
    id: 4,
    title: "Mental Health and Remote Work: Finding the Balance",
    image: "mental_health.png",
    content:
      "With more people working from home, maintaining mental well-being has become more important than ever.",
    comments: [
      { username: "Ravi", content: "This is so relevant. Thanks for sharing!" },
    ],
  }
];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(usersData));
  localStorage.setItem("blogs", JSON.stringify(blogsData));
}
