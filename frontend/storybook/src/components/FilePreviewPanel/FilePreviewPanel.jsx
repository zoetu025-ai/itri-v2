import { Icon } from '../Icon/Icon.jsx';
import styles from './FilePreviewPanel.module.css';

const DEFAULT_CONTENT = `{
work order:{
WO#:328105
project_name:"NJ CAD/RMS - Hunterdon County Regional"
phase_name:"DEVELOPMENT PHASE"
short_desc:"Hunterdon County > Fire RMS > STAGING-SITE (Cloud) > Personnel Lite is not configured correctly for Fire Departments"
status:"Closed"
post_by:"LAPORTA, STEVEN J"
assign_to:null
post_date:"2024-10-31T22:04:00.310000"
work_order_level:"All Staff Level"
}
updates:[
{
post_id:3636010
work_order_id:328105
type:"Comment"
post_by:"LIAO, WEI-CHU"
post_date:"2024-11-14T00:22:53.020000"
comment:"Hi Steve,

I have assigned the "MY - PERSONNEL" inboxes to all Fire Departments, all Personnel Users Group (Lite), and all Personnel General Group (Lite)
Also assigned the "SUPERVISOR PERSONNEL" inboxes to all Fire Departments, all Personnel Users Group (Lite), and all Personnel Supervisor Group (Lite)

I only touched the inboxes. I did not modify any groups or other permissions. Thus, Annandale Fire may still have problems with groups/permissions/inboxes, which I will handle in WO#[328368].

Please review on Hunterdon Staging. Thanks."
fs_name:null
comment_level:"All Staff Level"
}
{
post_id:3624507
work_order_id:328105
type:"Comment"
post_by:"LAPORTA, STEVEN J"
post_date:"2024-11-05T05:47:58.853000"
comment:"CP,

Thank you and Wei-Chu. I tested/reviewed the HCDPS staging-site (https://hunterdonrmsstage.infoshare.cloud/RMS) and the work that Wei-Chu did for Clinton and Kingwood w`;

const FULL_VIEW_CONTENT = `{
  "totalSize": 5,
  "totalBehalfSize": 3,
  "records": [
    {
      "doc_unit": "chunk",
      "chunk_idx": 9,
      "doc_modify_time": "2026-04-27 16:28:43",
      "is_local_download": true,
      "chunk_image_url": null,
      "raw_file_filesize": 43503,
      "preview_pdf_filesize": -1,
      "data_type_id": 12,
      "filesystem_structure_id": 22673,
      "download_url": "",
      "parent_path": "/data/338198/開發者",
      "id": "8652065877704578540",
      "keyword": "",
      "chunk_type": "text",
      "doc_filename": "all.json",
      "has_md_preview": false,
      "sub_doc_name": "第1頁",
      "has_preview": true,
      "add_knowledge_time": "2026-04-27 16:28:43",
      "plain_text_data": [
        "\\"post_id\\": 4198344,\\n            \\"work_order_id\\": 338198,\\n            \\"type\\": \\"Update\\",\\n            \\"post_by\\": \\"HSIEH, SEAN\\",\\n            \\"post_date\\": \\"2025-12-08T13:35:29.757000\\",\\n            \\"comment\\": \\"changed assigned_to from \\\\\\"HSIEH, SEAN\\\\\\" to \\\\,\\n        {\\n            \\"post_id\\": 4196812,\\n            , the only thing you'll need to adjust is the\\r\\nactual con"
      ],
      "favorite_id": null,
      "favorite_category_id": null,
      "favorite_category_name": null
    }
  ],
  "groupBy": {
    "total_groups": 3
  },
  "rerank_model_id": null,
  "tn_app_id": 10
}`;

export function FilePreviewPanel({
  title,
  date = '2026-04-29',
  content,
  onLink,
  onDownload,
  onInfo,
  onExpand,
  onClose,
  variant = 'panel',
  className = '',
}) {
  const isFull = variant === 'full';
  const resolvedTitle = title ?? (isFull ? 'JSON' : 'all.json');
  const resolvedContent = content ?? (isFull ? FULL_VIEW_CONTENT : DEFAULT_CONTENT);

  const panel = (
    <aside
      className={`${styles.panel} ${isFull ? styles.fullPanel : ''} ${className}`.trim()}
      role={isFull ? 'dialog' : undefined}
      aria-modal={isFull ? true : undefined}
      aria-label={isFull ? resolvedTitle : undefined}
    >
      <header className={styles.titleRow}>
        <h2 className={styles.title}>{resolvedTitle}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <Icon name="cancel" size={14} alt="" />
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.toolbarStart}>
          <span className={styles.date}>{date}</span>
          <button type="button" className={styles.roundBtn} onClick={onLink} aria-label="Open link">
            <Icon name="link" size={16} alt="" />
          </button>
          <button
            type="button"
            className={styles.roundBtn}
            onClick={onDownload}
            aria-label="Download"
          >
            <Icon name="download" size={16} alt="" />
          </button>
          <button type="button" className={styles.roundBtn} onClick={onInfo} aria-label="Info">
            <Icon name="info" size={16} alt="" />
          </button>
        </div>
        {!isFull ? (
          <button type="button" className={styles.expandBtn} onClick={onExpand} aria-label="Expand">
            <Icon name="open-in-new" size={20} alt="" />
          </button>
        ) : null}
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <pre className={styles.content}>{resolvedContent}</pre>
    </aside>
  );

  if (!isFull) return panel;

  return (
    <div className={styles.fullOverlay} onClick={onClose}>
      <div className={styles.fullShell} onClick={(event) => event.stopPropagation()}>
        {panel}
      </div>
    </div>
  );
}
