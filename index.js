function adaptTableToMobile({tables, classes}) {
    // default selector
    tables = tables || document.querySelectorAll('table.adaptToMobile');
    
    // classes to add to the extra element
    classes = classes || ["inline-block", "sm:hidden", "w-1/4", "font-bold"];
    
    tables.forEach(table => {
        let headers = table.querySelectorAll('th');
        let titles = [];
        headers.forEach(h => {
            titles.push(h.textContent);
        });

        let rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            let tds = row.querySelectorAll('td');
            tds.forEach((td, i) => {
                let t = document.createElement('span');
                t.className = classes.join(' ');
                t.textContent = titles[i] + ":";
                td.prepend(t);
            });
        });

    });
}

if (typeof module !== 'undefined') {
    module.exports = adaptTableToMobile;
}
