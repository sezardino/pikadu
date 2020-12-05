import {posts, PostType} from '../../const/';
import {setUser} from '../user';

interface IPosts {
	allPosts: Array<PostType>;
}

const setPosts: IPosts = {
	allPosts: posts,
};

const postTemplate = (post: PostType) => {
	const {title, text, date, tags, likes, comments, author} = post;
	const {displayName, photo} = setUser.getUser(author);
	let photoHtml = photo ? photo : './assets/img/avatar.jpeg';
	let tagsHtml = '';
	tags.forEach((item) => (tagsHtml += `<a href="#" class="tag">#${item}</a>`));
	return `
  <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
        ${tagsHtml}
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="./assets/img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${likes}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="./assets/img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="./assets/img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="./assets/img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${photoHtml} alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>`;
};

const post = (): void => {
	const postsContainer: HTMLDivElement = document.querySelector('.posts');

	const showPosts = () => {
		let postsContent: string = '';
		setPosts.allPosts.forEach((item: PostType) => (postsContent += postTemplate(item)));
		postsContainer.innerHTML = postsContent;
	};

	showPosts();
};

export default post;
