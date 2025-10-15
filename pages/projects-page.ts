import { expect } from '@playwright/test';
import { type Page } from '@playwright/test';

export class ProjectsPage {
    readonly page: Page;
    readonly columnCssSel: string;
    readonly taskCssSel: string;

    constructor(page: Page) {
        this.page = page;
        this.columnCssSel = '.flex-col.rounded-lg'; // Selector for whole columns
        this.taskCssSel = '.bg-white.rounded-lg'; // Selector for whole tasks
    }

    async selectProject(board: string) {
        await this.page.locator('button > h2', { hasText: board }).click();
        
        const header = this.page.locator('h1.text-gray-900', { hasText: board });
        await expect(header).toBeVisible();
    }

    async verifyTaskIsInColumn(column: string, task: string) {
        const columnLocator = this.page.locator(this.columnCssSel, { hasText: column });
        const taskLocator = this.page.locator(this.columnCssSel, { hasText: task });
        await expect(columnLocator.and(taskLocator)).toBeVisible();
    }

    async verifyTaskHasTag(task: string, tag: string) {
        const taskLocator = this.page.locator(this.taskCssSel, { hasText: task });
        const tagLocator = this.page.locator(this.taskCssSel, { hasText: tag } );
        await expect(taskLocator.and(tagLocator)).toBeVisible();
    }
}