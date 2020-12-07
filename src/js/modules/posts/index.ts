import {PostType, IPosts} from '../../const/';
import {addVisibleClass, removeVisibleClass, tagsCreator} from '../../services';
import {setUser} from '../user';
import {addPost, getPosts, postsListener} from '../../firebase/';

const setPosts: IPosts = {
	allPosts: [],
	addPost(title, text, tags, author) {
		addPost({
			title,
			text,
			tags: tagsCreator(tags),
			author,
			date: `${new Date().toLocaleString()}`,
			likes: 0,
			comments: 0,
		});
	},
	getPosts(handler) {
		getPosts(this, handler);
	},
	postsListener,
};

const postTemplate = (post: PostType) => {
	const {
		title,
		text,
		date,
		tags,
		likes,
		comments,
		author: {photoURL, displayName},
	} = post;
	const tagsHtml = tags.map((item) => `<a href="#" class="tag">#${item}</a>`).join('');
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
        <a href="#" class="author-link"><img src=${photoURL} alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>`;
};

const post = (): void => {
	const postsContainer: HTMLDivElement = document.querySelector('.posts');
	const addPostButton: HTMLAnchorElement = document.querySelector('.button-new-post');
	const addPostForm: HTMLFormElement = document.querySelector('.add-post');
	const addPostTitleInput: HTMLInputElement = addPostForm.querySelector('.add-title');
	const addPostTagsInput: HTMLInputElement = addPostForm.querySelector('.add-tags');
	const addPostTextarea: HTMLTextAreaElement = addPostForm.querySelector('.add-text');

	const showPosts = () => {
		console.log(setPosts.allPosts);
		let postsContent: string = '';
		setPosts.allPosts.forEach((item: PostType) => (postsContent += postTemplate(item)));
		postsContainer.innerHTML = postsContent;
	};

	addPostButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();
		removeVisibleClass(postsContainer, addPostButton);
		addVisibleClass(addPostForm);
	});

	addPostForm.addEventListener('submit', (evt: Event) => {
		const {displayName, photoURL} = setUser.user;
		const author = {
			displayName,
			photoURL,
		};
		evt.preventDefault();
		setPosts.addPost(
			addPostTitleInput.value,
			addPostTextarea.value,
			addPostTagsInput.value,
			author
		);
		addVisibleClass(postsContainer, addPostButton);
		removeVisibleClass(addPostForm);
		showPosts();
	});

	showPosts();
	setPosts.postsListener(() => setPosts.getPosts(showPosts));
};

export default post;
