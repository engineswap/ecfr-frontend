export const parseXMLToHTML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    let htmlContent = "";

    // Extract section header
    const head = xmlDoc.querySelector("HEAD");
    if (head) {
        htmlContent += `<h2 class="text-xl font-bold mb-4">${head.textContent}</h2>`;
    }

    // Extract paragraphs
    xmlDoc.querySelectorAll("P").forEach((p) => {
        htmlContent += `<p class="mb-2">${p.innerHTML}</p>`;
    });

    // Extract citations
    xmlDoc.querySelectorAll("CITA").forEach((cita) => {
        htmlContent += `<p class="text-sm text-gray-400">${cita.textContent}</p>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
