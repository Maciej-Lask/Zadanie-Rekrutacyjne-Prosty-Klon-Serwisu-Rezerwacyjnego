import { Container } from 'react-bootstrap';
import styles from './CommentSection.module.scss';

const CommentSection = () => (
  <Container>
    <div className={styles.commentSection}>
      <h1>Comment Section</h1>
      <p>If this was a real company, we would put some content here.</p>

      <div className={styles.comments}>
        <div className={styles.comment}>
          <p className={styles.commentAuthor}>John Doe</p>
          <p className={styles.commentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
            libero nec elit tristique ultricies.
          </p>
        </div>
        <div className={styles.comment}>
          <p className={styles.commentAuthor}>Jane Smith</p>
          <p className={styles.commentText}>
            Sed pulvinar neque eu posuere feugiat. Etiam eget urna at turpis
            fringilla consequat.
          </p>
        </div>
      </div>
    </div>
  </Container>
);

export default CommentSection;
