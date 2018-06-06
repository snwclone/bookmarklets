function sendfeedback(sheeturl) {
    const find_email = /<td class="label">E-mail contactpersoon:<\/td>\s*<td>(.*)<\/td>/m;
    const feedback = document.getElementById('edit-culture-partner-feedback').querySelectorAll('fieldset.panel');

    const pageid = document.querySelector('#main-content > div > ul > li:nth-child(1) > a').getAttribute('href').split('/')[4];
    const school = document.querySelector('#main-content > div > ul > li:nth-child(1) > a').getAttribute('href').split('/')[3];
    const nid = window.location.href.split('/')[4];
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };

    fetch("https://www.cultuurkuur.be/print/" + nid, myInit).then((res) => res.text()).then(function (data) {
        const matches = data.match(find_email);
        let email;
        if (matches) {
            email = matches[1];
        } else {
            email = 'https://www/cultuurkuur.be/print/' + nid;
        }
        email = encodeURI(email);

        feedback.forEach(function (panel) {
            let name = encodeURI(panel.querySelector('legend > div.panel-title').textContent.trim());
            let fb_text = encodeURI(panel.querySelector('textarea').value);
            const link = sheet_url + '?pid=' + pageid + '&s=' + school + '&n=' + nid + '&e=' + email + '&p=' + name + '&fb=' + fb_text;
            panel.innerHTML = `<a href="${link}" target="_blank">❤ Like ❤</a>` + panel.innerHTML;
        });
    });
}