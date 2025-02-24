// Función para obtener un usuario de una API
function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

// Función para obtener los posts de un usuario
function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

// Función para obtener los comentarios del post
function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}



// Encadenando Promesas

console.log("Inicio");

getUser(1)
  .then((user) => {
    console.log("Usuario obtenido:", user);
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts del usuario:", posts);

    // Usar map, sort y filter para procesar los títulos
    const sortedFilteredTitles = posts
      .map(post => post.title)
      .filter(title => title.length > 30) // Filtrar títulos con más de 30 caracteres
      .sort((a, b) => b.length - a.length);

    console.log("Títulos filtrados y ordenados de más largos a más cortos:", sortedFilteredTitles);

    // Obtener todos los comentarios de todos los posts
    const commentPromises = posts.map(post => getComments(post.id));
    return Promise.all(commentPromises).then(commentsArray => ({ posts, commentsArray }));
  })
  .then(({ posts, commentsArray }) => {
    // Mostrar todos los comentarios agrupados por post
    posts.forEach((post, index) => {
      console.log(`Comentarios para el post: ${post.title}`, commentsArray[index]);
    });

    console.log("Fin");
  })
  .catch(error => console.error("Error:", error));

