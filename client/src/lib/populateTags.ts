export default function popultaTags(milestones: Milestone[]) {
    const tags: string[] = [];

    milestones.forEach((milestone: Milestone) => {
        milestone.tags?.forEach((tag: string) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
    });

    return tags;
}
