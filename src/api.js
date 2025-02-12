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
