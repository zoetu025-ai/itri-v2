import { Badge } from '../Badge/Badge.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { MetaDetail } from '../MetaDetail/MetaDetail.jsx';
import { ResponseActions } from '../ResponseActions/ResponseActions.jsx';
import styles from './AnswerContent.module.css';

export function AnswerContent({
  summary = 'The system initially retrieved two work orders related to Joe: WO 336710 and WO 326060. Both contain Joe-related records. Please clarify which Joe you mean (e.g. Joe Canonica or the Zetron programmer) for further filtering.',
  onBadgeClick,
  className = '',
}) {
  return (
    <div className={`${styles.content} ${className}`.trim()}>
      <div className={styles.metaRow}>
        <MetaDetail icon="token">19.7k tokens</MetaDetail>
        <MetaDetail icon="download">Input: 18.6k (Cache: 4.0k)</MetaDetail>
        <MetaDetail icon="upload">Output: 1.1k (Inference: 448)</MetaDetail>
      </div>

      <section className={styles.summary}>
        <div className={styles.summaryHeader}>
          <Icon name="summary" size="md" alt="" />
          <h3 className={styles.summaryTitle}>Summary</h3>
        </div>
        <p className={styles.summaryBody}>{summary}</p>
      </section>

      <h2 className={styles.sectionTitle}>Related WOs found</h2>

      <h3 className={styles.woTitle}>WO 336710</h3>
      <div className={styles.detailBlock}>
        <ul>
          <li>
            The content mentions approved records such as &quot;Raritan Township – Captain Joe Canonica (2025-09-19)&quot;.
          </li>
        </ul>
        <div className={styles.badges}>
          <Badge label="all.json" onClick={onBadgeClick} />
        </div>
      </div>

      <h3 className={styles.woTitle}>WO 326060</h3>
      <div className={styles.detailBlock}>
        <ul>
          <li>
            The text includes a repost of an email from &quot;Joe (Zetron Programmer)&quot; explaining technical details such as console naming and page name consistency settings.
          </li>
        </ul>
        <div className={styles.badges}>
          <Badge label="all.json" onClick={onBadgeClick} />
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Explanation and Limitations</h2>
      <div className={styles.detailBlock}>
        <ul>
          <li>
            The above results are based on text fragment comparison in the internal knowledge base, confirming the presence of &quot;Joe&quot; related descriptions in two WO records; however, &quot;Joe&quot; may refer to different individuals (such as Joe Canonica and Zetron programmers). For more precise filtering, please provide the full name or organization.
          </li>
        </ul>
        <div className={styles.badges}>
          <Badge label="all.json" onClick={onBadgeClick} />
          <Badge label="all.json" onClick={onBadgeClick} />
        </div>
      </div>

      <hr className={styles.divider} />
      <ResponseActions />
    </div>
  );
}
