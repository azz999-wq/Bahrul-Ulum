export function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag] || tag));
}

export function getYouTubeEmbedURL(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = String(url).match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : '';
}

export function createNewsCard({ id, title, date, category, summary, imageUrl, link, ctaText = 'Baca Selengkapnya →' }) {
  const safeTitle = escapeHTML(title || '');
  const safeDate = escapeHTML(date || '');
  const safeCategory = escapeHTML(category || '');
  const safeSummary = escapeHTML(summary || '');
  const safeImage = escapeHTML(imageUrl || '');
  const href = escapeHTML(link || `detail-berita.html?id=${id || ''}`);

  return `
    <div class="news-image">
      <img src="${safeImage}" alt="${safeTitle}" onerror="this.style.display='none'">
      <span>${safeCategory}</span>
    </div>
    <div class="news-body">
      <small>${safeDate}</small>
      <h3>${safeTitle}</h3>
      <p>${safeSummary}</p>
      <a class="text-link" href="${href}">${ctaText}</a>
    </div>
  `;
}

export function createArticleMedia({ title, imageUrl, videoUrl }) {
  const embedUrl = getYouTubeEmbedURL(videoUrl);

  if (embedUrl) {
    return `
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin-bottom: 28px; background: #000;">
        <iframe src="${embedUrl}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
      </div>
    `;
  }

  if (imageUrl) {
    return `<img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(title || '')}" class="article-cover" onerror="this.style.display='none'">`;
  }

  return '';
}
