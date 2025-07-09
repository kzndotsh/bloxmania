import { renderTasks } from '@shopify/cli-kit/node/ui';
import { downloadGitRepository } from '@shopify/cli-kit/node/git';
export async function cloneRepo(repoUrl, destination) {
    await downloadRepository(repoUrl, destination);
}
export async function cloneRepoAndCheckoutLatestTag(repoUrl, destination) {
    await downloadRepository(repoUrl, destination, true);
}
async function downloadRepository(repoUrl, destination, latestTag) {
    await renderTasks([
        {
            title: `Cloning ${repoUrl} into ${destination}`,
            task: async () => {
                await downloadGitRepository({
                    repoUrl,
                    destination,
                    latestTag,
                });
            },
        },
    ]);
}
//# sourceMappingURL=init.js.map