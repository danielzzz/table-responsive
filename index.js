function adaptTableToMobile({
    tables = document.querySelectorAll('table.adaptToMobile'),
    classes = ["inline-block", "sm:hidden", "w-1/4", "font-bold"]
} = {}) {
    tables.forEach(table => {
        const titles = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        table.querySelectorAll('tr').forEach(row => {
            row.querySelectorAll('td').forEach((td, i) => {
                const span = document.createElement('span');
                span.className = classes.join(' ');
                span.textContent = `${titles[i]}:`;
                td.prepend(span);
            });
        });
    });
}

if (typeof module !== 'undefined') {
    module.exports = adaptTableToMobile;
}