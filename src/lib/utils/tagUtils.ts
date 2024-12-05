export function getHoverInfoFromTag(tag: Tag): string {
	return JSON.stringify({
		displayOnCard: tag.displayOnCard,
		displayOnDetails: tag.displayOnDetails,
		description: tag.description || ''
	});
}
