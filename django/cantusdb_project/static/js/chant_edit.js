window.addEventListener("load", function () {
    const feastSelect = document.getElementById("feastSelect");
    const folioSelect = document.getElementById("folioSelect");
    const copyTextButton = document.getElementById("copyFullTextBelow");
    if (copyTextButton) {
        copyTextButton.addEventListener("click", copyText);
    }

    // Make sure the select components keep their values across multiple GET requests
    // so the user can "drill down" on what they want
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("feast")) {
        feastSelect.value = urlParams.get("feast");
    }
    if (urlParams.has("folio")) {
        folioSelect.value = urlParams.get("folio");
    }

    feastSelect.addEventListener("change", setFeastRight);
    folioSelect.addEventListener("change", setFolio);

    // functions for the auto-jump of various selectors and input fields on the page
    // the folio selector and folio-feast selector on the right half do source-wide Selecting
    // the feast selector, genre selector, and text search on the left half do folio-wide Selecting
    var url = new URL(window.location.href);

    function copyText() {
        const standardText = document.getElementById('id_manuscript_full_text_std_spelling').innerHTML;
        document.getElementById('id_manuscript_full_text').innerHTML = standardText;
    }

    // if the feast on the right is reset, reset every selector but keep the source unchanged
    function setFeastRight() {
        url.searchParams.set('folio', '');
        url.searchParams.set('pk', '');
        const feast = feastSelect.options[feastSelect.selectedIndex].value;
        url.searchParams.set('feast', feast);
        window.location.assign(url);
    }

    // if the folio is reset, reset every selector but keep the source unchanged
    function setFolio() {
        url.searchParams.set('feast', '');
        url.searchParams.set('pk', '');
        const folio = folioSelect.options[folioSelect.selectedIndex].value;
        url.searchParams.set('folio', folio);
        window.location.assign(url);
    }
})