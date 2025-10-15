import { test } from '@playwright/test';
import { taskList } from '../data/task-list';
import { LoginPage } from '../pages/login-page';
import { ProjectsPage } from '../pages/projects-page';

const loginInfo = {
  "username": "admin",
  "password": "password123"
};

for (const { name, project, column, tags } of taskList) {
  test(`Verify ${name} appear correctly on projects board`, async ({ page }) => {
    const login = new LoginPage(page);
    const projects = new ProjectsPage(page);

    await page.goto('/');
    await login.logIntoAccount(loginInfo.username, loginInfo.password);

    for (const task of taskList) {
      await projects.selectProject(project);
      await projects.verifyTaskIsInColumn(column, name);
      for (let tag of tags) {
        await projects.verifyTaskHasTag(name, tag);
      }
    }
  });
}
