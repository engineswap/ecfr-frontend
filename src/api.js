function parseBreadcrumb(breadcrumb) {
    const parsed = {
        title: null,
        chapter: null,
        subchapter: null,
        part: null,
        subpart: null,
        section: null
    };

    // Split breadcrumb into components
    const components = breadcrumb.split(" > ");

    components.forEach(component => {
        const keyValue = component.split(": ");
        if (keyValue.length === 2) {
            let key = keyValue[0].trim().toLowerCase();
            let value = keyValue[1].trim();

            // Map recognized keys
            if (parsed.hasOwnProperty(key)) {
                parsed[key] = value;
            }
        }
    });

    return parsed;
}

export const fetchSection = async (breadcrumb, issueDate) => {
    // Parse breadcrumb into structured data
    console.log(breadcrumb)
    const parsed = parseBreadcrumb(breadcrumb);
    console.log(parsed)

    if (!parsed.title || !parsed.section) {
        throw new Error("Title and Section are required to fetch data.");
    }

    // Base API URL
    const baseUrl = "https://www.ecfr.gov/api/versioner/v1/full";

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (parsed.subtitle) queryParams.append("subtitle", parsed.subtitle);
    if (parsed.chapter) queryParams.append("chapter", parsed.chapter);
    if (parsed.subchapter) queryParams.append("subchapter", parsed.subchapter);
    if (parsed.part) queryParams.append("part", parsed.part);
    if (parsed.subpart) queryParams.append("subpart", parsed.subpart);
    if (parsed.section) queryParams.append("section", parsed.section);
    console.log(queryParams)

    // Construct full URL
    const url = `${baseUrl}/${issueDate}/title-${parsed.title}.xml?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/xml",
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        return await response.text(); // XML response
    } catch (error) {
        console.error("Error fetching section:", error);
        throw error;
    }
}

export const fetchTitles = async () => {
    try {
        const response = await fetch("https://www.ecfr.gov/api/versioner/v1/titles.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        return data.titles
            .filter(title => !title.reserved) // Exclude reserved titles
            .map(title => ({
                id: title.number,
                name: title.name,
                latestIssue: title.latest_issue_date,
                lastUpdated: title.latest_amended_on
            }));
    } catch (error) {
        console.error("Error fetching titles:", error);
        return [];
    }
};

export const fetchTitleStructure = async (titleNumber, issueDate) => {
    try {
        const response = await fetch(
            `https://www.ecfr.gov/api/versioner/v1/structure/${issueDate}/title-${titleNumber}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch title structure");
        return await response.json();
    } catch (error) {
        console.error("Error fetching title structure:", error);
        return null;
    }
};

export const fetchAmendments = async (titleId) => {
    try {
        const response = await fetch(
            `https://www.ecfr.gov/api/versioner/v1/versions/title-${titleId}.json`
        );
        if (!response.ok) throw new Error("Failed to fetch amendments");
        return await response.json();
    } catch (error) {
        console.error("Error fetching amendments:", error);
        return null;
    }
}

export const fetchSearchResults = async (query) => {
    if (!query.trim()) return null; // Ignore empty queries

    const url = `https://www.ecfr.gov/api/search/v1/results?query=${encodeURIComponent(query)}`
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.text(); // Returns raw HTML
    } catch (error) {
        console.error("Search API Error:", error);
        return `<p class="text-red-500">Error fetching results</p>`;
    }
};
