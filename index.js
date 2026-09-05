function adaptTableToMobile({
    tables = document.querySelectorAll('table.adaptToMobile'),
    classes = ['adaptToMobile-label']
} = {}) {
    tables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th'));
        headers.forEach(th => {
            if (!th.getAttribute('scope')) {
                th.setAttribute('scope', 'col');
            }
        });

        const titles = headers.map(th => th.textContent.trim());

        table.querySelectorAll('tbody tr').forEach(row => {
            row.querySelectorAll('td').forEach((td, i) => {
                if (td.querySelector('[data-adapt-label]')) {
                    return;
                }

                const title = titles[i];
                if (!title) {
                    return;
                }

                const span = document.createElement('span');
                span.className = classes.join(' ');
                span.setAttribute('data-adapt-label', '');
                span.setAttribute('aria-hidden', 'true');
                span.textContent = `${title}:`;
                td.prepend(span);
            });
        });
    });
}

if (typeof module !== 'undefined') {
    module.exports = adaptTableToMobile;
}
