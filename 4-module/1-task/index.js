function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  let li;
  friends.map((friend) => {
    li = document.createElement("li");
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
    ul.appendChild(li);
  });
  return ul;
}
